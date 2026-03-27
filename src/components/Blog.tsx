import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-slate-50 dark:bg-[#0A0F1C] relative transition-colors duration-300 border-y border-slate-200 dark:border-white/5">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Informação e transparência</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 text-justify">
              Acompanhe nossos artigos sobre os critérios legais, decisões recentes e o funcionamento da isenção de Imposto de Renda.
            </p>
          </div>
          <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-brand-800 dark:text-brand-400 font-semibold hover:gap-3 transition-all">
            Ver todos os artigos <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md dark:shadow-none transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
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
          ))}
        </div>

        <Link to="/blog" className="mt-8 w-full md:hidden inline-flex items-center justify-center gap-2 text-brand-800 dark:text-brand-400 font-semibold py-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20">
          Ver todos os artigos <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
