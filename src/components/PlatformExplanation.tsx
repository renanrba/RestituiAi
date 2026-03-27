import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export function PlatformExplanation() {
  return (
    <section id="o-que-verificamos" className="py-20 bg-white dark:bg-[#050814] relative overflow-hidden transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-8 border border-brand-100 dark:border-brand-500/20">
            <Search className="w-8 h-8 text-brand-800 dark:text-brand-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            O que é analisado no seu caso
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl text-justify">
            A plataforma foi estruturada para fazer uma triagem inicial de elegibilidade em situações envolvendo aposentadoria, pensão ou reforma militar, associadas às hipóteses legais de isenção por moléstia grave. A ideia não é prometer resultado automático, mas organizar as informações certas desde o começo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
