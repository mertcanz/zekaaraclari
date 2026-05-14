import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, Check, ChevronDown, Sparkles } from 'lucide-react';
import { prompts, promptCategories, type Prompt } from '../data/prompts';

export default function PromptLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = prompts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const copyPrompt = (prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="prompts" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            ✨ Prompt Kütüphanesi
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Hazır Prompt Şablonları
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            ChatGPT, Midjourney ve diğer AI araçları için hazır, test edilmiş promptlar. Kopyala ve hemen kullan!
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {promptCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Prompt ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Prompts List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPrompts.map((prompt) => (
              <motion.div
                key={prompt.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div
                  className="p-5 cursor-pointer flex items-center justify-between"
                  onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{prompt.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                          {prompt.tool}
                        </span>
                        <span className="text-xs text-slate-400">{prompt.description}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedPrompt === prompt.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {expandedPrompt === prompt.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-200 dark:border-slate-700"
                    >
                      <div className="p-5 space-y-4">
                        <div className="relative">
                          <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-xl text-sm overflow-x-auto whitespace-pre-wrap font-mono">
                            {prompt.prompt}
                          </pre>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyPrompt(prompt);
                            }}
                            className={`absolute top-3 right-3 p-2 rounded-lg transition-colors ${
                              copiedId === prompt.id
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                          >
                            {copiedId === prompt.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {prompt.example && (
                          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">
                              💡 Örnek Kullanım:
                            </span>
                            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                              {prompt.example}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {prompt.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-slate-500 dark:text-slate-400">Aramanıza uygun prompt bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
}
