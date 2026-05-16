import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, PlusCircle } from 'lucide-react';
import { categories } from '../data/tools';

export default function SubmitTool() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'yazı',
    description: '',
    submitterName: '',
    submitterEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normalize URL
    let url = formData.url.trim();
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Save to localStorage for admin to review
    const submissions = JSON.parse(localStorage.getItem('tool_submissions') || '[]');
    submissions.push({
      ...formData,
      url,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending',
    });
    localStorage.setItem('tool_submissions', JSON.stringify(submissions));
    setSubmitted(true);
    setFormData({ name: '', url: '', category: 'yazı', description: '', submitterName: '', submitterEmail: '' });
  };

  return (
    <section id="submit" className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <PlusCircle className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-3">
            AI Aracını Ekle
          </h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Bildiğiniz harika bir AI aracı mı var? Bize önerin, inceleyip sitemize ekleyelim!
          </p>

          {!open && !submitted && (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              <PlusCircle className="w-5 h-5" />
              Araç Öner
            </button>
          )}

          {submitted && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl text-white"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold">Teşekkürler! Öneriniz incelemeye alındı.</span>
            </motion.div>
          )}

          {open && !submitted && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="text-left bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 mt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Araç Adı *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ör: ChatGPT"
                    required
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Web Sitesi *</label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="ornek.com veya https://ornek.com"
                    required
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kısa Açıklama *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Bu araç ne yapıyor? Neden harika?"
                  rows={3}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Adınız</label>
                  <input
                    type="text"
                    value={formData.submitterName}
                    onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                    placeholder="İsteğe bağlı"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-posta</label>
                  <input
                    type="email"
                    value={formData.submitterEmail}
                    onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                    placeholder="İsteğe bağlı"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors"
                >
                  <Send className="w-4 h-4" /> Gönder
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 text-slate-500 dark:text-slate-400 rounded-xl font-medium"
                >
                  İptal
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
