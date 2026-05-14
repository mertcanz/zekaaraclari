import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, ChevronLeft, Tag, Share2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { blogCategories, type BlogPost } from '../data/blog';
import ReactMarkdown from 'react-markdown';
import ShareButtons from './ShareButtons';

export default function Blog() {
  const { blogPosts } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((p) => p.featured);

  // ARTICLE VIEW
  if (selectedPost) {
    return (
      <section className="py-12 bg-white dark:bg-slate-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Tüm Yazılara Dön
          </button>

          <article>
            {/* Meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-4xl">{selectedPost.image}</span>
                <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
                {selectedPost.featured && (
                  <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 text-xs font-bold px-2 py-0.5 rounded-full">
                    ⭐ Öne Çıkan
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                {selectedPost.title}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-4">{selectedPost.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-700">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedPost.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime} okuma
                </span>
                <span className="text-slate-400">•</span>
                <span>{selectedPost.author}</span>
              </div>
            </div>

            {/* Cover Image */}
            {selectedPost.coverImageUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <img src={selectedPost.coverImageUrl} alt={selectedPost.title} className="w-full h-auto max-h-96 object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-indigo-600 dark:prose-code:text-indigo-400">
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>

            {/* Source */}
            {selectedPost.sourceUrl && (
              <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">📎 Kaynak:</span>
                <a href={selectedPost.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  {selectedPost.sourceName || selectedPost.sourceUrl}
                </a>
              </div>
            )}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Etiketler</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Share2 className="w-4 h-4" /> Bu yazıyı paylaşın
              </span>
              <ShareButtons title={selectedPost.title} />
            </div>

            {/* CTA */}
            <div className="mt-10 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Bu Yazıyı Beğendiniz mi?</h3>
              <p className="text-indigo-100 mb-6">E-posta listemize katılın, her hafta yeni içeriklerden haberdar olun.</p>
            </div>
          </article>
        </div>
      </section>
    );
  }

  // LIST VIEW
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-800/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">📚 Blog & Haberler</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">Yapay zeka dünyasından en güncel yazılar ve rehberler</p>
        </div>

        {/* Featured */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">⭐ Öne Çıkan Yazılar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredPosts.slice(0, 3).map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedPost(post)}
                  className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <span className="text-3xl block mb-3">{post.image}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{post.category}</span>
                  <h4 className="text-lg font-bold mt-2 mb-2 line-clamp-2">{post.title}</h4>
                  <p className="text-indigo-100 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-indigo-200">
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Yazı ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Colored Top Bar */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{post.image}</span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{post.category}</span>
                    </div>
                    {post.featured && <span className="text-yellow-400 text-xs">⭐</span>}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Oku <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-slate-500 dark:text-slate-400">Aramanıza uygun yazı bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
}
