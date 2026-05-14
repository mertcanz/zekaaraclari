import { motion } from 'framer-motion';
import { Shield, FileText, Cookie, Users, ArrowLeft } from 'lucide-react';

interface Props {
  page: 'about' | 'privacy' | 'terms' | 'cookies';
  onBack: () => void;
}

export default function StaticPages({ page, onBack }: Props) {
  const pages = {
    about: {
      icon: <Users className="w-8 h-8 text-indigo-400" />,
      title: 'Hakkımızda',
      content: `## Biz Kimiz?

**AI Araçları Rehberi**, Türkiye'nin en kapsamlı yapay zeka araçları platformudur. Misyonumuz, yapay zeka teknolojilerini herkes için erişilebilir ve anlaşılır kılmaktır.

## Ne Yapıyoruz?

- **100+ AI aracını** detaylı inceliyoruz
- Araçları karşılaştırıp en uygun olanı bulmanıza yardımcı oluyoruz
- AI ile para kazanma rehberleri sunuyoruz
- Hazır prompt şablonları paylaşıyoruz
- AI dünyasındaki son gelişmeleri takip ediyoruz

## Değerlerimiz

### 🎯 Tarafsızlık
Hiçbir AI aracıyla ticari ortaklığımız yoktur. İncelemelerde tamamen tarafsızız.

### 🔍 Doğruluk
Tüm bilgiler düzenli olarak güncellenir. Fiyatlar, özellikler ve değerlendirmeler güncel tutulur.

### 🇹🇷 Türkçe Odaklılık
Türkçe kaynak eksikliğini gidermeyi hedefliyoruz. Tüm içerikler Türkçe hazırlanmaktadır.

### 🤝 Topluluk
Ziyaretçilerimizin geri bildirimleri ile sürekli gelişiyoruz. Araç önerileri ve yorumlarınız bizim için değerli.

## İletişim

Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.

- **E-posta:** info@aiaraclari.com
- **İş birliği:** partner@aiaraclari.com

## Affiliate Açıklaması

Bu sitedeki bazı linkler affiliate (ortaklık) linkleridir. Bu linkler üzerinden yapacağınız alışverişlerde size ek bir maliyet yansımaz, ancak bize küçük bir komisyon kazandırır. Bu gelir, sitenin ücretsiz kalmasını sağlar.`,
    },
    privacy: {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: 'Gizlilik Politikası',
      content: `## Gizlilik Politikası

**Son güncelleme:** 1 Ocak 2026

AI Araçları Rehberi olarak gizliliğinize önem veriyoruz. Bu politika, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.

### 1. Toplanan Veriler

#### 1.1 İletişim Formu
- Ad, e-posta adresi ve mesaj içeriği
- Bu bilgiler yalnızca sizinle iletişim kurmak için kullanılır

#### 1.2 Haber Bülteni
- E-posta adresi
- Yalnızca bülten göndermek için kullanılır
- İstediğiniz zaman abonelikten çıkabilirsiniz

#### 1.3 Çerezler
- Tema tercihi (açık/koyu)
- Favori araçlar listesi
- Tüm bu veriler tarayıcınızda (localStorage) saklanır, sunucularımıza gönderilmez

### 2. Verilerin Kullanımı

Topladığımız verileri şu amaçlarla kullanırız:
- İletişim taleplerinize yanıt vermek
- Haber bülteni göndermek
- Site deneyimini iyileştirmek
- İstatistiksel analizler yapmak

### 3. Üçüncü Taraf Paylaşımı

Kişisel verilerinizi **üçüncü taraflarla paylaşmıyoruz.** Tek istisna:
- Yasal zorunluluklar (mahkeme kararı vb.)
- EmailJS (e-posta gönderim hizmeti)

### 4. KVKK Hakları

6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında:
- Verilerinizin işlenip işlenmediğini öğrenme
- İşlenmişse buna ilişkin bilgi talep etme
- İşlenme amacını öğrenme
- Verilerin silinmesini isteme
- Düzeltilmesini isteme

### 5. İletişim

Gizlilikle ilgili sorularınız için: **info@aiaraclari.com**`,
    },
    terms: {
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      title: 'Kullanım Şartları',
      content: `## Kullanım Şartları

**Son güncelleme:** 1 Ocak 2026

### 1. Genel

Bu web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.

### 2. Hizmet Tanımı

AI Araçları Rehberi, yapay zeka araçlarını listeleyen, inceleyen ve karşılaştıran bir bilgi platformudur. **Finansal danışmanlık hizmeti vermemektedir.**

### 3. İçerik

- Sitedeki bilgiler genel bilgilendirme amaçlıdır
- İncelemeler editöryel görüşleri yansıtır
- Fiyatlar ve özellikler değişebilir
- Güncel bilgi için araçların resmi sitelerini kontrol edin

### 4. Affiliate Linkler

- Bazı linkler affiliate linkleridir
- Bu linkler size ek maliyet yansıtmaz
- Hangi araçların affiliate olduğu açıkça belirtilir

### 5. Kullanıcı Davranışı

Kullanıcılar:
- Spam veya kötü amaçlı içerik paylaşamaz
- Sahte yorum yazamaz
- Siteyi kötüye kullanamaz

### 6. Sorumluluk Reddi

- AI araçlarının kullanımından doğan sonuçlardan sorumlu değiliz
- Üçüncü taraf sitelerin içeriğinden sorumlu değiliz
- Araçların fiyat ve özellik değişikliklerinden sorumlu değiliz

### 7. Fikri Mülkiyet

Sitedeki tüm özgün içerikler telif hakkı ile korunmaktadır. İzinsiz kopyalama yasaktır.

### 8. Değişiklikler

Bu şartları önceden haber vermeksizin değiştirme hakkımız saklıdır.

### 9. İletişim

Sorularınız için: **info@aiaraclari.com**`,
    },
    cookies: {
      icon: <Cookie className="w-8 h-8 text-amber-400" />,
      title: 'Çerez Politikası',
      content: `## Çerez Politikası

**Son güncelleme:** 1 Ocak 2026

### Çerez Nedir?

Çerezler, web sitelerinin tarayıcınızda depoladığı küçük metin dosyalarıdır. Site tercihlerinizi hatırlamak için kullanılır.

### Kullandığımız Çerezler

#### Zorunlu Çerezler
- **Tema tercihi:** Açık/koyu tema seçiminiz
- **Çerez onayı:** Çerez banner'ını kabul ettiğiniz bilgisi

#### İşlevsel Çerezler
- **Favori araçlar:** Favorilere eklediğiniz araçların listesi
- **Admin oturumu:** Yönetici girişi bilgisi (session)

#### Analitik Çerezler
- Şu an analitik çerez **kullanmıyoruz**
- Gelecekte Google Analytics eklenebilir

### localStorage Kullanımı

Bu site, çerezler yerine ağırlıklı olarak **localStorage** teknolojisi kullanır. localStorage verileri:
- Yalnızca tarayıcınızda saklanır
- Sunucularımıza gönderilmez
- Tarayıcı verileri temizlendiğinde silinir

### Saklanan Veriler

| Veri | Amaç | Süre |
|------|-------|------|
| Tema tercihi | Koyu/açık tema | Kalıcı |
| Favoriler | Favori araç listesi | Kalıcı |
| Çerez onayı | Banner gösterimi | Kalıcı |
| Admin oturumu | Yönetici girişi | Oturum |

### Çerezleri Yönetme

Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak bu, site işlevselliğini etkileyebilir.

### İletişim

Çerez politikası hakkında sorularınız için: **info@aiaraclari.com**`,
    },
  };

  const p = pages[page];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="w-5 h-5" /> Ana Sayfaya Dön
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">{p.icon}</div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{p.title}</h1>
          </div>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-table:border prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-td:p-3 prose-td:border">
            {p.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
              if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>;
              if (line.startsWith('#### ')) return <h4 key={i} className="text-lg font-bold mt-4 mb-2">{line.replace('#### ', '')}</h4>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4 text-slate-600 dark:text-slate-300">{line.replace('- ', '')}</li>;
              if (line.startsWith('| ')) return null; // skip table rows for simplicity
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{line}</p>;
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
