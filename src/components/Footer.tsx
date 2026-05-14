import { useRef } from 'react';
import { Sparkles, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: Props) {
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSecretClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 2000);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      if ((window as any).__oa) (window as any).__oa();
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const subs = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      subs.push({ email, date: new Date().toISOString() });
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subs));
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-6 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-10 sm:mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg sm:text-2xl font-extrabold text-white mb-1 sm:mb-2">
                Yapay Zeka Haberlerini Kaçırmayın
              </h3>
              <p className="text-indigo-200 text-xs sm:text-sm">
                Her hafta yeni AI araçları ve ipuçları e-posta kutunuza gelsin.
              </p>
            </div>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="flex-1 md:w-64 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                />
                <button type="submit" className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white text-indigo-700 font-bold rounded-lg sm:rounded-xl active:bg-indigo-50 text-xs sm:text-sm flex items-center gap-1 flex-shrink-0">
                  Abone <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-xl text-white font-semibold text-sm">
                ✅ Abone oldunuz!
              </div>
            )}
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg">
                <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-white text-base sm:text-xl font-bold">AI Araçları Rehberi</h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-3 max-w-sm">
              Türkiye'nin en kapsamlı yapay zeka araçları rehberi.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>info@aiaraclari.com</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { page: 'tools', label: 'Yapay Zeka Araçları' },
                { page: 'prompts', label: 'Promptlar' },
                { page: 'blog', label: 'Blog' },
                { page: 'glossary', label: 'AI Sözlük' },
                { page: 'earn', label: 'Para Kazanma' },
              ].map((item) => (
                <li key={item.page}>
                  <button onClick={() => onNavigate(item.page)} className="hover:text-white transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Keşfet */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wider">Keşfet</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => onNavigate('lists')} className="hover:text-white transition-colors">📋 Listeler</button></li>
              <li><button onClick={() => onNavigate('glossary')} className="hover:text-white transition-colors">📖 AI Sözlük</button></li>
              <li><button onClick={() => onNavigate('earn')} className="hover:text-white transition-colors">💰 Para Kazanma</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">📬 İletişim</button></li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wider">Kurumsal</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Hakkımızda</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">İletişim</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Gizlilik Politikası</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Kullanım Şartları</button></li>
              <li><button onClick={() => onNavigate('cookies')} className="hover:text-white transition-colors">Çerez Politikası</button></li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclaimer */}
        <div className="text-xs text-slate-600 border-t border-slate-800 pt-6 mb-6">
          Bu sitedeki bazı linkler affiliate (ortaklık) linkleridir. Bu linkler üzerinden yapacağınız
          alışverişlerde size ek bir maliyet olmadan bize komisyon kazandırırsınız.
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800">
          <p className="text-xs select-none cursor-default" onClick={handleSecretClick}>
            © 2026 AI Araçları Rehberi. Tüm hakları saklıdır. ❤️ Türkiye'de yapıldı.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group" title="Twitter/X">
              <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group" title="YouTube">
              <svg className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group" title="Instagram">
              <svg className="w-5 h-5 text-slate-500 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group" title="LinkedIn">
              <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
