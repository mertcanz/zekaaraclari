# 📁 Kod Yapısı ve Açıklamalar

Bu dosya, projedeki tüm dosyaların ne işe yaradığını ve nasıl değiştirileceğini açıklar.

---

## 🗂️ Dosya Yapısı

```
src/
├── App.tsx                    ← ANA DOSYA: Tüm sayfalar ve navigasyon burada
├── AppRouter.tsx              ← Yönlendirici: Site mi Admin mi gösterilecek
├── main.tsx                   ← Giriş noktası: Context'leri sarar
├── index.css                  ← Global CSS stilleri
│
├── admin/                     ← 🔐 ADMIN PANELİ
│   ├── AdminDashboard.tsx     ← Admin ana bileşen: Tüm sekmeler burada
│   ├── AdminLogin.tsx         ← Giriş ekranı (şifre: 49914991)
│   └── AdminPanel.tsx         ← Login/Dashboard yönlendirmesi
│
├── components/                ← 🧩 BİLEŞENLER (her biri bir UI parçası)
│   ├── Hero.tsx               ← Ana sayfa hero/banner bölümü
│   ├── ToolCard.tsx           ← Araç kartı (grid'deki her kart)
│   ├── ToolModal.tsx          ← Araç detay popup'ı (tıklayınca açılan)
│   ├── UserReviews.tsx        ← Kullanıcı yorumları (ToolModal içinde)
│   ├── ComparisonTable.tsx    ← Karşılaştırma tablosu
│   ├── Blog.tsx               ← Blog listesi ve yazı detayı
│   ├── HowToEarn.tsx          ← Para kazanma rehberi
│   ├── PromptLibrary.tsx      ← Prompt kütüphanesi
│   ├── Glossary.tsx           ← AI sözlük
│   ├── ListsPage.tsx          ← Özel listeler sayfası
│   ├── ContactForm.tsx        ← İletişim formu
│   ├── SubmitTool.tsx         ← Araç önerme formu
│   ├── Footer.tsx             ← Alt bilgi + newsletter
│   ├── StaticPages.tsx        ← Hakkımızda, Gizlilik, Şartlar, Çerezler
│   ├── ThemeToggle.tsx        ← Koyu/Açık tema butonu
│   ├── ScrollToTop.tsx        ← Yukarı çık butonu
│   ├── WhatsAppButton.tsx     ← WhatsApp iletişim butonu
│   ├── CookieBanner.tsx       ← KVKK çerez uyarı banner'ı
│   └── ShareButtons.tsx       ← Sosyal medya paylaşım butonları
│
├── context/                   ← 📦 VERİ YÖNETİMİ
│   ├── DataContext.tsx         ← Araçlar, blog, favoriler, ayarlar (localStorage)
│   ├── ThemeContext.tsx        ← Tema yönetimi (koyu/açık)
│   └── NotificationContext.tsx ← Bülten bildirimleri
│
├── data/                      ← 📊 VERİ DOSYALARI
│   ├── tools.ts               ← 100 AI aracının verileri
│   ├── blog.ts                ← 15 blog yazısı
│   ├── prompts.ts             ← 15 hazır prompt şablonu
│   └── glossary.ts            ← 25+ AI terimi
│
└── services/                  ← 🔧 SERVİSLER
    └── emailService.ts        ← EmailJS mail gönderim servisi
```

---

## 🔧 Sık Yapılan Değişiklikler

### Yeni AI Aracı Eklemek
- **Admin panelden:** Araçlar → Yeni Araç Ekle
- **Koddan:** `src/data/tools.ts` → `tools` dizisine yeni obje ekle

### Yeni Blog Yazısı Eklemek
- **Admin panelden:** Blog → Yeni Yazı Ekle
- **Koddan:** `src/data/blog.ts` → `blogPosts` dizisine yeni obje ekle

### Site Adını Değiştirmek
- **Admin panelden:** Ayarlar → Genel → Site Adı
- **Koddan:** `src/context/DataContext.tsx` → `defaultSettings.siteName`

### Varsayılan Şifreyi Değiştirmek
- `src/context/DataContext.tsx` → `defaultSettings.adminPassword`
- ⚠️ localStorage'ı temizlemen gerekebilir

### Yeni Sayfa Eklemek
1. `src/App.tsx` → `Page` type'a yeni sayfa adı ekle
2. `navItems` dizisine menü butonu ekle
3. Render bloğuna `{currentPage === 'yenisayfa' && <YeniComponent />}` ekle
4. `src/components/` altına yeni component dosyası oluştur

### Kategori Eklemek
- `src/data/tools.ts` → `categories` dizisine yeni kategori ekle

### Renkleri Değiştirmek
- Tailwind CSS kullanılıyor
- Ana renk: `indigo-600` (mavi-mor)
- Değiştirmek için dosyalarda `indigo` kelimesini ara-değiştir yap

### Tema Değiştirmek
- Varsayılan: koyu tema
- `src/context/ThemeContext.tsx` → `'dark'` yerine `'light'` yaz

---

## 🔐 Admin Paneli

### Erişim Yolları
1. Footer'daki "© 2026..." yazısına **5 kere** hızlıca tıkla
2. Klavyede **Ctrl + Shift + A** (Mac: Cmd + Shift + A)
3. URL'ye `?panel=admin` ekle

### Şifre
- Varsayılan: `49914991`
- Değiştirmek: Admin → Ayarlar → Güvenlik

### Sekmeler
1. Dashboard — İstatistikler ve uyarılar
2. AI Araçları — Araç CRUD (ekle/düzenle/sil)
3. Blog Yazıları — Blog CRUD + kaynak/görsel
4. Öneriler — Ziyaretçi önerileri → onayla/reddet
5. Mesajlar — İletişim formundan gelen mesajlar
6. Aboneler & Bülten — Abone listesi + gönderim geçmişi
7. Yol Haritası — Adım adım plan + kazanç + rakip analizi
8. Ayarlar — Site, sosyal medya, EmailJS, şifre

---

## 📧 EmailJS Kurulumu

1. https://emailjs.com → ücretsiz hesap aç
2. Email Service ekle (Gmail bağla)
3. 2 template oluştur:
   - `contact` → İletişim formu mailleri
   - `newsletter` → Bülten bildirimleri
4. Admin → Ayarlar → EmailJS bilgilerini gir
5. Artık gerçek mail gidiyor ✅

---

## 🚀 Yayınlama

1. GitHub'a kodu yükle
2. Vercel.com'a bağla → otomatik deploy
3. Domain al ve bağla (opsiyonel)
