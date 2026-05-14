import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ExternalLink, Check, Lightbulb, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import type { AiTool } from '../data/tools';
import { useData } from '../context/DataContext';
import UserReviews from './UserReviews';
import ShareButtons from './ShareButtons';

interface Props {
  tool: AiTool | null;
  onClose: () => void;
  onSelectTool?: (tool: AiTool) => void;
}

export default function ToolModal({ tool, onClose, onSelectTool }: Props) {
  const { tools } = useData();

  if (!tool) return null;

  const isNew = tool.addedDate
    ? (Date.now() - new Date(tool.addedDate).getTime()) < 30 * 24 * 60 * 60 * 1000
    : false;

  const similarToolsList = (tool.similarTools || [])
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as AiTool[];

  // Fallback: if no similarTools defined, find same category
  const relatedTools = similarToolsList.length > 0
    ? similarToolsList
    : tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        >
          {/* Drag handle for mobile */}
          <div className="sm:hidden flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white relative">
            {isNew && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                🆕 YENİ
              </span>
            )}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{tool.logo}</span>
                <div>
                  <h2 className="text-2xl font-bold">{tool.name}</h2>
                  <p className="text-indigo-200 text-sm mt-1">{tool.shortDesc}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`} />
                ))}
                <span className="ml-1 text-sm font-semibold">{tool.rating}</span>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">{tool.pricing}</span>
              {tool.badge && (
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">{tool.badge}</span>
              )}
              {tool.lastUpdated && (
                <span className="flex items-center gap-1 text-xs text-indigo-200">
                  <Clock className="w-3 h-3" /> Güncelleme: {new Date(tool.lastUpdated).toLocaleDateString('tr-TR')}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {/* Share */}
            <div className="mb-6 flex justify-end">
              <ShareButtons title={`${tool.name} — AI Araçları Rehberi`} />
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nedir?</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{tool.description}</p>
            </div>

            {/* Pros & Cons */}
            {(tool.pros?.length || tool.cons?.length) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {tool.pros && tool.pros.length > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
                      <ThumbsUp className="w-4 h-4" /> Artıları
                    </h4>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tool.cons && tool.cons.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
                      <ThumbsDown className="w-4 h-4" /> Eksileri
                    </h4>
                    <ul className="space-y-2">
                      {tool.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" /> Özellikler
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" /> Kullanım Alanları
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.useCases.map((u) => (
                  <span key={u} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm">
                    {u}
                  </span>
                ))}
              </div>
            </div>

            {/* Similar Tools */}
            {relatedTools.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">🔗 Benzer Araçlar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedTools.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => onSelectTool?.(st)}
                      className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors text-left"
                    >
                      <span className="text-2xl">{st.logo}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-slate-900 dark:text-white truncate">{st.name}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-slate-500">{st.rating}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* User Reviews */}
            <UserReviews toolId={tool.id} toolName={tool.name} />
          </div>

          {/* Footer */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <button onClick={onClose} className="px-5 py-2 text-slate-500 dark:text-slate-400 font-medium">
              Kapat
            </button>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
            >
              {tool.name}'ı Dene <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
