/*
 * ============================================
 * ADMİN PANELİ
 * ============================================
 * Bu panel sadece SENİN kişisel yönetim aracındır.
 * Ziyaretçiler göremez.
 * 
 * VERİ YAPISI:
 * - Araçlar ve blog yazıları KOD DOSYALARINDA saklanır (src/data/)
 * - Bu dosyaları değiştirip GitHub'a push ettiğinde herkes görür
 * - localStorage sadece kişisel tercihler için (tema, favoriler)
 * - Admin paneldeki görevler/notlar sadece senin tarayıcında kalır
 *
 * DEĞİŞİKLİK YAPMAK İÇİN:
 * - Yeni araç ekle → src/data/tools.ts dosyasını düzenle
 * - Yeni blog yaz → src/data/blog.ts dosyasını düzenle  
 * - Prompt ekle → src/data/prompts.ts dosyasını düzenle
 * - Site ayarları → src/context/DataContext.tsx dosyasını düzenle
 * - Değişiklikleri GitHub'a push et → Vercel otomatik deploy eder
 *
 * YARDIM İÇİN:
 * - Claude AI ile yeni sohbet aç
 * - "AI Araçları Rehberi sitemin kodlarını güncellemek istiyorum" de
 * - GitHub repo linkini paylaş
 * ============================================
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Eye, CheckCircle, TrendingUp, Save, ExternalLink, Copy, Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import { categories } from '../data/tools';

// Admin paneli sekmeleri
type Tab = 'dashboard' | 'guide' | 'addcontent' | 'messages' | 'subscribers' | 'howto' | 'settings';

interface DashboardProps { onExit: () => void; }

export default function AdminDashboard({ onExit }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useData();

  const menuItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'addcontent', label: 'İçerik Ekle', icon: FileText },
    { id: 'messages', label: 'Mesajlar & Öneriler', icon: Eye },
    { id: 'subscribers', label: 'Aboneler', icon: Eye },
    { id: 'guide', label: 'Yol Haritası', icon: TrendingUp },
    { id: 'howto', label: 'Nasıl Yapılır', icon: FileText },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  const switchTab = (tab: Tab) => { setActiveTab(tab); setMobileMenuOpen(false); };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Üst bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-slate-800 rounded-xl">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-bold text-sm sm:text-base">🔐 Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onExit} className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
              <Eye className="w-4 h-4" /><span>Siteyi Gör</span>
            </button>
            <button onClick={() => { logout(); onExit(); }} className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-xl">
              <LogOut className="w-4 h-4" /><span className="hidden sm:inline">Çıkış</span>
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-1 px-4 pb-2">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => switchTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Mobil menü */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setMobileMenuOpen(false)} className="lg:hidden fixed inset-0 bg-black/60 z-40" />
            <motion.aside initial={{x:-280}} animate={{x:0}} exit={{x:-280}} className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-slate-900 border-r border-slate-800 z-50 flex flex-col">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <span className="font-bold">Menü</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {menuItems.map(item => (
                  <button key={item.id} onClick={() => switchTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                    <item.icon className="w-5 h-5" /><span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-3 border-t border-slate-800">
                <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-400">
                  <Eye className="w-5 h-5" /><span>Siteyi Gör</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* İçerik */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'addcontent' && <AddContentTab />}
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'subscribers' && <SubscribersTab />}
        {activeTab === 'guide' && <GuideTab />}
        {activeTab === 'howto' && <HowToTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}

/* ===================== DASHBOARD ===================== */
function DashboardTab() {
  const { tools, blogPosts } = useData();
  
  // Haftalık görev takibi
  const getWeekKey = () => { const d = new Date(); return `wt_${d.getFullYear()}_${Math.ceil(((d.getTime() - new Date(d.getFullYear(),0,1).getTime()) / 86400000 + new Date(d.getFullYear(),0,1).getDay() + 1) / 7)}`; };
  const [done, setDone] = useState<string[]>(() => JSON.parse(localStorage.getItem(getWeekKey()) || '[]'));
  const toggle = (id: string) => { const u = done.includes(id) ? done.filter(x => x !== id) : [...done, id]; setDone(u); localStorage.setItem(getWeekKey(), JSON.stringify(u)); };

  const today = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'][new Date().getDay()];
  const tasks = [
    {id:'w1',day:'Pazartesi',emoji:'📝',task:'Blog taslağı oluştur (ChatGPT ile)'},
    {id:'w2',day:'Salı',emoji:'📝',task:'Blog yazısını düzenle, görselleri ekle, yayınla'},
    {id:'w3',day:'Çarşamba',emoji:'📺',task:'YouTube video scripti yaz'},
    {id:'w4',day:'Perşembe',emoji:'📺',task:'Videoyu kaydet, düzenle ve yayınla'},
    {id:'w5',day:'Cuma',emoji:'📱',task:'Sosyal medya paylaşımları (Twitter, LinkedIn, Instagram)'},
    {id:'w6',day:'Cumartesi',emoji:'🤖',task:'src/data/tools.ts dosyasına 3-5 yeni araç ekle'},
    {id:'w7',day:'Pazar',emoji:'📊',task:'Haftalık analiz yap + gelecek haftayı planla'},
  ];
  const progress = tasks.length > 0 ? (done.length / tasks.length) * 100 : 0;

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          {v: tools.length, l: 'AI Araç', e: '🤖', c: 'from-indigo-500 to-purple-600'},
          {v: blogPosts.length, l: 'Blog Yazısı', e: '📝', c: 'from-green-500 to-emerald-600'},
          {v: categories.length - 1, l: 'Kategori', e: '📂', c: 'from-cyan-500 to-blue-600'},
          {v: blogPosts.filter(p => p.featured).length, l: 'Öne Çıkan', e: '⭐', c: 'from-orange-500 to-red-600'},
        ].map(s => (
          <div key={s.l} className={`bg-gradient-to-br ${s.c} rounded-2xl p-4`}>
            <span className="text-2xl">{s.e}</span>
            <div className="text-3xl font-extrabold mt-1">{s.v}</div>
            <div className="text-sm text-white/70">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Haftalık Görevler */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div><h3 className="font-bold">📅 Bu Haftanın Görevleri</h3><p className="text-xs text-slate-500">Bugün: {today} • {done.length}/{tasks.length}</p></div>
          <span className="text-2xl font-extrabold text-indigo-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{width:`${progress}%`}} />
        </div>
        <div className="space-y-2">
          {tasks.map(t => {
            const isToday = t.day === today;
            const isDone = done.includes(t.id);
            return (
              <div key={t.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${isDone ? 'bg-green-500/10' : isToday ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-slate-800/50'}`}>
                <button onClick={() => toggle(t.id)} className="flex-shrink-0">
                  {isDone ? <CheckCircle className="w-5 h-5 text-green-400" /> : <div className={`w-5 h-5 rounded-full border-2 ${isToday ? 'border-indigo-400' : 'border-slate-600'}`} />}
                </button>
                <span className="text-lg flex-shrink-0">{t.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm ${isDone ? 'text-green-400 line-through' : 'text-white'}`}>{t.task}</span>
                  <span className={`text-xs ml-2 ${isToday ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>{t.day}{isToday && ' ← Bugün'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hızlı bilgi */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
        <h3 className="font-bold text-indigo-300 mb-3">💡 Veri Nasıl Eklenir?</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>• <strong>Yeni araç:</strong> <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-400">src/data/tools.ts</code> dosyasını düzenle</li>
          <li>• <strong>Yeni blog:</strong> <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-400">src/data/blog.ts</code> dosyasını düzenle</li>
          <li>• <strong>Yeni prompt:</strong> <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-400">src/data/prompts.ts</code> dosyasını düzenle</li>
          <li>• Değişiklikleri <strong>GitHub'a push</strong> et → Vercel otomatik yayınlar</li>
        </ul>
      </div>
    </div>
  );
}

/* ===================== YOL HARİTASI ===================== */
function GuideTab() {
  const [completed, setCompleted] = useState<string[]>(() => JSON.parse(localStorage.getItem('guide_completed') || '[]'));
  const [expandedPhase, setExpandedPhase] = useState<string | null>('f1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const toggleStep = (id: string) => { const u = completed.includes(id) ? completed.filter(c => c !== id) : [...completed, id]; setCompleted(u); localStorage.setItem('guide_completed', JSON.stringify(u)); };
  const copyText = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };

  const bionlukTemplate = '🚀 AI ile Profesyonel Blog Yazısı & İçerik Yazarım\n\n✅ Ne Sunuyorum?\n• SEO uyumlu blog yazıları (1000-2000 kelime)\n• Ürün açıklamaları\n• Web sitesi içerikleri\n• Sosyal medya metinleri\n\n✅ Neden Ben?\n• %100 özgün içerik\n• SEO kurallarına uygun\n• Hızlı teslimat (1-2 gün)\n• Revizyon hakkı\n\nSipariş vermeden önce mesaj atmanız yeterli!';
  const blogPrompt = 'Sen profesyonel bir içerik yazarısın. "[KONU]" hakkında SEO uyumlu, 1500 kelimelik blog yazısı yaz.\n\n- Dikkat çekici başlık\n- H2/H3 alt başlıklar\n- Maddeli listeler\n- Pratik örnekler\n- Sonuç ve CTA\n\nHedef kitle: Türkiye\'deki kullanıcılar.\nTon: Samimi ama profesyonel.';

  const allSteps = [
    {id:'f1',phase:'🟢 FAZ 1: Hazırlık',desc:'Bugün başla',earning:null,items:[
      {id:'1',text:'ChatGPT hesabı aç',link:'https://chat.openai.com',note:'Ücretsiz'},{id:'2',text:'Bionluk hesabı aç',link:'https://bionluk.com'},{id:'3',text:'Canva hesabı aç',link:'https://canva.com'},{id:'4',text:'GitHub hesabı aç',link:'https://github.com'}]},
    {id:'f2',phase:'🟡 FAZ 2: İlk Para',desc:'Hafta 1-2',earning:'₺200-1.000',items:[
      {id:'5',text:'Bionluk\'ta ilan aç (şablonu kopyala)',note:'Aşağıdaki şablonu kullan'},{id:'6',text:'Fiyat: ₺50-100 koy'},{id:'7',text:'ChatGPT ile 3-5 deneme yazı yaz'},{id:'8',text:'İlk siparişi tamamla'},{id:'9',text:'Fiverr\'da da ilan aç',link:'https://fiverr.com'}]},
    {id:'f3',phase:'🔵 FAZ 3: Siteyi Yayınla',desc:'Hafta 2-3',earning:null,items:[
      {id:'10',text:'Kodu GitHub\'a yükle'},{id:'11',text:'Vercel hesabı aç ve bağla',link:'https://vercel.com'},{id:'12',text:'Domain al',link:'https://namecheap.com',note:'~₺150-300/yıl'},{id:'13',text:'Domain\'i Vercel\'e bağla'},{id:'14',text:'EmailJS kur',link:'https://emailjs.com'}]},
    {id:'f4',phase:'🟣 FAZ 4: SEO & İçerik',desc:'Ay 1-3',earning:'₺500-3.000/ay',items:[
      {id:'15',text:'Search Console\'a ekle',link:'https://search.google.com/search-console'},{id:'16',text:'Analytics kur',link:'https://analytics.google.com'},{id:'17',text:'Haftada 2 blog yazısı ekle (src/data/blog.ts)'},{id:'18',text:'Her hafta 5 yeni araç ekle (src/data/tools.ts)'}]},
    {id:'f5',phase:'💰 FAZ 5: Affiliate',desc:'Ay 1-3',earning:'₺1.000-5.000/ay',items:[
      {id:'19',text:'Hostinger Affiliate',link:'https://hostinger.com.tr/affiliates'},{id:'20',text:'Canva Affiliate ($36/kayıt)',link:'https://canva.com/affiliates/'},{id:'21',text:'Semrush Affiliate ($200/satış!)',link:'https://semrush.com/partner/'},{id:'22',text:'Blog yazılarına affiliate link ekle'}]},
    {id:'f6',phase:'📺 FAZ 6: YouTube',desc:'Ay 2-6',earning:'₺2.000-8.000/ay',items:[
      {id:'23',text:'YouTube kanalı aç',link:'https://studio.youtube.com'},{id:'24',text:'İlk video: ChatGPT tanıtım'},{id:'25',text:'Video açıklamalarına affiliate link'}]},
    {id:'f7',phase:'📊 FAZ 7: Reklam',desc:'Ay 3-6',earning:'₺3.000-10.000/ay',items:[
      {id:'26',text:'AdSense başvurusu',link:'https://adsense.google.com'},{id:'27',text:'E-posta listesi 500+ kişi'},{id:'28',text:'Sponsorluk teklifleri gönder'}]},
    {id:'f8',phase:'🚀 FAZ 8: Ölçekleme',desc:'Ay 6-12',earning:'₺10.000-30.000/ay',items:[
      {id:'29',text:'Udemy\'de kurs hazırla',link:'https://udemy.com'},{id:'30',text:'AI danışmanlık hizmeti'},{id:'31',text:'İkinci niş site aç'}]},
  ];

  const totalItems = allSteps.reduce((s, p) => s + p.items.length, 0);
  const completedItems = allSteps.reduce((s, p) => s + p.items.filter(i => completed.includes(i.id)).length, 0);
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  const currentPhase = allSteps.find(s => s.items.some(i => !completed.includes(i.id))) || allSteps[allSteps.length - 1];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl sm:text-3xl font-bold">🚀 Yol Haritası</h1><p className="text-slate-400 mt-1 text-sm">Sırasıyla takip et. İlerlemeni kaydet.</p></div>

      {/* Progress */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <div className="flex justify-between text-sm text-slate-400 mb-2"><span>İlerleme</span><span className="font-bold text-white">{completedItems}/{totalItems}</span></div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500" style={{width:`${progress}%`}} /></div>
        <p className="text-xs text-slate-500 mt-2">Şu an: {currentPhase.phase}</p>
      </div>

      {/* Fazlar */}
      <div className="space-y-3">
        {allSteps.map((phase, pi) => {
          const done = phase.items.every(i => completed.includes(i.id));
          const started = phase.items.some(i => completed.includes(i.id));
          const open = expandedPhase === phase.id;
          return (
            <div key={phase.id} className={`rounded-2xl border overflow-hidden ${done ? 'bg-green-500/5 border-green-500/30' : started ? 'bg-indigo-500/5 border-indigo-500/30' : 'bg-slate-900 border-slate-800'}`}>
              <button onClick={() => setExpandedPhase(open ? null : phase.id)} className="w-full p-4 flex items-center gap-4 text-left">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${done ? 'bg-green-500 text-white' : started ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>{done ? '✓' : pi + 1}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm sm:text-base ${done ? 'text-green-400' : 'text-white'}`}>{phase.phase}</h3>
                  <div className="flex items-center gap-2 mt-0.5"><span className="text-xs text-slate-500">{phase.desc}</span>{phase.earning && <span className="text-xs text-green-400">💰 {phase.earning}</span>}</div>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">{phase.items.filter(i => completed.includes(i.id)).length}/{phase.items.length}</span>
              </button>
              {open && (
                <div className="px-4 pb-4 space-y-2 border-t border-slate-800/50 pt-3">
                  {phase.items.map(item => (
                    <div key={item.id} className={`flex items-start gap-3 p-3 rounded-xl ${completed.includes(item.id) ? 'bg-green-500/10' : 'bg-slate-800/50'}`}>
                      <button onClick={() => toggleStep(item.id)} className="mt-0.5 flex-shrink-0">
                        {completed.includes(item.id) ? <CheckCircle className="w-5 h-5 text-green-400" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-600" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${completed.includes(item.id) ? 'text-green-400 line-through' : 'text-white'}`}>{item.text}</p>
                        {(item as any).note && <p className="text-xs text-slate-500 mt-0.5">💡 {(item as any).note}</p>}
                        {(item as any).link && <a href={(item as any).link} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:underline">{(item as any).link} →</a>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Şablonlar */}
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-3">📋 Bionluk İlan Şablonu</h3>
        <div className="bg-slate-900/50 rounded-xl p-4 relative"><pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">{bionlukTemplate}</pre>
          <button onClick={() => copyText(bionlukTemplate, 'b')} className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-bold ${copiedId === 'b' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{copiedId === 'b' ? '✓ Kopyalandı' : '📋 Kopyala'}</button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-3">🤖 ChatGPT Promptu</h3>
        <div className="bg-slate-900/50 rounded-xl p-4 relative"><pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">{blogPrompt}</pre>
          <button onClick={() => copyText(blogPrompt, 'p')} className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-bold ${copiedId === 'p' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{copiedId === 'p' ? '✓ Kopyalandı' : '📋 Kopyala'}</button>
        </div>
      </div>

      {/* Kazanç + Rakip */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800">
        <h3 className="font-bold text-lg mb-4">💰 Aylık Kazanç Tahmini</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[{m:'1. Ay',e:'₺0',c:'border-red-400'},{m:'2-3. Ay',e:'₺0-500',c:'border-orange-400'},{m:'4-6. Ay',e:'₺500-3K',c:'border-yellow-400'},{m:'6-12. Ay',e:'₺3K-15K',c:'border-green-400'}].map(t => (
            <div key={t.m} className={`border-l-4 ${t.c} bg-slate-800/50 rounded-xl p-3`}>
              <div className="text-xs text-slate-400">{t.m}</div><div className="text-lg font-bold text-green-400">{t.e}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800">
        <h3 className="font-bold text-lg mb-3">🤝 Affiliate Programları</h3>
        <div className="space-y-2">
          {[{n:'Semrush',c:'$200/satış',l:'https://semrush.com/partner/'},{n:'Hostinger',c:'%60 komisyon',l:'https://hostinger.com.tr/affiliates'},{n:'Canva',c:'$36/kayıt',l:'https://canva.com/affiliates/'},{n:'NordVPN',c:'%40-100',l:'https://nordvpn.com/affiliate/'}].map(a => (
            <div key={a.n} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
              <div><div className="font-medium text-sm">{a.n}</div><div className="text-xs text-green-400">{a.c}</div></div>
              <a href={a.l} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg">Başvur →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== NASIL YAPILIR — kod değişikliği rehberi ===================== */
function HowToTab() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };

  const toolExample = `  t('yeni-arac','Araç Adı','yazı','Kısa açıklama.','Detaylı açıklama.','Ücretsiz / Pro: $10/ay','freemium',4.5,['Özellik 1','Özellik 2'],['Kullanım 1','Kullanım 2'],'https://arac-url.com','🆕'),`;

  const blogExample = `  {
    id: '${Date.now()}', slug: 'yeni-yazi-basligi',
    title: 'Yeni Yazı Başlığı',
    excerpt: 'Yazının kısa özeti buraya.',
    category: 'Başlangıç Rehberi',
    author: 'AI Araçları Rehberi',
    date: '${new Date().toISOString().split('T')[0]}',
    readTime: '5 dk', image: '📝',
    tags: ['AI', 'Rehber'],
    featured: false,
    content: \`# Başlık\\n\\nİçerik buraya Markdown formatında yazılır.\\n\\n## Alt Başlık\\n\\n- Madde 1\\n- Madde 2\`,
  },`;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl sm:text-3xl font-bold">📖 Nasıl Yapılır</h1><p className="text-slate-400 mt-1 text-sm">Siteye içerik ekleme ve değişiklik yapma rehberi</p></div>

      {/* Önemli Uyarı */}
      <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl p-5">
        <h3 className="font-bold text-amber-300 mb-2">⚠️ Önemli: Veriler Nerede Saklanır?</h3>
        <ul className="space-y-1.5 text-sm text-amber-200">
          <li>• Araçlar, blog yazıları ve promptlar <strong>kod dosyalarında</strong> saklanır</li>
          <li>• Bu dosyaları düzenleyip <strong>GitHub'a push</strong> ettiğinde herkes görür</li>
          <li>• Admin paneldeki görevler/ilerleme sadece <strong>senin tarayıcında</strong> kalır</li>
          <li>• Ziyaretçilerin favorileri ve tema tercihi kendi tarayıcılarında kalır</li>
        </ul>
      </div>

      {/* Yeni Araç Ekleme */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <h3 className="font-bold text-lg mb-3">🤖 Yeni AI Aracı Eklemek</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <p><strong>Dosya:</strong> <code className="bg-slate-800 px-2 py-0.5 rounded text-indigo-400">src/data/tools.ts</code></p>
          <p>Dosyanın sonundaki <code className="bg-slate-800 px-1 rounded">];</code> satırından hemen önce şu kodu ekle:</p>
          <div className="bg-slate-950 rounded-xl p-4 relative"><pre className="text-xs text-green-400 whitespace-pre-wrap font-mono overflow-x-auto">{toolExample}</pre>
            <button onClick={() => copy(toolExample, 'tool')} className={`absolute top-2 right-2 p-2 rounded-lg ${copiedId === 'tool' ? 'bg-green-600' : 'bg-slate-700'}`}>
              {copiedId === 'tool' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-slate-300" />}
            </button>
          </div>
          <p className="text-xs text-slate-500">Kategori seçenekleri: yazı, görsel, video, kodlama, pazarlama, üretkenlik, eğitim, iş, sosyal</p>
        </div>
      </div>

      {/* Yeni Blog Ekleme */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <h3 className="font-bold text-lg mb-3">📝 Yeni Blog Yazısı Eklemek</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <p><strong>Dosya:</strong> <code className="bg-slate-800 px-2 py-0.5 rounded text-indigo-400">src/data/blog.ts</code></p>
          <p><code className="bg-slate-800 px-1 rounded">blogPosts</code> dizisinin sonuna ekle:</p>
          <div className="bg-slate-950 rounded-xl p-4 relative"><pre className="text-xs text-green-400 whitespace-pre-wrap font-mono overflow-x-auto">{blogExample}</pre>
            <button onClick={() => copy(blogExample, 'blog')} className={`absolute top-2 right-2 p-2 rounded-lg ${copiedId === 'blog' ? 'bg-green-600' : 'bg-slate-700'}`}>
              {copiedId === 'blog' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-slate-300" />}
            </button>
          </div>
          <p className="text-xs text-slate-500">İçerik Markdown formatında yazılır. # başlık, ## alt başlık, - madde, **kalın**, *italik*</p>
        </div>
      </div>

      {/* Değişiklikleri Yayınlama */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <h3 className="font-bold text-lg mb-3">🚀 Değişiklikleri Yayınlama</h3>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex gap-3 p-3 bg-slate-800/50 rounded-xl"><span className="bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span><span>Kod dosyasını düzenle (tools.ts veya blog.ts)</span></div>
          <div className="flex gap-3 p-3 bg-slate-800/50 rounded-xl"><span className="bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span><span>Terminal'de: <code className="bg-slate-800 px-1 rounded">git add . && git commit -m "yeni araç eklendi" && git push</code></span></div>
          <div className="flex gap-3 p-3 bg-slate-800/50 rounded-xl"><span className="bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span><span>Vercel otomatik olarak siteyi günceller (1-2 dk)</span></div>
        </div>
      </div>

      {/* Yardım */}
      <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-3">🤝 Yardım & Destek</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <p>Siteye yeni özellik eklemek veya değişiklik yapmak istersen:</p>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <p className="font-bold text-white mb-2">Claude AI ile yeni sohbet aç ve şunu yaz:</p>
            <p className="text-indigo-300 italic">"Daha önce birlikte AI Araçları Rehberi sitesi yaptık. React + Vite + Tailwind CSS ile. GitHub repo linkim: [LİNK]. Şimdi şu değişikliği yapmak istiyorum: [AÇIKLAMA]"</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <p className="font-bold text-white mb-2">Faydalı linkler:</p>
            <div className="space-y-1">
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-400 hover:underline"><ExternalLink className="w-3 h-3" />Claude AI — Kod yardımı için</a>
              <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-400 hover:underline"><ExternalLink className="w-3 h-3" />ChatGPT — İçerik üretimi için</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-400 hover:underline"><ExternalLink className="w-3 h-3" />GitHub — Kodu yönetmek için</a>
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-400 hover:underline"><ExternalLink className="w-3 h-3" />Vercel — Siteyi yayınlamak için</a>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Rehberi */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <h3 className="font-bold text-lg mb-4">🐙 GitHub Adım Adım</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-sm text-indigo-400 mb-2">İlk Kez (Bir Kerelik Kurulum):</h4>
            <div className="space-y-2 text-xs">
              <div className="flex gap-3 p-2.5 bg-slate-800/50 rounded-xl"><span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span><div><a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">github.com/new</a> → Yeni repo oluştur (isim: ai-arac-rehberi)</div></div>
              <div className="flex gap-3 p-2.5 bg-slate-800/50 rounded-xl"><span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span><div>Bilgisayarına <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Git</a> kur</div></div>
              <div className="flex gap-3 p-2.5 bg-slate-800/50 rounded-xl"><span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span><div>Terminal aç, proje klasörüne git:<br/><code className="bg-slate-900 px-2 py-0.5 rounded text-green-400 block mt-1">cd proje-klasoru</code></div></div>
              <div className="flex gap-3 p-2.5 bg-slate-800/50 rounded-xl"><span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span><div>Şu komutları sırayla çalıştır:<br/><code className="bg-slate-900 px-2 py-0.5 rounded text-green-400 block mt-1 whitespace-pre-wrap">git init{'\n'}git add .{'\n'}git commit -m "ilk yukleme"{'\n'}git branch -M main{'\n'}git remote add origin https://github.com/SENIN_ADIN/REPO_ADI.git{'\n'}git push -u origin main</code></div></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm text-green-400 mb-2">Her Değişiklikte (araç/blog ekledikten sonra):</h4>
            <div className="bg-slate-800/50 rounded-xl p-3"><code className="text-xs text-green-400 whitespace-pre-wrap">git add .{'\n'}git commit -m "yeni arac eklendi"{'\n'}git push</code></div>
          </div>
          <div>
            <h4 className="font-bold text-sm text-cyan-400 mb-2">Vercel Bağlantısı:</h4>
            <div className="space-y-1 text-xs text-slate-300">
              <p>1. <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">vercel.com</a> → GitHub ile giriş yap</p>
              <p>2. "Import Project" → repo'nu seç → Deploy</p>
              <p>3. Her <code className="bg-slate-800 px-1 rounded">git push</code> yaptığında site otomatik güncellenir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Önerileri */}
      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-3">🌐 Domain Önerileri</h3>
        <p className="text-xs text-slate-400 mb-4">Kontrol et: <a href="https://namecheap.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">namecheap.com</a> veya <a href="https://www.turkticaret.net" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">turkticaret.net</a></p>
        <div className="space-y-2">
          {[
            {d:'zekaaraclari.com', n:'Kısa, akılda kalıcı, SEO uyumlu', s:'⭐⭐⭐⭐⭐'},
            {d:'aizeka.com.tr', n:'AI + Zeka birleşimi, .com.tr güveni', s:'⭐⭐⭐⭐⭐'},
            {d:'yapayrehber.com', n:'Yapay zeka rehberi, anlaşılır', s:'⭐⭐⭐⭐'},
            {d:'aiaraclari.com', n:'Direkt açıklayıcı', s:'⭐⭐⭐⭐'},
            {d:'zekabox.com', n:'Modern, uluslararası his', s:'⭐⭐⭐⭐'},
            {d:'airehberim.com', n:'Kişisel dokunuş', s:'⭐⭐⭐'},
            {d:'akilliarac.com', n:'Akıllı araç = AI tool', s:'⭐⭐⭐'},
            {d:'dijitalzeka.com', n:'Dijital + zeka', s:'⭐⭐⭐'},
          ].map(d => (
            <div key={d.d} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
              <div><span className="font-bold text-sm text-white">{d.d}</span><br/><span className="text-xs text-slate-400">{d.n}</span></div>
              <span className="text-xs flex-shrink-0">{d.s}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">💡 İlk tercihin <strong>.com</strong> olsun. Yoksa <strong>.com.tr</strong> dene. Kısa ve Türkçe karaktersiz seç.</p>
      </div>
    </div>
  );
}

/* ===================== AYARLAR ===================== */
function SettingsTab() {
  const { settings, updateSettings } = useData();
  const [d, setD] = useState(settings);
  const [saved, setSaved] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); updateSettings(d); setSaved(true); setTimeout(() => setSaved(false), 3000); };
  const ic = 'w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none text-base';
  const lc = 'block text-sm font-medium text-slate-400 mb-1.5';

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">⚙️ Ayarlar</h1>
      <p className="text-slate-400 text-sm mb-6">Bu ayarlar sadece senin tarayıcında saklanır. Site genelindeki ayarlar kod dosyalarından değiştirilir.</p>
      <form onSubmit={submit} className="space-y-6 max-w-2xl">
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4">
          <h2 className="font-bold text-lg">📧 EmailJS (Gerçek Mail)</h2>
          <p className="text-xs text-slate-400"><a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">emailjs.com</a> hesabı açın. Ayda 200 mail ücretsiz.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lc}>Service ID</label><input type="text" value={d.emailjsServiceId} onChange={e => setD({...d, emailjsServiceId: e.target.value})} placeholder="service_xxxxx" className={ic} /></div>
            <div><label className={lc}>Public Key</label><input type="text" value={d.emailjsPublicKey} onChange={e => setD({...d, emailjsPublicKey: e.target.value})} className={ic} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lc}>İletişim Template</label><input type="text" value={d.emailjsTemplateContact} onChange={e => setD({...d, emailjsTemplateContact: e.target.value})} className={ic} /></div>
            <div><label className={lc}>Bülten Template</label><input type="text" value={d.emailjsTemplateNewsletter} onChange={e => setD({...d, emailjsTemplateNewsletter: e.target.value})} className={ic} /></div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4">
          <h2 className="font-bold text-lg">🔐 Güvenlik</h2>
          <div><label className={lc}>Admin Şifresi</label><input type="text" value={d.adminPassword} onChange={e => setD({...d, adminPassword: e.target.value})} className={ic} />
          <p className="text-xs text-slate-500 mt-1.5">Bu şifre sadece tarayıcında saklanır. Kaynak kodda görünmez.</p></div>
        </div>

        <button type="submit" className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white'}`}>
          {saved ? <><CheckCircle className="w-5 h-5" />Kaydedildi!</> : <><Save className="w-5 h-5" />Kaydet</>}
        </button>
      </form>

      {/* localStorage temizleme */}
      <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
        <h3 className="font-bold text-red-400 mb-2">🗑️ Verileri Temizle</h3>
        <p className="text-xs text-slate-400 mb-3">Tarayıcındaki tüm admin verilerini siler (görevler, ilerleme, ayarlar). Site verileri etkilenmez.</p>
        <button onClick={() => { if (confirm('Tüm yerel veriler silinecek. Emin misiniz?')) { localStorage.clear(); window.location.reload(); } }}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-xl">Tüm Yerel Verileri Sil</button>
      </div>
    </div>
  );
}

/* ===================== İÇERİK EKLE — form doldur, kod üret, kopyala yapıştır ===================== */
function AddContentTab() {
  const [mode, setMode] = useState<'tool'|'blog'>('tool');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [td, setTd] = useState({name:'',category:'yazı',shortDesc:'',description:'',pricing:'',pricingType:'freemium',rating:'4.5',features:'',useCases:'',url:'',logo:'🤖'});
  const [bd, setBd] = useState({title:'',excerpt:'',category:'Başlangıç Rehberi',readTime:'5 dk',image:'📝',tags:'',content:'',featured:false});

  const genTool = () => {
    const feats = td.features.split('\n').filter(Boolean).map(f=>`'${f.trim()}'`).join(',');
    const uses = td.useCases.split('\n').filter(Boolean).map(u=>`'${u.trim()}'`).join(',');
    const id = td.name.toLowerCase().replace(/[^a-z0-9]/g,'-').replace(/-+/g,'-');
    setGenerated(`  t('${id}','${td.name}','${td.category}','${td.shortDesc}','${td.description}','${td.pricing}','${td.pricingType}',${td.rating},[${feats}],[${uses}],'${td.url}','${td.logo}'),`);
  };

  const genBlog = () => {
    const slug = bd.title.toLowerCase().replace(/[^a-zğüşöçı0-9\s]/g,'').replace(/\s+/g,'-');
    const tags = bd.tags.split(',').map(t=>`'${t.trim()}'`).join(',');
    const content = bd.content.replace(/`/g,'\\`').replace(/\$/g,'\\$');
    setGenerated(`  {\n    id:'${Date.now()}',slug:'${slug}',\n    title:'${bd.title}',\n    excerpt:'${bd.excerpt}',\n    category:'${bd.category}',author:'AI Araçları Rehberi',\n    date:'${new Date().toISOString().split('T')[0]}',readTime:'${bd.readTime}',image:'${bd.image}',\n    tags:[${tags}],featured:${bd.featured},\n    content:\`${content}\`,\n  },`);
  };

  const copyCode = () => { navigator.clipboard.writeText(generated); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const ic = 'w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none';
  const lc = 'block text-xs font-medium text-slate-400 mb-1';

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl sm:text-3xl font-bold">➕ İçerik Ekle</h1><p className="text-slate-400 mt-1 text-sm">Formu doldur → kod üret → kopyala → dosyaya yapıştır → push et</p></div>

      <div className="flex gap-2">
        <button onClick={()=>{setMode('tool');setGenerated('');}} className={`px-4 py-2 rounded-xl text-sm font-medium ${mode==='tool'?'bg-indigo-600 text-white':'bg-slate-800 text-slate-400'}`}>🤖 Araç</button>
        <button onClick={()=>{setMode('blog');setGenerated('');}} className={`px-4 py-2 rounded-xl text-sm font-medium ${mode==='blog'?'bg-indigo-600 text-white':'bg-slate-800 text-slate-400'}`}>📝 Blog</button>
      </div>

      {mode==='tool' && (
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className={lc}>Araç Adı *</label><input value={td.name} onChange={e=>setTd({...td,name:e.target.value})} placeholder="ChatGPT" className={ic} /></div>
            <div><label className={lc}>Emoji</label><input value={td.logo} onChange={e=>setTd({...td,logo:e.target.value})} className={ic} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className={lc}>Kategori</label><select value={td.category} onChange={e=>setTd({...td,category:e.target.value})} className={ic}>{categories.filter(c=>c.id!=='all').map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
            <div><label className={lc}>Fiyat Tipi</label><select value={td.pricingType} onChange={e=>setTd({...td,pricingType:e.target.value})} className={ic}><option value="free">Ücretsiz</option><option value="freemium">Freemium</option><option value="paid">Ücretli</option></select></div>
          </div>
          <div><label className={lc}>Kısa Açıklama *</label><input value={td.shortDesc} onChange={e=>setTd({...td,shortDesc:e.target.value})} className={ic} /></div>
          <div><label className={lc}>Detaylı Açıklama</label><textarea value={td.description} onChange={e=>setTd({...td,description:e.target.value})} rows={2} className={ic} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className={lc}>Fiyat</label><input value={td.pricing} onChange={e=>setTd({...td,pricing:e.target.value})} placeholder="Ücretsiz / $20/ay" className={ic} /></div>
            <div><label className={lc}>Puan</label><input value={td.rating} onChange={e=>setTd({...td,rating:e.target.value})} className={ic} /></div>
          </div>
          <div><label className={lc}>URL</label><input value={td.url} onChange={e=>setTd({...td,url:e.target.value})} placeholder="https://..." className={ic} /></div>
          <div><label className={lc}>Özellikler (satır satır)</label><textarea value={td.features} onChange={e=>setTd({...td,features:e.target.value})} rows={3} placeholder={"Metin üretimi\nGörsel analiz"} className={ic} /></div>
          <div><label className={lc}>Kullanım Alanları (satır satır)</label><textarea value={td.useCases} onChange={e=>setTd({...td,useCases:e.target.value})} rows={2} className={ic} /></div>
          <button onClick={genTool} disabled={!td.name||!td.shortDesc} className="w-full py-3 bg-indigo-600 disabled:bg-slate-700 text-white rounded-xl font-bold text-sm">🔧 Kodu Üret</button>
        </div>
      )}

      {mode==='blog' && (
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3">
          <div><label className={lc}>Başlık *</label><input value={bd.title} onChange={e=>setBd({...bd,title:e.target.value})} className={ic} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className={lc}>Kategori</label><select value={bd.category} onChange={e=>setBd({...bd,category:e.target.value})} className={ic}><option>Başlangıç Rehberi</option><option>Karşılaştırma</option><option>Para Kazanma</option><option>Araç İnceleme</option><option>Trendler</option><option>Eğitim</option><option>İpuçları</option></select></div>
            <div><label className={lc}>Emoji</label><input value={bd.image} onChange={e=>setBd({...bd,image:e.target.value})} className={ic} /></div>
            <div><label className={lc}>Okuma Süresi</label><input value={bd.readTime} onChange={e=>setBd({...bd,readTime:e.target.value})} className={ic} /></div>
          </div>
          <div><label className={lc}>Özet *</label><textarea value={bd.excerpt} onChange={e=>setBd({...bd,excerpt:e.target.value})} rows={2} className={ic} /></div>
          <div><label className={lc}>İçerik (Markdown) *</label><textarea value={bd.content} onChange={e=>setBd({...bd,content:e.target.value})} rows={8} placeholder={"# Başlık\n\nİçerik..."} className={`${ic} font-mono`} /></div>
          <div><label className={lc}>Etiketler (virgülle)</label><input value={bd.tags} onChange={e=>setBd({...bd,tags:e.target.value})} placeholder="AI, Rehber" className={ic} /></div>
          <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={bd.featured} onChange={e=>setBd({...bd,featured:e.target.checked})} />Öne çıkan</label>
          <button onClick={genBlog} disabled={!bd.title||!bd.excerpt} className="w-full py-3 bg-indigo-600 disabled:bg-slate-700 text-white rounded-xl font-bold text-sm">🔧 Kodu Üret</button>
        </div>
      )}

      {generated && (
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-green-500/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-green-400">✅ Kod Hazır</h3>
            <button onClick={copyCode} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied?'bg-green-600 text-white':'bg-slate-700 text-slate-300'}`}>{copied?'✓ Kopyalandı':'📋 Kopyala'}</button>
          </div>
          <pre className="bg-slate-950 rounded-xl p-4 text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto">{generated}</pre>
          <p className="mt-3 text-xs text-slate-400">📌 Kopyala → <code className="bg-slate-800 px-1 rounded">{mode==='tool'?'src/data/tools.ts':'src/data/blog.ts'}</code> → <code className="bg-slate-800 px-1 rounded">];</code> satırından önce yapıştır → GitHub'a push et</p>
        </div>
      )}
    </div>
  );
}

/* ===================== ABONELER ===================== */
function SubscribersTab() {
  const [subs, setSubs] = useState<any[]>(() => JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]'));
  const refresh = () => setSubs(JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]'));
  const del = (email: string) => { const u = subs.filter((s: any) => s.email !== email); setSubs(u); localStorage.setItem('newsletter_subscribers', JSON.stringify(u)); };
  const exportCSV = () => { const csv = 'E-posta,Tarih\n' + subs.map((s: any) => `${s.email},${new Date(s.date).toLocaleDateString('tr-TR')}`).join('\n'); const b = new Blob([csv], {type:'text/csv;charset=utf-8;'}); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'aboneler.csv'; a.click(); };
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl sm:text-3xl font-bold">📧 Aboneler</h1><p className="text-slate-400 text-sm mt-1">{subs.length} abone</p></div>
        <div className="flex gap-2">
          <button onClick={refresh} className="px-3 py-2 bg-slate-800 text-white text-sm rounded-xl">🔄</button>
          {subs.length > 0 && <button onClick={exportCSV} className="px-4 py-2 bg-green-600 text-white text-sm rounded-xl">📥 CSV</button>}
        </div>
      </div>
      {subs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800"><span className="text-5xl block mb-4">📧</span><p className="text-slate-400">Henüz abone yok.</p><p className="text-xs text-slate-500 mt-2">Footer'daki formdan abone olunur.</p></div>
      ) : (
        <div className="space-y-2">{subs.slice().reverse().map((s: any, i: number) => (
          <div key={i} className="bg-slate-900 rounded-xl p-3 sm:p-4 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-indigo-600/20 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-indigo-400 text-sm font-bold">{s.email.charAt(0).toUpperCase()}</span></div>
              <div className="min-w-0"><div className="text-sm font-medium truncate">{s.email}</div><div className="text-xs text-slate-500">{new Date(s.date).toLocaleDateString('tr-TR')}{new Date(s.date).getTime() > weekAgo && <span className="ml-1 text-green-400">🆕</span>}</div></div>
            </div>
            <button onClick={() => del(s.email)} className="text-red-400 text-xs px-2 py-1 hover:bg-red-500/20 rounded">Sil</button>
          </div>
        ))}</div>
      )}
      <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl"><p className="text-xs text-slate-400">💡 CSV indirip <a href="https://mailchimp.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Mailchimp</a>'e yükleyerek toplu mail gönderebilirsiniz.</p></div>
      {/* Bülten bilgisi */}
      <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <h4 className="font-bold text-sm text-amber-300 mb-2">📨 Otomatik Mail Gönderimi Hakkında</h4>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• <strong>İletişim formu:</strong> EmailJS ayarlanırsa gerçek mail gider ✅</li>
          <li>• <strong>Yeni içerik bildirimi:</strong> Otomatik mail gitmez ❌</li>
          <li>• <strong>Toplu mail göndermek için:</strong> CSV indir → Mailchimp veya Brevo'ya yükle → oradan gönder</li>
          <li>• <strong>Alternatif:</strong> Substack veya Buttondown gibi ücretsiz bülten servisleri kullanabilirsin</li>
        </ul>
      </div>
    </div>
  );
}

/* ===================== MESAJLAR & ÖNERİLER ===================== */
function MessagesTab() {
  const [view, setView] = useState<'messages' | 'submissions'>('messages');
  const [messages, setMessages] = useState<any[]>(() => JSON.parse(localStorage.getItem('contact_messages') || '[]'));
  const [submissions, setSubmissions] = useState<any[]>(() => JSON.parse(localStorage.getItem('tool_submissions') || '[]'));
  const [expanded, setExpanded] = useState<string | null>(null);

  const saveMsg = (u: any[]) => { setMessages(u); localStorage.setItem('contact_messages', JSON.stringify(u)); };
  const saveSub = (u: any[]) => { setSubmissions(u); localStorage.setItem('tool_submissions', JSON.stringify(u)); };
  const unread = messages.filter((m: any) => !m.read).length;
  const pending = submissions.filter((s: any) => s.status === 'pending').length;

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">📬 Mesajlar & Öneriler</h1>
      <p className="text-slate-400 text-sm mb-6">İletişim formu mesajları ve ziyaretçi araç önerileri</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setView('messages')} className={`px-4 py-2 rounded-xl text-sm font-medium ${view === 'messages' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
          📬 Mesajlar {unread > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unread}</span>}
        </button>
        <button onClick={() => setView('submissions')} className={`px-4 py-2 rounded-xl text-sm font-medium ${view === 'submissions' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
          📥 Öneriler {pending > 0 && <span className="ml-1 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full">{pending}</span>}
        </button>
      </div>

      {/* MESAJLAR */}
      {view === 'messages' && (
        <div>
          {messages.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800"><span className="text-5xl block mb-4">📭</span><p className="text-slate-400">Henüz mesaj yok.</p></div>
          ) : (
            <div className="space-y-2">
              {unread > 0 && <button onClick={() => saveMsg(messages.map((m: any) => ({...m, read: true})))} className="text-xs text-slate-400 hover:text-white mb-2">Tümünü okundu yap</button>}
              {messages.slice().reverse().map((m: any) => (
                <div key={m.id} className={`bg-slate-900 rounded-xl border ${m.read ? 'border-slate-800' : 'border-indigo-500'}`}>
                  <div className="p-3 sm:p-4 cursor-pointer" onClick={() => { setExpanded(expanded === m.id ? null : m.id); if (!m.read) saveMsg(messages.map((x: any) => x.id === m.id ? {...x, read: true} : x)); }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${m.read ? 'bg-slate-800 text-slate-400' : 'bg-indigo-600 text-white'}`}>{(m.name || '?').charAt(0).toUpperCase()}</div>
                        <div className="min-w-0"><span className="font-bold text-sm truncate block">{m.name}</span><span className="text-xs text-slate-500">{m.email}</span></div>
                      </div>
                      <span className="text-xs text-slate-500 flex-shrink-0">{new Date(m.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    {expanded !== m.id && <p className="text-xs text-slate-500 mt-2 line-clamp-1">{m.message}</p>}
                  </div>
                  {expanded === m.id && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-slate-800 pt-3">
                      {m.subject && <span className="text-xs text-indigo-400 block mb-2">Konu: {m.subject}</span>}
                      <p className="text-sm text-slate-300 whitespace-pre-wrap">{m.message}</p>
                      <div className="flex gap-2 mt-3">
                        <a href={`mailto:${m.email}`} className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg">📧 Yanıtla</a>
                        <button onClick={() => saveMsg(messages.filter((x: any) => x.id !== m.id))} className="px-3 py-1.5 bg-red-600/20 text-red-400 text-xs rounded-lg">Sil</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ÖNERİLER */}
      {view === 'submissions' && (
        <div>
          {submissions.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800"><span className="text-5xl block mb-4">📭</span><p className="text-slate-400">Henüz öneri yok.</p></div>
          ) : (
            <div className="space-y-3">
              {submissions.slice().reverse().map((s: any) => (
                <div key={s.id} className={`bg-slate-900 rounded-xl p-3 sm:p-4 border ${s.status === 'pending' ? 'border-yellow-500/30' : 'border-slate-800'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div><h3 className="font-bold text-sm">{s.name}</h3><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400">{s.url}</a></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${s.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : s.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{s.status === 'pending' ? 'Bekliyor' : s.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{s.description}</p>
                  {s.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => saveSub(submissions.map((x: any) => x.id === s.id ? {...x, status: 'approved'} : x))} className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg">✅ Onayla</button>
                      <button onClick={() => saveSub(submissions.map((x: any) => x.id === s.id ? {...x, status: 'rejected'} : x))} className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg">Reddet</button>
                      <button onClick={() => saveSub(submissions.filter((x: any) => x.id !== s.id))} className="px-3 py-1.5 bg-slate-700 text-white text-xs rounded-lg">Sil</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <p className="text-xs text-slate-400">💡 Onayladığın önerileri <strong>İçerik Ekle</strong> sekmesinden kod olarak üretip siteye ekleyebilirsin.</p>
          </div>
        </div>
      )}
    </div>
  );
}
