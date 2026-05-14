export interface Prompt {
  id: string;
  title: string;
  category: string;
  tool: string;
  prompt: string;
  description: string;
  tags: string[];
  example?: string;
}

export const promptCategories = [
  { id: 'all', label: 'Tümü', emoji: '📚' },
  { id: 'writing', label: 'Yazı & İçerik', emoji: '✍️' },
  { id: 'business', label: 'İş & Pazarlama', emoji: '💼' },
  { id: 'coding', label: 'Kodlama', emoji: '💻' },
  { id: 'image', label: 'Görsel Üretim', emoji: '🎨' },
  { id: 'social', label: 'Sosyal Medya', emoji: '📱' },
  { id: 'education', label: 'Eğitim', emoji: '📖' },
];

export const prompts: Prompt[] = [
  // Yazı & İçerik
  {
    id: 'blog-seo',
    title: 'SEO Uyumlu Blog Yazısı',
    category: 'writing',
    tool: 'ChatGPT',
    prompt: `Sen deneyimli bir SEO içerik yazarısın. "[KONU]" hakkında SEO uyumlu, 1500-2000 kelimelik bir blog yazısı yaz.

Yazı şunları içermeli:
- Dikkat çekici H1 başlık (anahtar kelime içermeli)
- Giriş paragrafı (ilk 100 kelimede anahtar kelime)
- En az 4-5 H2 alt başlık
- Maddeli listeler ve pratik ipuçları
- İç ve dış link önerileri
- Meta description (155 karakter)
- Sonuç ve CTA

Hedef anahtar kelime: [ANAHTAR KELİME]
Hedef kitle: Türkiye'de yaşayan [HEDEF KİTLE]
Ton: Samimi ama profesyonel`,
    description: 'Google\'da üst sıralara çıkacak SEO uyumlu blog yazısı oluşturur.',
    tags: ['SEO', 'Blog', 'İçerik'],
    example: 'Konu: ChatGPT ile para kazanma, Anahtar kelime: chatgpt para kazanma',
  },
  {
    id: 'product-description',
    title: 'E-Ticaret Ürün Açıklaması',
    category: 'writing',
    tool: 'ChatGPT',
    prompt: `E-ticaret uzmanı olarak "[ÜRÜN ADI]" için satış odaklı ürün açıklaması yaz.

Ürün bilgileri:
- Ürün: [ÜRÜN ADI]
- Kategori: [KATEGORİ]
- Özellikler: [ÖZELLİKLER]
- Hedef müşteri: [HEDEF MÜŞTERİ]

Açıklama şunları içermeli:
1. Dikkat çekici başlık
2. Duygusal bağ kuran giriş
3. Faydalar (özellik değil FAYDA odaklı)
4. Teknik özellikler listesi
5. Sosyal kanıt cümlesi
6. Aciliyet yaratan CTA

Uzunluk: 200-300 kelime
Ton: İkna edici, güvenilir`,
    description: 'Satış yapan e-ticaret ürün açıklaması oluşturur.',
    tags: ['E-ticaret', 'Ürün', 'Satış'],
  },
  {
    id: 'email-template',
    title: 'Profesyonel E-posta Şablonu',
    category: 'business',
    tool: 'ChatGPT',
    prompt: `[E-POSTA TÜRÜ] için profesyonel bir e-posta yaz.

Detaylar:
- Gönderen: [SENİN ROLÜN]
- Alıcı: [ALICININ ROLÜ]
- Konu: [E-POSTA KONUSU]
- Amaç: [AMAÇ - örn: toplantı talebi, teklif sunumu]
- Ton: [Resmi/Yarı resmi/Samimi]

E-posta şunları içermeli:
- Kısa ve net konu satırı
- Profesyonel selamlama
- Amacı hemen belirten giriş
- Ana mesaj (kısa paragraflar)
- Net CTA (sonraki adım)
- Profesyonel kapanış

Maksimum 150 kelime.`,
    description: 'Her durum için profesyonel e-posta şablonu oluşturur.',
    tags: ['E-posta', 'İş', 'Profesyonel'],
  },
  // İş & Pazarlama
  {
    id: 'swot-analysis',
    title: 'SWOT Analizi',
    category: 'business',
    tool: 'ChatGPT',
    prompt: `"[ŞİRKET/PROJE ADI]" için detaylı SWOT analizi yap.

Şirket/Proje hakkında:
- Sektör: [SEKTÖR]
- Ürün/Hizmet: [ÜRÜN/HİZMET]
- Hedef pazar: [HEDEF PAZAR]
- Rakipler: [ANA RAKİPLER]

Her kategori için en az 5 madde listele:

**Güçlü Yönler (Strengths)**
- İç avantajlar

**Zayıf Yönler (Weaknesses)**
- İç dezavantajlar

**Fırsatlar (Opportunities)**
- Dış fırsatlar

**Tehditler (Threats)**
- Dış riskler

Sonunda stratejik öneriler sun.`,
    description: 'İş planı için SWOT analizi oluşturur.',
    tags: ['SWOT', 'Analiz', 'Strateji'],
  },
  {
    id: 'marketing-plan',
    title: 'Dijital Pazarlama Planı',
    category: 'business',
    tool: 'ChatGPT',
    prompt: `"[MARKA/ÜRÜN]" için 3 aylık dijital pazarlama planı oluştur.

Bilgiler:
- Marka/Ürün: [MARKA]
- Hedef kitle: [HEDEF KİTLE]
- Bütçe: [AYLIK BÜTÇE]
- Hedef: [ANA HEDEF - satış artışı, marka bilinirliği vb.]

Plan şunları içermeli:
1. Hedef kitle analizi
2. Kanal stratejisi (SEO, sosyal medya, reklam)
3. İçerik takvimi
4. Bütçe dağılımı
5. KPI'lar ve ölçüm yöntemi
6. Haftalık/aylık görevler
7. A/B test önerileri`,
    description: 'Kapsamlı dijital pazarlama planı oluşturur.',
    tags: ['Pazarlama', 'Strateji', 'Plan'],
  },
  // Kodlama
  {
    id: 'code-explain',
    title: 'Kod Açıklama',
    category: 'coding',
    tool: 'ChatGPT',
    prompt: `Aşağıdaki kodu satır satır açıkla. Başlangıç seviyesindeki bir geliştirici anlayacak şekilde yaz.

Kod:
\`\`\`[DİL]
[KODU BURAYA YAPIŞTIR]
\`\`\`

Açıklamada şunlar olsun:
1. Kodun genel amacı
2. Her önemli satırın açıklaması
3. Kullanılan kavramlar (fonksiyon, döngü vb.)
4. Potansiyel iyileştirme önerileri
5. Olası hatalar ve çözümleri`,
    description: 'Karmaşık kodları anlaşılır şekilde açıklar.',
    tags: ['Kod', 'Açıklama', 'Öğrenme'],
  },
  {
    id: 'code-debug',
    title: 'Hata Ayıklama',
    category: 'coding',
    tool: 'ChatGPT',
    prompt: `Bu kodda hata var, düzelt ve açıkla.

Dil: [PROGRAMLAMA DİLİ]
Hata mesajı: [HATA MESAJI]

Kod:
\`\`\`
[HATALI KOD]
\`\`\`

Beklenen davranış: [NE YAPMASI GEREKİYOR]
Gerçek davranış: [NE YAPIYOR]

Şunları yap:
1. Hatanın nedenini açıkla
2. Düzeltilmiş kodu ver
3. Bu hatayı gelecekte önleme ipuçları`,
    description: 'Koddaki hataları bulur ve düzeltir.',
    tags: ['Debug', 'Hata', 'Düzeltme'],
  },
  // Görsel Üretim
  {
    id: 'midjourney-realistic',
    title: 'Gerçekçi Fotoğraf',
    category: 'image',
    tool: 'Midjourney',
    prompt: `[KONU], professional photography, shot on Canon EOS R5, 85mm lens, f/1.8 aperture, natural lighting, 8k resolution, hyperrealistic, detailed skin texture, photorealistic --ar 16:9 --v 6`,
    description: 'Fotogerçekçi insan veya ürün görseli oluşturur.',
    tags: ['Midjourney', 'Fotoğraf', 'Gerçekçi'],
    example: 'Konu: portrait of a Turkish businesswoman in modern office',
  },
  {
    id: 'midjourney-logo',
    title: 'Minimalist Logo',
    category: 'image',
    tool: 'Midjourney',
    prompt: `minimalist logo design for [MARKA ADI], [SEKTÖR] company, simple geometric shapes, flat design, vector style, single color on white background, professional, memorable, scalable --ar 1:1 --v 6`,
    description: 'Profesyonel minimalist logo konsepti oluşturur.',
    tags: ['Midjourney', 'Logo', 'Tasarım'],
    example: 'Marka: TechFlow, Sektör: teknoloji startup',
  },
  {
    id: 'dalle-social',
    title: 'Sosyal Medya Görseli',
    category: 'image',
    tool: 'DALL-E',
    prompt: `Create a modern, eye-catching social media post image about [KONU]. Style: [minimalist/vibrant/corporate]. Include abstract elements, trendy colors like [RENKLER], suitable for Instagram. No text in image.`,
    description: 'Instagram/LinkedIn için dikkat çekici görsel oluşturur.',
    tags: ['DALL-E', 'Sosyal Medya', 'Görsel'],
  },
  // Sosyal Medya
  {
    id: 'instagram-caption',
    title: 'Instagram Caption',
    category: 'social',
    tool: 'ChatGPT',
    prompt: `"[FOTOĞRAF KONUSU]" için viral potansiyeli olan Instagram caption'ı yaz.

Marka/Hesap: [MARKA ADI]
Sektör: [SEKTÖR]
Hedef kitle: [HEDEF KİTLE]
Ton: [Eğlenceli/Profesyonel/İlham verici]

Caption şunları içermeli:
- Hook (ilk cümle dikkat çekici)
- Ana mesaj
- Hikaye veya değer önerisi
- CTA (yorum yaptır, kaydet, paylaş)
- 5-7 alakalı hashtag
- 1-2 emoji

Uzunluk: 100-150 kelime`,
    description: 'Etkileşim alan Instagram açıklaması oluşturur.',
    tags: ['Instagram', 'Caption', 'Sosyal Medya'],
  },
  {
    id: 'linkedin-post',
    title: 'LinkedIn Gönderi',
    category: 'social',
    tool: 'ChatGPT',
    prompt: `LinkedIn için "[KONU]" hakkında profesyonel ama samimi bir gönderi yaz.

Yazar profili: [UNVAN/ROL]
Sektör: [SEKTÖR]
Amaç: [Düşünce liderliği/Network/İş fırsatı]

Gönderi yapısı:
- Hook (ilk 2 satır - devamını oku dedirtecek)
- Kişisel deneyim veya gözlem
- Ana mesaj ve öğrenimler
- Tartışma sorusu
- 3-5 hashtag

Ton: Profesyonel ama insani
Uzunluk: 150-200 kelime`,
    description: 'Etkileşim alan LinkedIn paylaşımı oluşturur.',
    tags: ['LinkedIn', 'Profesyonel', 'Network'],
  },
  {
    id: 'twitter-thread',
    title: 'Twitter/X Thread',
    category: 'social',
    tool: 'ChatGPT',
    prompt: `"[KONU]" hakkında viral olabilecek 7-10 tweet'lik thread yaz.

Konu: [DETAYLI KONU]
Hedef: [Eğitim/Eğlence/Haber]

Her tweet:
- Maksimum 280 karakter
- Kendi başına anlamlı
- Akıcı geçiş

Thread yapısı:
1. Hook tweet (dikkat çekici başlangıç)
2-8. Bilgi/hikaye tweet'leri
9. Özet tweet
10. CTA + retweet isteği

Emoji kullan ama abartma.`,
    description: 'Viral potansiyeli olan Twitter thread oluşturur.',
    tags: ['Twitter', 'Thread', 'Viral'],
  },
  // Eğitim
  {
    id: 'lesson-plan',
    title: 'Ders Planı',
    category: 'education',
    tool: 'ChatGPT',
    prompt: `"[DERS KONUSU]" için detaylı ders planı oluştur.

Seviye: [İlkokul/Ortaokul/Lise/Üniversite]
Süre: [SÜRE - örn: 40 dakika]
Öğrenci sayısı: [SAYI]

Plan şunları içermeli:
1. Öğrenme hedefleri (SMART formatında)
2. Ön bilgi kontrolü (5 dk)
3. Giriş aktivitesi (5 dk)
4. Ana içerik sunumu (15 dk)
5. Uygulama aktivitesi (10 dk)
6. Değerlendirme (5 dk)
7. Ödev/Ev çalışması
8. Gerekli materyaller
9. Farklılaştırma önerileri`,
    description: 'Öğretmenler için detaylı ders planı oluşturur.',
    tags: ['Eğitim', 'Ders', 'Plan'],
  },
  {
    id: 'explain-concept',
    title: 'Kavram Açıklama',
    category: 'education',
    tool: 'ChatGPT',
    prompt: `"[KAVRAM]" kavramını [YAŞ] yaşındaki birine açıklar gibi anlat.

Açıklama şunları içermeli:
1. Basit tanım (1-2 cümle)
2. Günlük hayattan örnek
3. Benzetme/metafor
4. Neden önemli olduğu
5. İlgili kavramlar
6. Mini sınav sorusu (cevaplı)

Karmaşık terimlerden kaçın.
Görsel düşünmeye yardımcı ifadeler kullan.`,
    description: 'Karmaşık kavramları basitçe açıklar.',
    tags: ['Açıklama', 'Öğrenme', 'Basit'],
  },
];
