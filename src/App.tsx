/*
 * ============================================
 * APP.TSX — Ana Uygulama Dosyası
 * ============================================
 * Bu dosya sitenin tüm sayfalarını ve navigasyonunu yönetir.
 * 
 * SAYFALAR:
 * - home     → Ana sayfa (Hero + Trend/Yeni + Konu Başlıkları + Keşfet + SSS)
 * - tools    → AI araçları kataloğu (filtre + arama + favoriler)
 * - lists    → Kategori bazlı özel listeler
 * - prompts  → Hazır ChatGPT/Midjourney promptları
 * - glossary → AI terimleri sözlüğü
 * - blog     → Blog yazıları
 * - earn     → Para kazanma rehberi
 * - contact  → İletişim formu
 * - about/privacy/terms/cookies → Statik sayfalar
 * 
 * DEĞİŞTİRMEK İSTERSEN:
 * - Yeni sayfa eklemek: navItems dizisine ekle + Page type'a ekle + render bloğuna ekle
 * - Navigasyon düzenlemek: navItems dizisini değiştir
 * - Ana sayfa bölümleri: currentPage === 'home' bloğundaki section'ları düzenle
 * ============================================
 */

import { useState, useMemo } from 'react';
import { Search, Sparkles, Menu, X, Heart, ChevronRight, TrendingUp, Clock, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Context'ler — veri ve tema yönetimi
import { useData } from './context/DataContext';       // Araçlar, blog, favoriler, ayarlar
import { useTheme } from './context/ThemeContext';     // Koyu/Açık tema

// Veri
import { categories } from './data/tools';             // Araç kategorileri

// Bileşenler (Component'ler)
import Hero from './components/Hero';                   // Ana sayfa hero bölümü
import ToolCard from './components/ToolCard';           // Araç kartı
import ToolModal from './components/ToolModal';         // Araç detay modalı
import ComparisonTable from './components/ComparisonTable'; // Karşılaştırma tablosu
import HowToEarn from './components/HowToEarn';         // Para kazanma rehberi
import Blog from './components/Blog';                   // Blog sayfası
import Footer from './components/Footer';               // Alt bilgi (footer)
import ThemeToggle from './components/ThemeToggle';     // Tema değiştirme butonu
import ScrollToTop from './components/ScrollToTop';     // Yukarı çık butonu
import ContactForm from './components/ContactForm';     // İletişim formu
import PromptLibrary from './components/PromptLibrary'; // Prompt kütüphanesi
import Glossary from './components/Glossary';           // AI sözlük
import CookieBanner from './components/CookieBanner';   // KVKK çerez uyarısı
// import WhatsAppButton from './components/WhatsAppButton'; // şimdilik gizli // WhatsApp butonu
// import SubmitTool from './components/SubmitTool'; // şimdilik gizli       // Araç önerme formu
import StaticPages from './components/StaticPages';     // Hakkımızda, Gizlilik vb.
import ListsPage from './components/ListsPage';         // Listeler sayfası
import type { AiTool } from './data/tools';

// Sayfa tipleri — yeni sayfa eklemek istersen buraya ekle
type Page = 'home' | 'tools' | 'prompts' | 'glossary' | 'blog' | 'earn' | 'contact' | 'about' | 'privacy' | 'terms' | 'cookies' | 'lists';

export default function App() {
  const { tools, favorites } = useData();
  useTheme();

  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [pricingFilter, setPricingFilter] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeTab, setHomeTab] = useState<'trend' | 'recent'>('trend');
  const [randomTool, setRandomTool] = useState<AiTool | null>(null);

  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPricing = pricingFilter === 'all' || t.pricingType === pricingFilter;
      return matchesCategory && matchesSearch && matchesPricing;
    });
  }, [tools, selectedCategory, searchQuery, pricingFilter]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = () => {
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch);
      navigate('tools');
    }
  };

  const pickRandomTool = () => {
    const r = tools[Math.floor(Math.random() * tools.length)];
    setRandomTool(r);
  };

  const trendTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const recentTools = [...tools].sort((a, b) => new Date(b.addedDate || '').getTime() - new Date(a.addedDate || '').getTime()).slice(0, 6);

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Ana Sayfa' },
    { page: 'tools', label: 'Araçlar' },
    { page: 'lists', label: 'Listeler' },
    { page: 'prompts', label: 'Promptlar' },
    { page: 'glossary', label: 'Sözlük' },
    { page: 'blog', label: 'Blog' },
    { page: 'earn', label: 'Para Kazan' },
  ];

  const topicTags = [
    { label: 'Metin Üretimi', cat: 'yazı' },
    { label: 'Görsel AI', cat: 'görsel' },
    { label: 'Video Oluşturma', cat: 'video' },
    { label: 'Kod Asistanı', cat: 'kodlama' },
    { label: 'SEO Araçları', cat: 'pazarlama' },
    { label: 'Üretkenlik', cat: 'üretkenlik' },
    { label: 'Eğitim', cat: 'eğitim' },
    { label: 'Sosyal Medya', cat: 'sosyal' },
    { label: 'İş Yönetimi', cat: 'iş' },
    { label: 'Ücretsiz Araçlar', cat: '_free' },
    { label: 'Çeviri', cat: 'yazı' },
    { label: 'Sunum Yapma', cat: 'üretkenlik' },
  ];

  // Static pages
  if (['about', 'privacy', 'terms', 'cookies'].includes(currentPage)) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans transition-colors duration-300">
        <StaticPages page={currentPage as any} onBack={() => navigate('home')} />
        <Footer onNavigate={(p) => navigate(p as Page)} />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('home')} className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight hidden sm:inline">
                AI <span className="text-indigo-600 dark:text-indigo-400">Rehber</span>
              </span>
            </button>
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button key={item.page} onClick={() => navigate(item.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.page ? 'bg-indigo-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}>{item.label}</button>
              ))}
              {/* Random tool button */}
              <button onClick={pickRandomTool} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-600 transition-colors" title="Rastgele AI Aracı">
                <Shuffle className="w-4 h-4" />
              </button>
              <div className="ml-1"><ThemeToggle /></div>
            </div>
            <div className="lg:hidden flex items-center gap-2">
              <button onClick={pickRandomTool} className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg" title="Rastgele">
                <Shuffle className="w-5 h-5 text-slate-500" />
              </button>
              <ThemeToggle />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="p-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <button key={item.page} onClick={() => navigate(item.page)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium text-left ${
                      currentPage === item.page ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300'
                    }`}>{item.label}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== HOME ===== */}
      {currentPage === 'home' && (
        <>
          <Hero />

          {/* Search */}
          <section className="py-4 sm:py-8 bg-white dark:bg-slate-900">
            <div className="max-w-2xl mx-auto px-4">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input type="text" placeholder="AI aracı ara..." value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleHeroSearch()}
                  className="w-full pl-10 sm:pl-12 pr-16 sm:pr-24 py-3 sm:py-4 border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm sm:text-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                <button onClick={handleHeroSearch} className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm">Ara</button>
              </div>
            </div>
          </section>

          {/* Trend / Recent Tabs */}
          <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                  <button onClick={() => setHomeTab('trend')}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all ${homeTab === 'trend' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 dark:text-slate-400'}`}>
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Trend
                  </button>
                  <button onClick={() => setHomeTab('recent')}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all ${homeTab === 'recent' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 dark:text-slate-400'}`}>
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Yeni
                  </button>
                </div>
                <button onClick={() => navigate('tools')} className="hidden sm:flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                  Tümünü Gör <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(homeTab === 'trend' ? trendTools : recentTools).map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} onClick={() => setSelectedTool(tool)} />
                ))}
              </div>
              <div className="sm:hidden mt-6 text-center">
                <button onClick={() => navigate('tools')} className="text-indigo-600 dark:text-indigo-400 font-semibold">Tüm Araçları Gör →</button>
              </div>
            </div>
          </section>

          {/* Başlıca Konu Başlıkları */}
          <section className="py-8 sm:py-12 bg-white dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-5 sm:mb-8">Başlıca Konu Başlıkları</h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {topicTags.map((tag) => (
                  <button key={tag.label} onClick={() => { 
                    if (tag.cat === '_free') { setPricingFilter('free'); setSelectedCategory('all'); }
                    else { setSelectedCategory(tag.cat); setPricingFilter('all'); }
                    setSearchQuery(''); navigate('tools');
                  }}
                    className="px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 active:scale-95 text-slate-700 dark:text-slate-300 rounded-full text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-700 transition-all">
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-5 sm:mb-8">Keşfet</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { page: 'tools' as Page, emoji: '🤖', title: 'AI Araçları', desc: `${tools.length}+ araç`, color: 'from-indigo-500 to-purple-600' },
                  { page: 'lists' as Page, emoji: '📋', title: 'Listeler', desc: 'Özel seçkiler', color: 'from-cyan-500 to-blue-600' },
                  { page: 'prompts' as Page, emoji: '✨', title: 'Promptlar', desc: 'Hazır şablonlar', color: 'from-yellow-500 to-orange-600' },
                  { page: 'earn' as Page, emoji: '💰', title: 'Para Kazan', desc: 'AI ile gelir', color: 'from-pink-500 to-rose-600' },
                ].map((item) => (
                  <button key={item.page} onClick={() => navigate(item.page)}
                    className={`bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left text-white active:scale-95 hover:shadow-xl transition-all`}>
                    <span className="text-2xl sm:text-3xl block mb-1 sm:mb-2">{item.emoji}</span>
                    <h3 className="font-bold text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <ComparisonTable />

          {/* FAQ */}
          <section className="py-10 sm:py-16 bg-white dark:bg-slate-900">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center">SSS</h2>
              <div className="space-y-3">
                {[
                  { q: 'AI araçlarıyla para kazanılabilir mi?', a: 'Evet. Freelance, affiliate ve içerik üretimi ile gelir elde edebilirsiniz.' },
                  { q: 'Hangi AI aracıyla başlamalıyım?', a: 'Yazı: ChatGPT, Görsel: Midjourney, Video: Runway ML ile başlayın.' },
                  { q: 'AI araçları Türkçe destekliyor mu?', a: 'ChatGPT, Claude, Canva AI ve ElevenLabs gibi büyük araçlar Türkçe destekler.' },
                ].map((faq, i) => (
                  <details key={i} className="group bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <summary className="p-5 cursor-pointer font-bold text-slate-900 dark:text-white flex items-center justify-between list-none">
                      {faq.q}<span className="text-indigo-600 text-2xl font-light group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== TOOLS ===== */}
      {currentPage === 'tools' && (
        <>
          <section className="py-12 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">🤖 Tüm AI Araçları</h1>
                <p className="text-slate-500 dark:text-slate-400">{tools.length} aracı filtreleyin</p>
              </div>
              <div className="mb-8 space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((cat) => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 ${
                        selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                      }`}><span>{cat.emoji}</span>{cat.label}</button>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input type="text" placeholder="Araç ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <select value={pricingFilter} onChange={(e) => setPricingFilter(e.target.value)}
                    className="px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 outline-none">
                    <option value="all">Tüm Fiyatlar</option><option value="free">Ücretsiz</option><option value="freemium">Freemium</option><option value="paid">Ücretli</option>
                  </select>
                </div>
                <p className="text-center text-sm text-slate-400">{filteredTools.length} araç</p>
              </div>
              {favorites.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4"><Heart className="w-5 h-5 text-red-500 fill-red-500" />Favorilerim</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {tools.filter(t => favorites.includes(t.id)).slice(0, 3).map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} index={i} onClick={() => setSelectedTool(tool)} />
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredTools.map((tool, i) => (
                    <ToolCard key={tool.id} tool={tool} index={i} onClick={() => setSelectedTool(tool)} />
                  ))}
                </AnimatePresence>
              </div>
              {filteredTools.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-slate-500 dark:text-slate-400">Sonuç bulunamadı.</p>
                  <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setPricingFilter('all'); }}
                    className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Temizle</button>
                </div>
              )}
            </div>
          </section>
          {/* <SubmitTool /> — şimdilik gizli */}
        </>
      )}

      {currentPage === 'lists' && <ListsPage onSelectTool={(t) => setSelectedTool(t)} />}
      {currentPage === 'prompts' && <PromptLibrary />}
      {currentPage === 'glossary' && <Glossary />}
      {currentPage === 'blog' && <Blog />}
      {currentPage === 'earn' && <HowToEarn />}
      {currentPage === 'contact' && <ContactForm />}

      <Footer onNavigate={(p) => navigate(p as Page)} />
      <ScrollToTop />
      {/* <WhatsAppButton /> — şimdilik gizli */}
      <CookieBanner />

      {/* Random Tool Modal */}
      <AnimatePresence>
        {randomTool && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRandomTool(null)} className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ type: 'spring', damping: 25 }}
              className="relative bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center">
              <div className="sm:hidden w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{randomTool.logo}</div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">{randomTool.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{randomTool.shortDesc}</p>
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{randomTool.rating}</span>
                <span className="text-slate-400">•</span>
                <span className="text-xs sm:text-sm text-slate-500">{randomTool.pricing}</span>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button onClick={() => { setSelectedTool(randomTool); setRandomTool(null); }}
                  className="flex-1 py-3 bg-indigo-600 active:bg-indigo-700 text-white rounded-xl font-bold text-sm sm:text-base">Detayları Gör</button>
                <button onClick={() => { setRandomTool(null); pickRandomTool(); }}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-white rounded-xl font-bold flex items-center justify-center gap-1.5 text-sm sm:text-base">
                  <Shuffle className="w-4 h-4" /> Başka
                </button>
              </div>
              <button onClick={() => setRandomTool(null)} className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400 active:text-slate-600 py-2">Kapat</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {selectedTool && (
        <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} onSelectTool={(t) => setSelectedTool(t)} />
      )}
    </div>
  );
}
