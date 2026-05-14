import { motion } from 'framer-motion';
import {
  PenTool,
  TrendingUp,
  Video,
  BookOpen,
  DollarSign,
  Zap,
} from 'lucide-react';

const methods = [
  {
    icon: <PenTool className="w-7 h-7" />,
    title: 'AI ile İçerik Üretimi & Satışı',
    earnings: '₺5.000 - ₺30.000/ay',
    desc: 'ChatGPT ve Jasper gibi araçlarla blog yazıları, ürün açıklamaları ve sosyal medya içerikleri üretin. Bionluk, Fiverr veya doğrudan müşterilere satın.',
    steps: [
      'Bionluk/Fiverr\'da "AI ile yazı yazma" ilanı açın',
      'İlk 5 müşteriye indirimli fiyat verin — yorum toplayın',
      'Portföyünüzü büyütüp fiyatları artırın',
    ],
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: 'Affiliate (Ortaklık) Pazarlaması',
    earnings: '₺3.000 - ₺50.000/ay',
    desc: 'AI araçlarının affiliate programlarına kaydolun. Blog yazıları, YouTube videoları veya sosyal medya ile link paylaşarak komisyon kazanın.',
    steps: [
      'Bu sitedeki gibi bir niş blog/site açın',
      'AI araç incelemesi yazıp affiliate link yerleştirin',
      'SEO ile organik trafik çekin — pasif gelir başlasın',
    ],
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: <Video className="w-7 h-7" />,
    title: 'AI Video İçerik Üretimi',
    earnings: '₺10.000 - ₺80.000/ay',
    desc: 'Runway, HeyGen ve ElevenLabs ile yüzünüzü göstermeden YouTube videoları üretin. Reklam geliri ve sponsorluklar kazanın.',
    steps: [
      'Niş bir kanal açın (teknoloji haberleri, hikaye anlatımı vb.)',
      'AI ile video + seslendirme üretin',
      '1000 abone + 4000 saat izlenme ile monetize edin',
    ],
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: 'AI ile Online Kurs Satışı',
    earnings: '₺5.000 - ₺40.000/ay',
    desc: 'Udemy veya kendi platformunuzda AI araçları kullanmayı öğreten kurslar satın. Gamma ile sunum, ElevenLabs ile seslendirme yapın.',
    steps: [
      'Bir AI aracında uzmanlaşın',
      'Gamma + ElevenLabs ile kurs materyali oluşturun',
      'Udemy\'de veya kendi sitenizde yayınlayın',
    ],
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'AI Grafik & Logo Satışı',
    earnings: '₺3.000 - ₺20.000/ay',
    desc: 'Midjourney ve DALL·E ile logo konseptleri, sosyal medya görselleri ve marka kimlikleri oluşturarak satın.',
    steps: [
      'Midjourney ile farklı stilde çalışmalar üretin',
      'Portfolyo oluşturup Bionluk/Fiverr\'da ilan açın',
      'Müşteri ihtiyacına özel tasarımlar sunun',
    ],
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'AI Otomasyon Hizmeti',
    earnings: '₺10.000 - ₺60.000/ay',
    desc: 'İşletmelere AI araçlarıyla otomasyon çözümleri sunun: chatbot kurulumu, e-posta otomasyonu, müşteri hizmetleri vb.',
    steps: [
      'Bir-iki AI otomasyon aracında uzmanlaşın',
      'KOBİ\'lere "AI ile iş süreçlerinizi otomatikleştirin" teklifi sunun',
      'Aylık bakım sözleşmeleri ile düzenli gelir elde edin',
    ],
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
  },
];

export default function HowToEarn() {
  return (
    <section id="how-to-earn" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-green-100 text-green-700 font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            💰 Para Kazanma Rehberi
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            AI Araçlarıyla Nasıl Para Kazanılır?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Bu AI araçlarını öğrenip kullanarak hızlı bir şekilde gelir elde edebileceğiniz 6 kanıtlanmış yöntem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methods.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`bg-gradient-to-r ${m.color} p-5 text-white`}>
                <div className="flex items-center justify-between">
                  {m.icon}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                    {m.earnings}
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-3">{m.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-5 leading-relaxed">{m.desc}</p>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Adım Adım Başlangıç
                </h4>
                <div className="space-y-3">
                  {m.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
