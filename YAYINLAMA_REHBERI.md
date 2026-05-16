# 🚀 Siteyi Yayınlama Rehberi (Sıfırdan)

Bu rehber, siteyi GitHub'a yükleyip Vercel ile yayınlamak için gereken TÜM adımları anlatır.
Hiçbir ön bilgi gerektirmez.

---

## 📋 Genel Bakış

```
Bilgisayarındaki kod → GitHub (bulut depo) → Vercel (hosting) → İnternet
```

- **GitHub:** Kodlarını saklayacağın yer (Google Drive gibi ama kodlar için)
- **Vercel:** Kodu alıp siteye çeviren ve yayınlayan servis (ücretsiz)
- **Domain:** İsteğe bağlı — yoksa `siten.vercel.app` adresi olur

---

## ADIM 1: Git Kurulumu (Bilgisayarında — Bir Kerelik)

### Windows:
1. https://git-scm.com/download/win adresine git
2. "Click here to download" butonuna tıkla
3. İndirilen .exe dosyasını çalıştır
4. Her şeye "Next" de, varsayılan ayarlarla kur
5. "Install" tıkla, bitince "Finish"

### Mac:
1. Terminal aç (Spotlight → "Terminal" yaz)
2. Şunu yapıştır: `xcode-select --install`
3. Çıkan pencerede "Install" tıkla

### Kurulduğunu Kontrol Et:
1. Terminal (Windows: Git Bash veya CMD) aç
2. Şunu yaz: `git --version`
3. "git version 2.xx.x" gibi bir çıktı görmen lazım ✅

---

## ADIM 2: GitHub Hesabı Aç

1. https://github.com adresine git
2. "Sign up" tıkla
3. E-posta gir (mertcanzafer@gmail.com)
4. Şifre belirle
5. Kullanıcı adı seç (örnek: mertcanzafer)
6. E-posta doğrulaması yap (gelen maildeki linke tıkla)

---

## ADIM 3: GitHub'da Yeni Repo Oluştur

1. GitHub'a giriş yap
2. Sağ üstteki "+" ikonuna tıkla → "New repository"
3. Şunları doldur:
   - **Repository name:** `ai-arac-rehberi` (veya istediğin bir isim)
   - **Description:** `AI Araçları Rehberi — Yapay Zeka Araçları Platformu`
   - **Public** seçili bırak (Vercel için gerekli)
   - ⚠️ "Add a README file" kutusunu İŞARETLEME (boş bırak)
4. "Create repository" tıkla
5. Açılan sayfadaki URL'yi kopyala:
   `https://github.com/KULLANICIADIN/ai-arac-rehberi.git`

---

## ADIM 4: Kodu GitHub'a Yükle

### 4.1 Terminal Aç
- **Windows:** Başlat menüsünden "Git Bash" aç (Git kurulumunda geldi)
- **Mac:** Terminal uygulamasını aç

### 4.2 Proje Klasörüne Git
Projenin bilgisayarındaki klasör yolunu bul.
Örnek: Masaüstünde "site" klasöründeyse:

```bash
cd Desktop/site
```

veya tam yolu yaz:

```bash
cd /Users/mert/Desktop/site     # Mac
cd C:/Users/mert/Desktop/site   # Windows
```

💡 **İpucu:** Klasörü Terminal'e sürükle bırak yapabilirsin.

### 4.3 Git Komutlarını Çalıştır

Şu komutları SIRASIYLA tek tek yapıştır ve Enter'a bas:

```bash
git init
```
(Git'i başlatır — "Initialized empty Git repository" yazmalı)

```bash
git add .
```
(Tüm dosyaları ekler — hiçbir çıktı vermez, normal)

```bash
git commit -m "ilk yukleme"
```
(Değişiklikleri kaydeder — dosya sayısı gösterir)

```bash
git branch -M main
```
(Ana dalı "main" olarak adlandırır — çıktı vermez)

```bash
git remote add origin https://github.com/KULLANICIADIN/ai-arac-rehberi.git
```
⚠️ **ÖNEMLİ:** KULLANICIADIN kısmını kendi GitHub kullanıcı adınla değiştir!

```bash
git push -u origin main
```
(Kodu GitHub'a yükler)

❗ İlk push'ta GitHub kullanıcı adı ve şifre/token isteyebilir:
- Kullanıcı adı: GitHub kullanıcı adın
- Şifre: GitHub Personal Access Token (aşağıda nasıl alınacağı var)

### 4.4 GitHub Personal Access Token Alma (Şifre yerine)

GitHub artık normal şifre kabul etmiyor. Token lazım:

1. GitHub'da sağ üst profil fotoğrafına tıkla
2. "Settings" → sol menüde en altta "Developer settings"
3. "Personal access tokens" → "Tokens (classic)"
4. "Generate new token" → "Generate new token (classic)"
5. **Note:** `site-erisim` yaz
6. **Expiration:** "No expiration" seç
7. **Scopes:** `repo` kutusunu işaretle (ilk sıradaki)
8. "Generate token" tıkla
9. ⚠️ Çıkan token'ı KOPYALA ve bir yere kaydet! Bir daha göremezsin.
10. `git push` şifre istediğinde bu token'ı yapıştır

### 4.5 Başarılı mı?

GitHub'daki repo sayfanı yenile. Dosyaların orada görünmesi lazım ✅

---

## ADIM 5: Vercel ile Yayınla

### 5.1 Vercel Hesabı Aç
1. https://vercel.com adresine git
2. "Sign Up" tıkla
3. "Continue with GitHub" seç (GitHub hesabınla giriş yap)
4. GitHub izinlerini onayla

### 5.2 Projeyi Import Et
1. Vercel Dashboard'da "Add New..." → "Project" tıkla
2. GitHub repoların listelenir
3. `ai-arac-rehberi` reposunun yanındaki "Import" tıkla
4. Ayarlar sayfası açılır:
   - **Project Name:** `ai-arac-rehberi` (otomatik gelir)
   - **Framework Preset:** `Vite` (otomatik algılar)
   - **Root Directory:** `./ ` (boş bırak)
   - Diğer her şeyi olduğu gibi bırak
5. "Deploy" tıkla
6. 1-2 dakika bekle...
7. 🎉 "Congratulations!" ekranı çıkar = site yayında!

### 5.3 Site Adresin
Vercel sana bir adres verir:
```
https://ai-arac-rehberi.vercel.app
```
Bu adres hemen çalışır! Tarayıcıdan açıp kontrol et.

---

## ADIM 6: Domain Bağlama (İsteğe Bağlı)

### 6.1 Domain Satın Al
1. https://namecheap.com adresine git (veya turkticaret.net)
2. İstediğin domain'i ara (örn: zekaaraclari.com)
3. Uygunsa sepete ekle ve satın al (~₺150-300/yıl)

### 6.2 Vercel'e Bağla
1. Vercel Dashboard → projenin → "Settings" → "Domains"
2. Domain adını yaz (örn: zekaaraclari.com) → "Add"
3. Vercel sana DNS ayarları verir:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Bu bilgileri domain sağlayıcının (Namecheap) DNS ayarlarına gir
5. 5-30 dakika bekle → domain çalışır ✅

### Namecheap'te DNS Ayarı:
1. Namecheap → Dashboard → domain yanındaki "Manage"
2. "Advanced DNS" sekmesi
3. Mevcut kayıtları sil
4. "Add New Record":
   - Type: A Record, Host: @, Value: 76.76.21.21, TTL: Automatic
   - Type: CNAME, Host: www, Value: cname.vercel-dns.com, TTL: Automatic
5. Kaydet

---

## ADIM 7: Gelecekte Değişiklik Yapma

### Yeni araç veya blog ekledikten sonra:

1. Dosyayı düzenle (src/data/tools.ts veya blog.ts)
2. Terminal'de proje klasörüne git
3. Şu 3 komutu çalıştır:

```bash
git add .
git commit -m "yeni arac eklendi"
git push
```

4. Vercel otomatik olarak siteyi günceller (1-2 dk)
5. Siteyi yenile → değişiklik görünür ✅

---

## 🆘 Sorun Giderme

### "git: command not found"
→ Git kurulmamış. ADIM 1'i tekrar yap.

### "fatal: not a git repository"
→ Yanlış klasördesin. `cd` ile proje klasörüne git.

### "remote: Repository not found"
→ GitHub URL'si yanlış. `git remote -v` ile kontrol et.
→ Düzeltmek için: `git remote set-url origin DOGRU_URL`

### "Authentication failed"
→ Token yanlış veya süresi dolmuş. Yeni token oluştur (ADIM 4.4).

### "rejected - non-fast-forward"
→ `git pull origin main --allow-unrelated-histories` yap, sonra tekrar push.

### Vercel'de "Build Failed"
→ Genellikle kod hatası. Önce lokalda `npm run build` çalıştır, hata yoksa tekrar push.

### Domain çalışmıyor
→ DNS yayılması 24 saate kadar sürebilir. Genelde 30 dk yeterli.
→ DNS ayarlarını kontrol et (Namecheap → Advanced DNS).

---

## 📞 Yardım

### Claude AI'dan Yardım Almak:
1. https://claude.ai adresine git
2. Yeni sohbet aç
3. Şunu yaz:
   "Daha önce birlikte AI Araçları Rehberi sitesi yaptık. 
   React + Vite + Tailwind CSS ile. 
   GitHub repo linkim: [LİNKİNİ YAPIŞTIR]. 
   Şimdi şu değişikliği yapmak istiyorum: [NE İSTEDİĞİNİ YAZ]"

### Faydalı Linkler:
- Git indirme: https://git-scm.com
- GitHub: https://github.com
- Vercel: https://vercel.com
- Domain: https://namecheap.com
- EmailJS: https://emailjs.com
- Claude AI: https://claude.ai

---

## ✅ Kontrol Listesi

- [ ] Git kuruldu
- [ ] GitHub hesabı açıldı
- [ ] Repo oluşturuldu
- [ ] Kod push edildi
- [ ] Vercel hesabı açıldı
- [ ] Proje deploy edildi
- [ ] Site çalışıyor (vercel.app adresi)
- [ ] Domain alındı (opsiyonel)
- [ ] Domain bağlandı (opsiyonel)
- [ ] EmailJS kuruldu (opsiyonel)
