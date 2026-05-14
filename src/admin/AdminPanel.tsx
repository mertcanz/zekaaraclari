import { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

interface Props {
  onExit: () => void;
}

export default function AdminPanel({ onExit }: Props) {
  const { isAdmin } = useData();
  const [loggedIn, setLoggedIn] = useState(isAdmin);

  if (!loggedIn && !isAdmin) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} onExit={onExit} />;
  }

  return <AdminDashboard onExit={onExit} />;
}
