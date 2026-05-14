import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';
import { glossary, glossaryCategories, type Term } from '../data/glossary';

export default function Glossary() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = glossary.filter((t) => {
    const matchesCategory = selectedCategory === 'Tümü' || t.category === selectedCategory;
    const matchesSearch =
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, Term[]>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <section id="glossary" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            📖 AI Sözlük
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Yapay Zeka Terimleri Sözlüğü
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            AI dünyasının terimlerini öğrenin. {glossary.length} terim açıklaması.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {glossaryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Terim ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Alphabet navigation */}
        <div className="flex flex-wrap justify-center gap-1 mb-8">
          {sortedLetters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-8 h-8 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Terms list */}
        <div className="space-y-8">
          {sortedLetters.map((letter) => (
            <div key={letter} id={`letter-${letter}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white font-bold text-lg rounded-xl">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="space-y-3">
                {groupedTerms[letter].map((term) => (
                  <motion.div
                    key={term.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">
                              {term.term}
                            </h3>
                            <p className={`text-sm text-slate-600 dark:text-slate-400 mt-1 ${
                              expandedTerm === term.id ? '' : 'line-clamp-2'
                            }`}>
                              {term.definition}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                          {term.category}
                        </span>
                      </div>

                      {expandedTerm === term.id && term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                          <span className="text-xs font-medium text-slate-400">İlgili terimler:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {term.relatedTerms.map((rt) => (
                              <span
                                key={rt}
                                className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg"
                              >
                                {rt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">📚</span>
            <p className="text-slate-500 dark:text-slate-400">Aramanıza uygun terim bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
}
