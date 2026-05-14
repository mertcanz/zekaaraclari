import { useState, useEffect } from 'react';
import App from './App';
import AdminPanel from './admin/AdminPanel';

export default function AppRouter() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Erişim 1: Footer'da © yazısına 5 kere tıkla
  useEffect(() => {
    (window as any).__oa = () => setShowAdmin(true);
    (window as any).__ca = () => setShowAdmin(false);
    return () => { delete (window as any).__oa; delete (window as any).__ca; };
  }, []);

  // Erişim 2: Ctrl+Shift+A kısayolu
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setShowAdmin(true);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  if (showAdmin) return <AdminPanel onExit={() => setShowAdmin(false)} />;
  return <App />;
}
