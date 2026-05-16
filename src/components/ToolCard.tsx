import { motion } from 'framer-motion';
import { Star, ExternalLink, ChevronRight, Heart } from 'lucide-react';
import type { AiTool } from '../data/tools';
import { useData } from '../context/DataContext';

interface Props {
  tool: AiTool;
  index: number;
  onClick: () => void;
}

export default function ToolCard({ tool, index, onClick }: Props) {
  const { isFavorite, toggleFavorite } = useData();
  const favorite = isFavorite(tool.id);

  const pricingColors: Record<string, string> = {
    free: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
    freemium: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    paid: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
  };
  const pricingLabels: Record<string, string> = { free: 'Ücretsiz', freemium: 'Freemium', paid: 'Ücretli' };

  const handleFavorite = (e: React.MouseEvent) => { e.stopPropagation(); toggleFavorite(tool.id); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      onClick={onClick}
      className="relative bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 cursor-pointer group active:scale-[0.98] hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/30 transition-all duration-200"
    >
      {tool.badge && (
        <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
          {tool.badge}
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl sm:text-4xl">{tool.logo}</div>
        <div className="flex items-center gap-1.5">
          <button onClick={handleFavorite} className={`p-1.5 sm:p-2 rounded-lg transition-all ${favorite ? 'bg-red-100 dark:bg-red-900/50 text-red-500' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
          <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${pricingColors[tool.pricingType]}`}>
            {pricingLabels[tool.pricingType]}
          </span>
        </div>
      </div>

      <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 group-hover:text-indigo-600 transition-colors truncate">{tool.name}</h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{tool.shortDesc}</p>

      <div className="flex items-center gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 dark:text-slate-600'}`} />
        ))}
        <span className="text-xs sm:text-sm text-slate-500 ml-1">{tool.rating}</span>
      </div>

      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mb-3">{tool.pricing}</div>

      <div className="flex flex-wrap gap-1 mb-3 sm:mb-5">
        {tool.features.slice(0, 2).map((f) => (
          <span key={f} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] sm:text-xs rounded border border-slate-100 dark:border-slate-600 truncate max-w-[120px] sm:max-w-none">
            {f}
          </span>
        ))}
        {tool.features.length > 2 && (
          <span className="px-1.5 py-0.5 text-indigo-600 dark:text-indigo-400 text-[10px] sm:text-xs font-medium">+{tool.features.length - 2}</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <span className="text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold flex items-center gap-1">
          İncele <ChevronRight className="w-3.5 h-3.5" />
        </span>
        <a href={tool.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </motion.div>
  );
}
