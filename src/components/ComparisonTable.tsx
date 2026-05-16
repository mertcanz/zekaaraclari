import { motion } from 'framer-motion';
import { Star, ExternalLink, Check, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ComparisonTable() {
  const { tools } = useData();
  const topTools = tools.filter((t) =>
    ['chatgpt', 'claude', 'midjourney', 'github-copilot', 'elevenlabs', 'perplexity'].includes(t.id)
  ).slice(0, 6);

  if (topTools.length === 0) return null;

  return (
    <section className="py-10 sm:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <span className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
            ⚡ Hızlı Karşılaştırma
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Popüler AI Araçları
          </h2>
          <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            En iyileri yan yana inceleyin
          </p>
        </motion.div>

        {/* Mobile: Card View */}
        <div className="sm:hidden space-y-3">
          {topTools.map((tool) => (
            <div key={tool.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tool.logo}</span>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{tool.name}</div>
                  {tool.badge && <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">{tool.badge}</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{tool.rating}</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 truncate">{tool.pricing}</div>
                <div className="flex items-center gap-1">
                  {tool.pricingType !== 'paid' ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-400" />}
                  <span className="text-slate-500 dark:text-slate-400">Ücretsiz plan</span>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                  Dene <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Araç</th>
                <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Kategori</th>
                <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Puan</th>
                <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Fiyat</th>
                <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Ücretsiz</th>
                <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Türkçe</th>
                <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400"></th>
              </tr>
            </thead>
            <tbody>
              {topTools.map((tool, i) => (
                <tr key={tool.id} className={`border-b border-slate-100 dark:border-slate-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/30'}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tool.logo}</span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{tool.name}</div>
                        {tool.badge && <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{tool.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400 capitalize">{tool.category}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-slate-900 dark:text-white">{tool.rating}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{tool.pricing}</td>
                  <td className="p-4">
                    {tool.pricingType === 'free' || tool.pricingType === 'freemium' ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-400" />}
                  </td>
                  <td className="p-4"><Check className="w-5 h-5 text-green-500" /></td>
                  <td className="p-4">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
                      Dene <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
