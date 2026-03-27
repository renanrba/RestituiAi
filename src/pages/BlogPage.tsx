import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LeadModal } from '../components/LeadModal';
import { articles } from '../data/articles';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  read_time: string;
}

export function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const supabasePosts = (data || []).map(post => ({
        ...post,
        read_time: post.read_time || '5 min'
      }));

      const localPosts = articles.map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        image: article.image,
        category: article.category,
        date: article.date,
        read_time: article.readTime
      }));

      // Combine and remove duplicates by ID (if any)
      const combined = [...supabasePosts];
      localPosts.forEach(local => {
        if (!combined.find(p => p.id === local.id)) {
          combined.push(local);
        }
      });

      setPosts(combined);
    } catch (err) {
      console.error('Error fetching posts:', err);
      // Fallback to local posts if Supabase fails
      setPosts(articles.map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        image: article.image,
        category: article.category,
        date: article.date,
        read_time: article.readTime
      })));
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Todos', ...Array.from(new Set(posts.map(a => a.category)))];

  const filteredArticles = posts.filter(article => {
    const matchesCategory = filter === 'Todos' || article.category === filter;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-[#050814] transition-colors duration-300">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Blog e Artigos
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-justify">
              Fique por dentro das últimas notícias, dicas e informações sobre isenção de Imposto de Renda e restituição.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category 
                      ? 'bg-brand-600 text-white' 
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md dark:shadow-none transition-all hover:-translate-y-1"
                  >
                    <Link to={`/blog/${article.id}`} className="relative h-48 overflow-hidden block">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900 dark:text-white">
                        {article.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{article.read_time}</span>
                        </div>
                      </div>
                      
                      <Link to={`/blog/${article.id}`}>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 text-justify">
                        {article.excerpt}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/10">
                        <Link to={`/blog/${article.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 dark:text-brand-400 group-hover:gap-3 transition-all">
                          Ler artigo completo <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400">Nenhum artigo encontrado para a sua busca.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer onOpenModal={() => setIsModalOpen(true)} />
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
