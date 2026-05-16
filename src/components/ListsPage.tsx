import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { type AiTool } from '../data/tools';

interface Props {
  onSelectTool: (tool: AiTool) => void;
}

export default function ListsPage({ onSelectTool }: Props) {
  const { tools } = useData();

  const lists = [
    { title: '🏆 En Yüksek Puanlı AI Araçları', desc: 'Kullanıcı puanına göre en iyi 10 araç', filter: (t: AiTool[]) => [...t].sort((a, b) => b.rating - a.rating).slice(0, 10) },
    { title: '🆓 En İyi Ücretsiz AI Araçları', desc: 'Para ödemeden kullanabileceğiniz araçlar', filter: (t: AiTool[]) => t.filter(x => x.pricingType === 'free' || x.pricingType === 'freemium').sort((a, b) => b.rating - a.rating).slice(0, 10) },
    { title: '✍️ En İyi Yazı & İçerik Araçları', desc: 'Blog, makale, e-posta için en iyiler', filter: (t: AiTool[]) => t.filter(x => x.category === 'yazı').sort((a, b) => b.rating - a.rating) },
    { title: '🎨 En İyi Görsel AI Araçları', desc: 'Logo, tasarım, fotoğraf üretimi', filter: (t: AiTool[]) => t.filter(x => x.category === 'görsel').sort((a, b) => b.rating - a.rating) },
    { title: '🎬 En İyi Video & Ses Araçları', desc: 'Video oluşturma, seslendirme, düzenleme', filter: (t: AiTool[]) => t.filter(x => x.category === 'video').sort((a, b) => b.rating - a.rating) },
    { title: '💻 En İyi Kodlama Araçları', desc: 'Kod yazma, hata ayıklama, proje geliştirme', filter: (t: AiTool[]) => t.filter(x => x.category === 'kodlama').sort((a, b) => b.rating - a.rating) },
    { title: '📈 En İyi Pazarlama & SEO Araçları', desc: 'SEO, reklam, sosyal medya yönetimi', filter: (t: AiTool[]) => t.filter(x => x.category === 'pazarlama').sort((a, b) => b.rating - a.rating) },
    { title: '⚡ En İyi Üretkenlik Araçları', desc: 'Toplantı, planlama, not alma', filter: (t: AiTool[]) => t.filter(x => x.category === 'üretkenlik').sort((a, b) => b.rating - a.rating) },
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-800/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">📋 AI Araçları Listeleri</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">Kategoriye ve özelliğe göre hazırlanmış özel listeler</p>
        </div>

        <div className="space-y-12">
          {lists.map((list, li) => {
            const filtered = list.filter(tools);
            if (filtered.length === 0) return null;
            return (
              <motion.div key={li} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{list.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{list.desc}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {filtered.map((tool, i) => (
                    <button
                      key={tool.id}
                      onClick={() => onSelectTool(tool)}
                      className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all text-left flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{tool.logo}</span>
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">{tool.name}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">⭐ {tool.rating} • {tool.pricing.split('/')[0]}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
