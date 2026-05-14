export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
  sourceUrl?: string;
  sourceName?: string;
  coverImageUrl?: string;
}

export const blogCategories = [
  'Tümü',
  'Başlangıç Rehberi',
  'Karşılaştırma',
  'Para Kazanma',
  'Araç İnceleme',
  'Trendler',
  'Eğitim',
  'İpuçları',
];

export const blogPosts: BlogPost[] = [
  {
    id: '1', slug: 'chatgpt-nedir-nasil-kullanilir', featured: true,
    title: 'ChatGPT Nedir? Nasıl Kullanılır? (Başlangıç Rehberi 2026)',
    excerpt: 'ChatGPT\'yi sıfırdan öğrenin. Hesap açma, temel kullanım, ileri seviye ipuçları ve para kazanma yöntemleri.',
    category: 'Başlangıç Rehberi', author: 'AI Araçları Rehberi', date: '2026-05-01', readTime: '12 dk', image: '🤖',
    tags: ['ChatGPT', 'Yapay Zeka', 'Başlangıç', 'Ücretsiz'],
    content: `# ChatGPT Nedir?\n\nChatGPT, OpenAI tarafından geliştirilen yapay zeka destekli bir sohbet botudur. 2022 sonunda piyasaya sürüldüğünden bu yana 200 milyondan fazla kullanıcıya ulaştı.\n\n## ChatGPT Ne İşe Yarar?\n\n- **Metin yazma:** Blog, makale, e-posta, hikaye\n- **Kod yazma:** Python, JavaScript, React\n- **Çeviri:** 50+ dilde anında çeviri\n- **Analiz:** PDF, Excel, görsel analiz\n- **Arama:** Güncel bilgilere erişim\n\n## Nasıl Ücretsiz Kullanılır?\n\n1. [chat.openai.com](https://chat.openai.com) adresine gidin\n2. Google veya e-posta ile kayıt olun\n3. Hemen sormaya başlayın!\n\n## Ücretsiz vs Plus\n\n| Özellik | Ücretsiz | Plus ($20/ay) |\n|---------|----------|---------------|\n| GPT-4o mini | ✅ | ✅ |\n| GPT-4o | Sınırlı | Sınırsız |\n| Görsel üretme | ❌ | ✅ DALL-E |\n| Hız | Normal | Öncelikli |\n\n## İpuçları\n\n1. Net ve spesifik sorular sorun\n2. Rol verin: "Sen bir SEO uzmanısın..."\n3. Adım adım isteyin\n4. Örneklerle açıklayın\n\n## Para Kazanma\n\nBionluk/Fiverr'da "AI ile içerik yazarım" ilanı açarak makale başı ₺100-500 kazanabilirsiniz.`,
  },
  {
    id: '2', slug: 'midjourney-vs-dall-e', featured: true,
    title: 'Midjourney vs DALL-E 3: Hangisi Daha İyi? (2026 Karşılaştırma)',
    excerpt: 'İki dev AI görsel üretici karşı karşıya. Kalite, fiyat ve kullanım kolaylığı detaylı karşılaştırması.',
    category: 'Karşılaştırma', author: 'AI Araçları Rehberi', date: '2026-04-28', readTime: '8 dk', image: '🎨',
    tags: ['Midjourney', 'DALL-E', 'Görsel AI', 'Karşılaştırma'],
    content: `# Midjourney vs DALL-E 3\n\n## Hızlı Karşılaştırma\n\n| Özellik | Midjourney | DALL-E 3 |\n|---------|------------|----------|\n| Fiyat | $10/ay | $20/ay (ChatGPT Plus) |\n| Kalite | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |\n| Kullanım | Discord | ChatGPT içi |\n| Gerçekçilik | Mükemmel | Çok iyi |\n| Türkçe | Sınırlı | Tam |\n\n## Midjourney Avantajları\n- Sanatsal kalitede en iyi\n- Stil tutarlılığı\n- Fotogerçekçi portreler\n\n## DALL-E 3 Avantajları\n- ChatGPT ile doğal dil kullanımı\n- Türkçe prompt desteği\n- Metin anlama yeteneği\n\n## Hangisini Seçmeli?\n\n**Midjourney:** Profesyonel tasarım işleri\n**DALL-E 3:** Hızlı ve kolay görsel üretim`,
  },
  {
    id: '3', slug: 'ai-ile-para-kazanma-yollari', featured: true,
    title: 'AI ile Para Kazanmanın 10 Kanıtlanmış Yolu (2026)',
    excerpt: 'Yapay zeka araçlarını kullanarak evden para kazanmanın en etkili yolları. Gerçek rakamlar ve adım adım rehber.',
    category: 'Para Kazanma', author: 'AI Araçları Rehberi', date: '2026-04-25', readTime: '15 dk', image: '💰',
    tags: ['Para Kazanma', 'Freelance', 'AI İş'],
    content: `# AI ile Para Kazanmanın 10 Yolu\n\n## 1. AI İçerik Yazarlığı (₺3.000-15.000/ay)\nChatGPT ile blog, makale ve ürün açıklaması yazın.\n\n## 2. AI Grafik Tasarım (₺2.000-10.000/ay)\nMidjourney ile logo, sosyal medya görseli tasarlayın.\n\n## 3. AI Video İçerik (₺5.000-30.000/ay)\nRunway ve HeyGen ile YouTube videoları üretin.\n\n## 4. Affiliate Marketing (Pasif Gelir)\nAI araç sitesi açıp affiliate linklerden komisyon kazanın.\n\n## 5. AI Seslendirme (₺2.000-8.000/ay)\nElevenLabs ile reklam ve YouTube seslendirmesi yapın.\n\n## 6. Online Kurs (₺5.000-40.000/ay)\nUdemy'de AI araç kursları satın.\n\n## 7. Chatbot Geliştirme (₺5.000-25.000/proje)\nİşletmelere AI chatbot kurun.\n\n## 8. E-ticaret Ürün Görseli (₺1.000-5.000/ay)\nPhotoRoom ile ürün görselleri hazırlayın.\n\n## 9. AI Danışmanlık (₺10.000-50.000/ay)\nŞirketlere AI entegrasyonu danışmanlığı verin.\n\n## 10. Prompt Mühendisliği (₺3.000-15.000/ay)\nŞirketler için etkili promptlar oluşturun.`,
  },
  {
    id: '4', slug: 'en-iyi-ucretsiz-ai-araclari',
    title: 'En İyi 15 Ücretsiz Yapay Zeka Aracı (2026)',
    excerpt: 'Hiç para ödemeden kullanabileceğiniz en güçlü AI araçları. Her kategoriden en iyiler.',
    category: 'Araç İnceleme', author: 'AI Araçları Rehberi', date: '2026-04-20', readTime: '10 dk', image: '🆓',
    tags: ['Ücretsiz', 'AI Araçları', 'Liste'],
    content: `# En İyi 15 Ücretsiz AI Aracı\n\n## Yazı\n1. **ChatGPT** — Metin üretimi\n2. **Google Gemini** — Arama entegreli\n3. **Grammarly** — Yazım düzeltme\n\n## Görsel\n4. **Canva AI** — Tasarım\n5. **Leonardo.ai** — Görsel üretim\n6. **Remove.bg** — Arka plan kaldırma\n\n## Video\n7. **CapCut** — Video düzenleme\n8. **Opus Clip** — Video klipleme\n\n## Araştırma\n9. **Perplexity AI** — Kaynaklı arama\n10. **NotebookLM** — Döküman analizi\n\n## Kodlama\n11. **Codeium** — Kod tamamlama\n12. **Replit** — Tarayıcıda kodlama\n\n## Üretkenlik\n13. **Todoist** — Görev yönetimi\n14. **Otter.ai** — Transkripsiyon\n15. **Gamma** — Sunum oluşturma`,
  },
  {
    id: '5', slug: 'claude-vs-chatgpt-detayli-karsilastirma',
    title: 'Claude vs ChatGPT: Hangisi Daha İyi? (2026 Detaylı Karşılaştırma)',
    excerpt: 'Anthropic Claude ve OpenAI ChatGPT\'yi her açıdan karşılaştırdık. Hangi durumda hangisi daha iyi?',
    category: 'Karşılaştırma', author: 'AI Araçları Rehberi', date: '2026-04-18', readTime: '10 dk', image: '⚔️',
    tags: ['Claude', 'ChatGPT', 'Karşılaştırma'],
    content: `# Claude vs ChatGPT\n\n## Genel Bakış\n\n| | ChatGPT | Claude |\n|---|---------|--------|\n| Şirket | OpenAI | Anthropic |\n| Model | GPT-4o | Claude 4 |\n| Bağlam | 128K token | 200K token |\n| Fiyat | $20/ay | $20/ay |\n\n## ChatGPT Kazanıyor\n- Eklenti ekosistemi\n- Görsel üretme (DALL-E)\n- Daha geniş bilgi tabanı\n\n## Claude Kazanıyor\n- Daha uzun döküman analizi\n- Daha dürüst yanıtlar\n- Artifacts özelliği\n- Kod kalitesi\n\n## Sonuç\nGünlük kullanım: ChatGPT\nUzun döküman ve kod: Claude`,
  },
  {
    id: '6', slug: 'ai-ile-youtube-kanali-acmak',
    title: 'AI ile Yüzünüzü Göstermeden YouTube Kanalı Açın (2026 Rehberi)',
    excerpt: 'AI araçlarıyla sıfırdan YouTube kanalı kurun. Script, seslendirme, video ve thumbnail — hepsi AI ile.',
    category: 'Para Kazanma', author: 'AI Araçları Rehberi', date: '2026-04-15', readTime: '12 dk', image: '📺',
    tags: ['YouTube', 'Video', 'Para Kazanma'],
    content: `# AI ile YouTube Kanalı\n\n## Gerekli Araçlar\n1. **ChatGPT** — Script yazma\n2. **ElevenLabs** — Seslendirme\n3. **Runway ML** — Video üretimi\n4. **Canva** — Thumbnail tasarımı\n\n## Adım Adım\n\n### 1. Niş Seçimi\nTeknoloji haberleri, hikaye anlatımı, eğitim gibi konular\n\n### 2. Script\nChatGPT ile 5-10 dakikalık scriptler yazın\n\n### 3. Seslendirme\nElevenLabs ile Türkçe seslendirme\n\n### 4. Görsel\nRunway veya Pika ile video görselleri\n\n### 5. Düzenleme\nCapCut ile birleştirme ve efektler\n\n## Kazanç Potansiyeli\n- 1000 abone + 4000 saat = monetizasyon\n- RPM: $1-5 (Türkçe)\n- 50K görüntüleme/ay = $50-250 + sponsorluk`,
  },
  {
    id: '7', slug: 'stable-diffusion-baslangic-rehberi',
    title: 'Stable Diffusion Başlangıç Rehberi: Ücretsiz AI Görsel Üretimi',
    excerpt: 'Kendi bilgisayarınızda sınırsız ve ücretsiz AI görseli üretin. Kurulum ve kullanım rehberi.',
    category: 'Başlangıç Rehberi', author: 'AI Araçları Rehberi', date: '2026-04-12', readTime: '14 dk', image: '🔮',
    tags: ['Stable Diffusion', 'Ücretsiz', 'Görsel'],
    content: `# Stable Diffusion Başlangıç Rehberi\n\n## Nedir?\nAçık kaynak, ücretsiz AI görsel üretim modeli. Kendi PC'nizde çalışır.\n\n## Sistem Gereksinimleri\n- NVIDIA GPU (8GB+ VRAM)\n- 16GB RAM\n- 20GB disk alanı\n\n## Kurulum\n1. Python 3.10 kurun\n2. AUTOMATIC1111 WebUI indirin\n3. Model indirin (SD XL önerilir)\n4. webui.bat çalıştırın\n\n## İlk Görseliniz\nPrompt: "beautiful sunset over Istanbul, photorealistic, 8k"\n\n## İleri Seviye\n- LoRA modelleri\n- ControlNet\n- Inpainting\n- Img2img\n\n## Midjourney vs Stable Diffusion\n- Midjourney: Kolay, kaliteli, ücretli\n- SD: Zor, özelleştirilebilir, ücretsiz`,
  },
  {
    id: '8', slug: 'ai-prompt-yazma-sanati',
    title: 'Prompt Mühendisliği: AI\'dan En İyi Sonuçları Almak İçin 20 İpucu',
    excerpt: 'ChatGPT, Midjourney ve diğer AI araçlarından maksimum verim almak için prompt yazma teknikleri.',
    category: 'İpuçları', author: 'AI Araçları Rehberi', date: '2026-04-10', readTime: '11 dk', image: '✨',
    tags: ['Prompt', 'İpuçları', 'Teknik'],
    content: `# Prompt Mühendisliği\n\n## Temel Kurallar\n\n### 1. Net Olun\n❌ "Bir yazı yaz"\n✅ "E-ticaret hakkında 1500 kelimelik SEO uyumlu blog yazısı yaz"\n\n### 2. Rol Verin\n"Sen deneyimli bir dijital pazarlama uzmanısın..."\n\n### 3. Format Belirleyin\n"Maddeli liste halinde", "Tablo formatında", "3 paragraf"\n\n### 4. Örnekler Verin\n"Şu tarz bir ton kullan: [örnek metin]"\n\n### 5. Sınır Koyun\n"Maksimum 200 kelime", "5 madde"\n\n## Midjourney İpuçları\n- Stil belirtin: photorealistic, watercolor, minimalist\n- Kamera açısı: close-up, aerial view, wide angle\n- Aydınlatma: golden hour, studio lighting\n- Kalite: --q 2, --v 6, --ar 16:9\n\n## İleri Seviye\n- Chain-of-thought prompting\n- Few-shot learning\n- System prompts\n- Temperature ayarı`,
  },
  {
    id: '9', slug: 'ai-araclariyla-e-ticaret',
    title: 'AI Araçlarıyla E-Ticaret: Ürün Görseli, Açıklama ve Pazarlama',
    excerpt: 'E-ticaret işinizi AI ile güçlendirin. Ürün fotoğrafı, açıklama yazımı ve pazarlama otomasyonu.',
    category: 'İpuçları', author: 'AI Araçları Rehberi', date: '2026-04-08', readTime: '9 dk', image: '🛒',
    tags: ['E-ticaret', 'Pazarlama', 'Ürün'],
    content: `# AI ile E-Ticaret\n\n## Ürün Görseli\n- **PhotoRoom:** Arka plan değiştirme\n- **Remove.bg:** Şeffaf arka plan\n- **Midjourney:** Lifestyle görselleri\n\n## Ürün Açıklaması\nChatGPT promptu:\n"[ürün] için SEO uyumlu, faydaya odaklı 200 kelimelik ürün açıklaması yaz"\n\n## Pazarlama\n- **Canva AI:** Reklam görselleri\n- **Copy.ai:** Reklam metinleri\n- **Buffer:** Sosyal medya planı\n\n## Müşteri Hizmetleri\n- AI chatbot kurulumu\n- Otomatik yanıt şablonları\n\n## ROI\nOrtalama e-ticaret sitesi AI ile:\n- %40 daha hızlı içerik üretimi\n- %25 daha yüksek dönüşüm\n- %60 maliyet tasarrufu`,
  },
  {
    id: '10', slug: 'google-gemini-rehberi',
    title: 'Google Gemini Nedir? ChatGPT\'ye Alternatif (2026 Rehberi)',
    excerpt: 'Google\'ın yapay zeka modeli Gemini\'yi tanıyın. Özellikler, fiyatlandırma ve ChatGPT ile karşılaştırma.',
    category: 'Araç İnceleme', author: 'AI Araçları Rehberi', date: '2026-04-05', readTime: '8 dk', image: '💎',
    tags: ['Gemini', 'Google', 'AI'],
    content: `# Google Gemini\n\n## Nedir?\nGoogle'ın multimodal AI modeli. Metin, görsel, ses ve video işleyebilir.\n\n## Özellikler\n- Google ekosistemi entegrasyonu\n- Gmail, Docs, Sheets ile çalışır\n- Güncel bilgilere erişim\n- 200K+ token bağlam\n\n## Fiyatlandırma\n- Ücretsiz: Gemini Flash\n- Pro: $20/ay (Gemini Ultra)\n\n## vs ChatGPT\n| | Gemini | ChatGPT |\n|---|-------|--------|\n| Google entegrasyonu | ✅ | ❌ |\n| Görsel üretim | ❌ | ✅ |\n| Güncel bilgi | ✅ | ✅ |\n| Kod | İyi | Daha iyi |\n\n## Sonuç\nGoogle kullanıcıları için ideal. Gmail, Calendar, Drive ile çalışması büyük avantaj.`,
  },
  {
    id: '11', slug: 'ai-ses-klonlama-rehberi',
    title: 'AI Ses Klonlama: ElevenLabs ile Kendi Sesinizi Kopyalayın',
    excerpt: 'ElevenLabs kullanarak sesinizi klonlayın. YouTube, podcast ve reklam seslendirmeleri için rehber.',
    category: 'Araç İnceleme', author: 'AI Araçları Rehberi', date: '2026-04-02', readTime: '7 dk', image: '🔊',
    tags: ['ElevenLabs', 'Ses', 'Klonlama'],
    content: `# AI Ses Klonlama\n\n## ElevenLabs Nedir?\n29 dilde doğal sesler üreten ve ses klonlama yapabilen AI platformu.\n\n## Ses Klonlama Adımları\n1. ElevenLabs'a kayıt olun\n2. "Voice Lab" bölümüne gidin\n3. 1-5 dakikalık ses kaydı yükleyin\n4. AI sesinizi oluşturur\n5. Metin girin, sesinizle konuşsun\n\n## Kullanım Alanları\n- YouTube seslendirme\n- Podcast üretimi\n- Sesli kitap\n- Reklam seslendirmesi\n- Çok dilli içerik\n\n## Fiyatlandırma\n- Ücretsiz: 10.000 karakter/ay\n- Starter: $5/ay\n- Creator: $22/ay\n\n## Etik Kullanım\n⚠️ Başkasının sesini izinsiz klonlamak yasaldışıdır.`,
  },
  {
    id: '12', slug: 'perplexity-ai-google-alternatifi',
    title: 'Perplexity AI: Google\'a En Güçlü Alternatif (2026)',
    excerpt: 'Kaynak gösteren, güncel bilgi veren AI arama motoru. Google aramayı nasıl değiştiriyor?',
    category: 'Araç İnceleme', author: 'AI Araçları Rehberi', date: '2026-03-30', readTime: '7 dk', image: '🔍',
    tags: ['Perplexity', 'Arama', 'Araştırma'],
    content: `# Perplexity AI\n\n## Neden Google'dan Farklı?\n- Direkt yanıt verir (10 mavi link yerine)\n- Kaynakları gösterir\n- Takip soruları sorabilirsin\n- Dosya analizi yapabilir\n\n## Kullanım\n1. perplexity.ai'ye gidin\n2. Sorunuzu yazın\n3. Kaynaklı yanıt alın\n4. Takip sorusu sorun\n\n## Focus Modları\n- Web: Genel arama\n- Academic: Bilimsel makaleler\n- Math: Matematik soruları\n- Video: YouTube araması\n\n## Fiyat\n- Ücretsiz: Sınırsız temel\n- Pro: $20/ay (GPT-4, Claude)\n\n## Kimler İçin?\n- Öğrenciler\n- Araştırmacılar\n- Gazeteciler\n- İçerik üreticileri`,
  },
  {
    id: '13', slug: 'yapay-zeka-2026-trendleri',
    title: '2026\'da Yapay Zeka Trendleri: Neler Değişiyor?',
    excerpt: 'AI dünyasında 2026\'nın en önemli trendleri. Ajanlar, multimodal modeller ve yapay zeka iş gücü.',
    category: 'Trendler', author: 'AI Araçları Rehberi', date: '2026-03-25', readTime: '10 dk', image: '🚀',
    tags: ['Trendler', '2026', 'Gelecek'],
    content: `# 2026 AI Trendleri\n\n## 1. AI Ajanları\nOtonom çalışan AI'lar: e-posta yanıtlama, araştırma, kod yazma.\n\n## 2. Multimodal Modeller\nTek model: metin + görsel + ses + video anlama.\n\n## 3. Açık Kaynak Yükselişi\nLlama, Mistral gibi modeller GPT'ye yaklaşıyor.\n\n## 4. AI + Robotik\nFiziksel dünyada çalışan AI robotlar.\n\n## 5. Kişiselleştirilmiş AI\nHerkesin kendi fine-tuned AI asistanı.\n\n## 6. AI Regülasyonları\nAB AI Act, Türkiye'de KVKK AI düzenlemeleri.\n\n## 7. Video Üretimi Patlaması\nSora, Kling ile Hollywood kalitesinde AI video.\n\n## İş Dünyasına Etkisi\n- %40 rutin işler otomatikleşecek\n- Yeni meslekler: Prompt Engineer, AI Trainer\n- Her şirkette AI departmanı olacak`,
  },
  {
    id: '14', slug: 'ai-ile-freelance-is-bulmak',
    title: 'AI Kullanarak Freelance İş Bulmak: Bionluk ve Fiverr Rehberi',
    excerpt: 'AI araçlarını kullanarak freelance platformlarda nasıl iş bulunur? İlan şablonları ve fiyatlandırma.',
    category: 'Para Kazanma', author: 'AI Araçları Rehberi', date: '2026-03-20', readTime: '9 dk', image: '💼',
    tags: ['Freelance', 'Bionluk', 'Fiverr'],
    content: `# AI ile Freelance İş\n\n## En Çok Aranan AI Hizmetleri\n1. AI ile blog yazısı yazma\n2. AI görsel tasarım\n3. AI video oluşturma\n4. AI seslendirme\n5. Chatbot kurulumu\n\n## Bionluk'ta İlan Açma\n\n### Başlık Formülü\n"AI ile [HİZMET] — [FAYDA]"\nÖrnek: "AI ile SEO Uyumlu Blog Yazısı — Google'da Üst Sıralara Çıkın"\n\n### Fiyatlandırma\n- Başlangıç: ₺50-100 (yorum toplamak için)\n- Orta: ₺150-300\n- Uzman: ₺400-800\n\n### İlk Siparişi Alma\n1. Düşük fiyat ver\n2. Hızlı teslimat yap\n3. 5 yorum topla\n4. Fiyatı artır\n\n## Aylık Kazanç Potansiyeli\n- Part-time (haftada 10 saat): ₺3.000-5.000\n- Full-time: ₺8.000-20.000`,
  },
  {
    id: '15', slug: 'notebooklm-ucretsiz-arastirma-araci',
    title: 'NotebookLM: Google\'ın Ücretsiz AI Araştırma Aracı',
    excerpt: 'Kendi dokümanlarınızla AI sohbet edin, podcast oluşturun. Tamamen ücretsiz.',
    category: 'Eğitim', author: 'AI Araçları Rehberi', date: '2026-03-15', readTime: '6 dk', image: '📔',
    tags: ['NotebookLM', 'Google', 'Ücretsiz', 'Araştırma'],
    content: `# NotebookLM\n\n## Nedir?\nGoogle'ın ücretsiz AI araştırma aracı. PDF, web sitesi, YouTube videosu yükleyin, AI ile sohbet edin.\n\n## Özellikler\n- PDF/Doküman yükleme\n- YouTube video analizi\n- Web sitesi ekleme\n- Kaynaklı soru-cevap\n- **AI Podcast oluşturma** ← En popüler özellik!\n\n## Podcast Özelliği\n1. Dokümanlarınızı yükleyin\n2. "Audio Overview" tıklayın\n3. AI iki kişilik doğal podcast üretir\n4. İndirin ve dinleyin\n\n## Kullanım Alanları\n- Ders çalışma\n- Tez araştırması\n- Kitap analizi\n- İş dökümanları\n\n## Neden Ücretsiz?\nGoogle, verileri model eğitimi için kullanmıyor. Tamamen ücretsiz ve güvenli.\n\n## Sınırlamalar\n- Maksimum 50 kaynak\n- İnternet araması yok\n- Sadece yüklenen kaynaklardan yanıt verir`,
  },
];
