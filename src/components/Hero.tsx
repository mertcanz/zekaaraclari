import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="absolute top-10 left-5 w-40 h-40 sm:w-72 sm:h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-5 w-52 h-52 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-5 sm:py-2 mb-5 sm:mb-8">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium">2026'nın En İyi AI Araçları</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6">
            <span className="block">En Güçlü</span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Yapay Zeka Araçları
            </span>
            <span className="block">Tek Rehberde</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
            İçerik üretimi, tasarım, video, kodlama ve pazarlama için en iyi AI araçlarını keşfedin.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <a href="#tools" className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/30 text-sm sm:text-base">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Araçları Keşfet
            </a>
            <a href="#earn" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 active:bg-white/25 text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl transition-all text-sm sm:text-base">
              Para Nasıl Kazanılır?
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {[
            { value: '100+', label: 'AI Araç' },
            { value: '10', label: 'Kategori' },
            { value: '%100', label: 'Ücretsiz Rehber' },
            { value: '2026', label: 'Güncel Bilgiler' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center">
              <div className="text-xl sm:text-3xl font-extrabold text-indigo-400">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="hidden sm:flex justify-center mt-16">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
