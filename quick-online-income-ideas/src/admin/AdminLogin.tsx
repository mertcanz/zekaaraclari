import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

interface Props {
  onLogin: () => void;
  onExit: () => void;
}

export default function AdminLogin({ onLogin, onExit }: Props) {
  const { login, settings, updateSettings } = useData();

  // Şifre hiç belirlenmemişse kurulum modunu göster
  const isFirstSetup = !settings.adminPassword;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // İlk kurulum — şifre belirleme
  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 4) {
      setError('Şifre en az 4 karakter olmalı!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      return;
    }
    // Şifreyi sadece localStorage'a kaydet — kodda saklanmaz
    updateSettings({ adminPassword: password });
    onLogin();
  };

  // Normal giriş
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(password)) {
      onLogin();
    } else {
      setError('Yanlış şifre!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${isFirstSetup ? 'bg-green-600' : 'bg-indigo-600'}`}>
              {isFirstSetup ? <ShieldCheck className="w-7 h-7 text-white" /> : <Lock className="w-7 h-7 text-white" />}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {isFirstSetup ? 'İlk Kurulum' : 'Admin Girişi'}
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              {isFirstSetup ? 'Admin şifrenizi belirleyin' : 'Yönetim paneline erişim'}
            </p>
          </div>

          {/* İLK KURULUM — şifre belirleme */}
          {isFirstSetup ? (
            <form onSubmit={handleSetup} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Yeni Şifre</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="En az 4 karakter"
                  className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-green-500 outline-none text-base"
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Şifre Tekrar</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifreyi tekrar girin"
                  className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-green-500 outline-none text-base"
                  required
                />
              </div>
              <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="rounded" />
                Şifreyi göster
              </label>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </motion.div>
              )}

              <button type="submit" className="w-full py-3.5 bg-green-600 active:bg-green-700 text-white font-bold rounded-xl text-base">
                Şifreyi Belirle & Giriş Yap
              </button>

              <p className="text-xs text-slate-500 text-center">
                Bu şifre sadece tarayıcınızda saklanır. Kaynak kodunda görünmez.
              </p>
            </form>
          ) : (
            /* NORMAL GİRİŞ */
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Şifre</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none text-base"
                    autoFocus
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </motion.div>
              )}

              <button type="submit" className="w-full py-3.5 bg-indigo-600 active:bg-indigo-700 text-white font-bold rounded-xl text-base">
                Giriş Yap
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button onClick={onExit} className="inline-flex items-center gap-1 text-slate-500 active:text-indigo-400 text-sm">
              <ArrowLeft className="w-4 h-4" />Siteye Dön
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
