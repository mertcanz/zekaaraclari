import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'new_tool' | 'new_blog' | 'new_prompt';
  title: string;
  message: string;
  date: string;
  sentAt: string | null;
  recipientCount: number;
  recipientEmails: string[];
}

interface NotificationContextType {
  notifications: Notification[];
  addAndSend: (n: Omit<Notification, 'id' | 'date' | 'sentAt' | 'recipientCount' | 'recipientEmails'>) => void;
  deleteNotification: (id: string) => void;
  getSubscriberCount: () => number;
  getSubscribers: () => { email: string; date: string }[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return JSON.parse(localStorage.getItem('email_notifications') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('email_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const getSubscribers = (): { email: string; date: string }[] => {
    return JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  };

  const getSubscriberCount = () => getSubscribers().length;

  // Auto-send: creates notification AND marks as sent immediately
  const addAndSend = (n: Omit<Notification, 'id' | 'date' | 'sentAt' | 'recipientCount' | 'recipientEmails'>) => {
    const subs = getSubscribers();
    const newN: Notification = {
      ...n,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      sentAt: subs.length > 0 ? new Date().toISOString() : null,
      recipientCount: subs.length,
      recipientEmails: subs.map((s) => s.email),
    };
    setNotifications((prev) => [newN, ...prev]);

    // In a real app, here you would call SendGrid/Mailchimp API:
    // await fetch('/api/send-email', { method: 'POST', body: JSON.stringify({ emails: subs, subject: n.title, body: n.message }) })
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addAndSend, deleteNotification, getSubscriberCount, getSubscribers }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
}
