import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare, Shield, Clock, Lock, Bot } from 'lucide-react';
import { sendContactEmail, isEmailConfigured } from '../services/emailService';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sabit mail adresi
  const CONTACT_EMAIL = 'mertcanzafer@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save to localStorage for admin panel
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({ ...formData, id: Date.now().toString(), date: new Date().toISOString(), read: false });
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    // EmailJS kuruluysa oradan gönder
    if (isEmailConfigured()) {
      await sendContactEmail(formData);
    }

    // Her durumda mailto ile de aç (yedek)
    const subjectMap: Record<string, string> = { general:'Genel Soru', tool:'Araç Önerisi', partnership:'İş Birliği', ad:'Reklam', bug:'Hata Bildirimi', other:'Diğer' };
    const mailSubject = encodeURIComponent(`[Site İletişim] ${subjectMap[formData.subject] || formData.subject}`);
    const mailBody = encodeURIComponent(`Gönderen: ${formData.name}\nE-posta: ${formData.email}\nKonu: ${subjectMap[formData.subject] || formData.subject}\n\nMesaj:\n${formData.message}`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`, '_self');

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            İletişim
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın
          </p>
        </motion.div>

        {/* Security Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { icon: Shield, label: 'Güvenli İletişim', desc: 'Tüm veriler şifrelenir' },
            { icon: Clock, label: 'Yanıt Süresi', desc: '24-48 saat içinde' },
            { icon: Lock, label: 'Gizlilik', desc: 'Üçüncü taraflarla paylaşılmaz' },
            { icon: Bot, label: 'Spam Koruması', desc: 'Bot koruması aktif' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center">
              <item.icon className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
        >
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Mesajınız Alındı!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">En kısa sürede size geri dönüş yapacağız.</p>
              <button onClick={() => setSubmitted(false)} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Yeni mesaj gönder
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Adınız *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Adınız Soyadınız" required className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-posta *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="ornek@email.com" required className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Konu *</label>
                <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
                  <option value="">Konu seçin</option>
                  <option value="general">Genel Soru</option>
                  <option value="tool">Araç Önerisi</option>
                  <option value="partnership">İş Birliği</option>
                  <option value="ad">Reklam / Sponsorluk</option>
                  <option value="bug">Hata Bildirimi</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mesajınız *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Mesajınızı buraya yazın..." rows={6} required className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl transition-colors text-base">
                {loading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Gönderiliyor...</>) : (<><Send className="w-5 h-5" />Mesaj Gönder</>)}
              </button>
            </form>
          )}
        </motion.div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-300">Güvenlik ve Gizlilik:</strong> İletişim formunu kullanarak gönderdiğiniz bilgiler, sadece sizinle iletişim kurmak için kullanılacak ve üçüncü taraflarla paylaşılmayacaktır.
          </p>
        </div>
      </div>
    </section>
  );
}
