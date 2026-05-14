export interface Term {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

export const glossaryCategories = ['Tümü', 'Temel Kavramlar', 'Model Türleri', 'Teknik Terimler', 'Uygulama Alanları'];

export const glossary: Term[] = [
  // Temel Kavramlar
  {
    id: 'ai',
    term: 'Yapay Zeka (AI)',
    definition: 'İnsan zekasını taklit edebilen, öğrenme, problem çözme ve karar verme yeteneğine sahip bilgisayar sistemleri. Makinelerin insanlar gibi düşünmesini ve hareket etmesini sağlayan teknoloji.',
    category: 'Temel Kavramlar',
    relatedTerms: ['Machine Learning', 'Deep Learning'],
  },
  {
    id: 'ml',
    term: 'Makine Öğrenmesi (ML)',
    definition: 'Bilgisayarların açıkça programlanmadan verilerden öğrenmesini sağlayan AI alt dalı. Algoritmalar deneyimle gelişir ve tahminlerde bulunur.',
    category: 'Temel Kavramlar',
    relatedTerms: ['Deep Learning', 'Neural Network'],
  },
  {
    id: 'deep-learning',
    term: 'Derin Öğrenme (Deep Learning)',
    definition: 'Çok katmanlı yapay sinir ağları kullanan makine öğrenmesi türü. Görüntü tanıma, ses işleme ve doğal dil işlemede başarılı.',
    category: 'Temel Kavramlar',
    relatedTerms: ['Neural Network', 'CNN', 'Transformer'],
  },
  {
    id: 'neural-network',
    term: 'Yapay Sinir Ağı',
    definition: 'İnsan beynindeki nöronlardan esinlenen, birbirine bağlı düğümlerden (nöronlar) oluşan hesaplama sistemi. Veri işleme ve örüntü tanıma için kullanılır.',
    category: 'Temel Kavramlar',
    relatedTerms: ['Deep Learning', 'Perceptron'],
  },
  {
    id: 'prompt',
    term: 'Prompt',
    definition: 'AI modeline verilen metin tabanlı talimat veya soru. ChatGPT veya Midjourney gibi araçlara ne yapmasını istediğinizi belirtir. İyi prompt = iyi sonuç.',
    category: 'Temel Kavramlar',
    relatedTerms: ['Prompt Engineering'],
  },
  {
    id: 'prompt-engineering',
    term: 'Prompt Mühendisliği',
    definition: 'AI modellerinden en iyi sonuçları almak için etkili promptlar tasarlama sanatı ve bilimi. Doğru soru sorma becerisi.',
    category: 'Temel Kavramlar',
    relatedTerms: ['Prompt', 'LLM'],
  },
  // Model Türleri
  {
    id: 'llm',
    term: 'Büyük Dil Modeli (LLM)',
    definition: 'Milyarlarca parametre ile eğitilmiş, metin anlama ve üretme yeteneğine sahip AI modelleri. GPT-4, Claude, Gemini gibi modeller LLM örnekleridir.',
    category: 'Model Türleri',
    relatedTerms: ['GPT', 'Transformer', 'NLP'],
  },
  {
    id: 'gpt',
    term: 'GPT (Generative Pre-trained Transformer)',
    definition: 'OpenAI tarafından geliştirilen dil modeli serisi. Metin üretme, sohbet, kod yazma gibi görevlerde kullanılır. ChatGPT bu modeli kullanır.',
    category: 'Model Türleri',
    relatedTerms: ['LLM', 'ChatGPT', 'Transformer'],
  },
  {
    id: 'transformer',
    term: 'Transformer',
    definition: '2017\'de Google tarafından tanıtılan, modern AI\'ın temelini oluşturan mimari. Dikkat mekanizması (attention) kullanarak metni paralel işler.',
    category: 'Model Türleri',
    relatedTerms: ['GPT', 'BERT', 'Attention'],
  },
  {
    id: 'diffusion',
    term: 'Diffusion Model',
    definition: 'Gürültüden başlayarak kademeli olarak görüntü üreten AI modeli. Midjourney, DALL-E, Stable Diffusion bu teknolojiyi kullanır.',
    category: 'Model Türleri',
    relatedTerms: ['Stable Diffusion', 'Image Generation'],
  },
  {
    id: 'multimodal',
    term: 'Multimodal AI',
    definition: 'Birden fazla veri türünü (metin, görüntü, ses, video) aynı anda anlayabilen ve işleyebilen AI modelleri. GPT-4o, Gemini multimodal örneklerdir.',
    category: 'Model Türleri',
    relatedTerms: ['GPT-4', 'Gemini'],
  },
  // Teknik Terimler
  {
    id: 'token',
    term: 'Token',
    definition: 'AI modellerinin metni parçalara ayırma birimi. Bir kelime genellikle 1-3 token\'dır. Model maliyetleri ve limitleri token bazında hesaplanır.',
    category: 'Teknik Terimler',
    relatedTerms: ['Context Window', 'LLM'],
  },
  {
    id: 'context-window',
    term: 'Bağlam Penceresi (Context Window)',
    definition: 'Bir AI modelinin tek seferde işleyebildiği maksimum token sayısı. GPT-4 Turbo 128K, Claude 200K token destekler.',
    category: 'Teknik Terimler',
    relatedTerms: ['Token', 'LLM'],
  },
  {
    id: 'fine-tuning',
    term: 'Fine-tuning (İnce Ayar)',
    definition: 'Önceden eğitilmiş bir modeli belirli bir görev veya veri seti üzerinde ek eğitimle özelleştirme işlemi.',
    category: 'Teknik Terimler',
    relatedTerms: ['Training', 'Transfer Learning'],
  },
  {
    id: 'hallucination',
    term: 'Halüsinasyon',
    definition: 'AI\'ın gerçek olmayan bilgileri güvenle üretmesi. Model, doğru gibi görünen ama yanlış veya uydurma cevaplar verebilir.',
    category: 'Teknik Terimler',
    relatedTerms: ['LLM', 'Accuracy'],
  },
  {
    id: 'temperature',
    term: 'Temperature (Sıcaklık)',
    definition: 'AI çıktısının rastgeleliğini kontrol eden parametre. Düşük değer (0.1): tutarlı, tahmin edilebilir. Yüksek değer (1.0): yaratıcı, rastgele.',
    category: 'Teknik Terimler',
    relatedTerms: ['LLM', 'Inference'],
  },
  {
    id: 'embedding',
    term: 'Embedding',
    definition: 'Metin, görüntü veya ses gibi verilerin sayısal vektörlere dönüştürülmesi. Benzerlik karşılaştırması ve arama için kullanılır.',
    category: 'Teknik Terimler',
    relatedTerms: ['Vector Database', 'RAG'],
  },
  {
    id: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'AI\'ın harici bilgi kaynaklarından veri alarak daha doğru cevaplar üretmesini sağlayan teknik. Halüsinasyonu azaltır.',
    category: 'Teknik Terimler',
    relatedTerms: ['Embedding', 'Vector Database'],
  },
  {
    id: 'api',
    term: 'API (Application Programming Interface)',
    definition: 'Yazılımların birbirleriyle iletişim kurmasını sağlayan arayüz. OpenAI API gibi servislere programatik erişim imkanı verir.',
    category: 'Teknik Terimler',
    relatedTerms: ['Endpoint', 'Integration'],
  },
  // Uygulama Alanları
  {
    id: 'nlp',
    term: 'Doğal Dil İşleme (NLP)',
    definition: 'Bilgisayarların insan dilini anlaması ve üretmesi ile ilgilenen AI alanı. Çeviri, duygu analizi, metin özetleme bu alana dahildir.',
    category: 'Uygulama Alanları',
    relatedTerms: ['LLM', 'Chatbot'],
  },
  {
    id: 'computer-vision',
    term: 'Bilgisayarlı Görü',
    definition: 'Bilgisayarların görüntü ve videoları analiz etmesi ve anlamasını sağlayan AI alanı. Yüz tanıma, nesne tespiti bu teknolojileri kullanır.',
    category: 'Uygulama Alanları',
    relatedTerms: ['CNN', 'Object Detection'],
  },
  {
    id: 'generative-ai',
    term: 'Üretken AI (Generative AI)',
    definition: 'Yeni içerik (metin, görüntü, ses, video, kod) üreten AI sistemleri. ChatGPT, Midjourney, DALL-E üretken AI örnekleridir.',
    category: 'Uygulama Alanları',
    relatedTerms: ['LLM', 'Diffusion', 'Image Generation'],
  },
  {
    id: 'chatbot',
    term: 'Chatbot',
    definition: 'Metin veya ses yoluyla insanlarla sohbet edebilen AI programı. Müşteri hizmetleri, asistan ve eğlence amaçlı kullanılır.',
    category: 'Uygulama Alanları',
    relatedTerms: ['NLP', 'LLM', 'Conversational AI'],
  },
  {
    id: 'text-to-image',
    term: 'Text-to-Image (Metinden Görsel)',
    definition: 'Metin açıklamalarından görsel üreten AI teknolojisi. Midjourney, DALL-E, Stable Diffusion bu kategoridedir.',
    category: 'Uygulama Alanları',
    relatedTerms: ['Diffusion', 'Generative AI'],
  },
  {
    id: 'text-to-speech',
    term: 'Text-to-Speech (TTS)',
    definition: 'Yazılı metni sesli konuşmaya dönüştüren AI teknolojisi. ElevenLabs, Google TTS gibi araçlar bu teknolojiyi kullanır.',
    category: 'Uygulama Alanları',
    relatedTerms: ['Voice Synthesis', 'Voice Cloning'],
  },
  {
    id: 'speech-to-text',
    term: 'Speech-to-Text (STT)',
    definition: 'Sesli konuşmayı yazılı metne dönüştüren AI teknolojisi. Transkripsiyon, altyazı oluşturma için kullanılır.',
    category: 'Uygulama Alanları',
    relatedTerms: ['Whisper', 'Transcription'],
  },
  {
    id: 'ai-agent',
    term: 'AI Agent (AI Ajanı)',
    definition: 'Belirli görevleri otomatik olarak planlayıp yürüten otonom AI sistemi. İnternette arama yapma, e-posta gönderme gibi işlemleri bağımsız yapabilir.',
    category: 'Uygulama Alanları',
    relatedTerms: ['Automation', 'LLM'],
  },
];
