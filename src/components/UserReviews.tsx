import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, MessageSquare, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  toolId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface Props {
  toolId: string;
  toolName: string;
}

export default function UserReviews({ toolId, toolName }: Props) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(`reviews_${toolId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    localStorage.setItem(`reviews_${toolId}`, JSON.stringify(reviews));
  }, [reviews, toolId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now().toString(),
      toolId,
      name: name.trim() || 'Anonim',
      rating,
      comment,
      date: new Date().toISOString(),
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);
    setName('');
    setComment('');
    setRating(5);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 2000);
  };

  const markHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            Kullanıcı Yorumları
            {reviews.length > 0 && (
              <span className="text-sm font-normal text-slate-400">({reviews.length})</span>
            )}
          </h4>
          {avgRating && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{avgRating}</span>
              <span className="text-xs text-slate-400">ortalama</span>
            </div>
          )}
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors"
          >
            Yorum Yaz
          </button>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4"
          >
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-2">✅</div>
                <p className="font-bold text-slate-900 dark:text-white">Yorumunuz eklendi!</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Puanınız</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(s)}
                        className="p-0.5"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            s <= (hoveredStar || rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Adınız</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Anonim"
                      className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Yorumunuz *</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={`${toolName} hakkında düşünceleriniz...`}
                    rows={3}
                    required
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500">
                    <Send className="w-4 h-4" /> Gönder
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-slate-500 text-sm">
                    İptal
                  </button>
                </div>
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {reviews.length === 0 && !showForm && (
        <p className="text-sm text-slate-400 text-center py-4">
          Henüz yorum yok. İlk yorumu sen yaz!
        </p>
      )}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {reviews.map((r) => (
          <div key={r.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <span className="font-medium text-sm text-slate-900 dark:text-white">{r.name}</span>
                  <span className="text-xs text-slate-400 ml-2">
                    {new Date(r.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 dark:text-slate-600'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{r.comment}</p>
            <button
              onClick={() => markHelpful(r.id)}
              className="flex items-center gap-1 mt-2 text-xs text-slate-400 hover:text-indigo-500 transition-colors"
            >
              <ThumbsUp className="w-3 h-3" /> Faydalı ({r.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
