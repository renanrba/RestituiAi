import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LeadModal } from '../components/LeadModal';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  read_time: string;
}

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [article, setArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (err) {
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050814]">
        <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050814]">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Artigo não encontrado</h1>
        <button onClick={() => navigate('/blog')} className="text-brand-600 hover:underline">
          Voltar para o blog
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-[#050814] transition-colors duration-300">
        <article className="container px-4 mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para o blog
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-brand-100 dark:bg-brand-500/20 text-brand-800 dark:text-brand-300 px-3 py-1 rounded-full text-xs font-semibold">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between border-y border-slate-200 dark:border-white/10 py-4 mb-8">
              <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.read_time}</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden mb-12 shadow-lg">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover max-h-[500px]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div 
            className="prose prose-lg dark:prose-invert prose-brand max-w-none
              prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-justify
              prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
              prose-li:text-slate-600 dark:prose-li:text-slate-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-16 p-8 bg-brand-50 dark:bg-brand-900/20 rounded-3xl border border-brand-100 dark:border-brand-500/20 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Você tem direito à isenção?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-justify">
              Fale com nossos especialistas e descubra se você pode parar de pagar Imposto de Renda e recuperar valores dos últimos 5 anos.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5"
            >
              Fazer Análise Gratuita
            </button>
          </div>
        </article>
      </main>

      <Footer onOpenModal={() => setIsModalOpen(true)} />
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
