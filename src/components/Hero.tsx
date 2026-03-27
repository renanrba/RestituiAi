import { motion } from 'motion/react';
import { ArrowRight, Globe } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16 transition-colors duration-300">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0A0F1C] transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      
      <div className="container relative z-10 px-4 mx-auto text-center max-w-5xl">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none"
          >
            <Globe className="w-4 h-4 text-brand-500 dark:text-brand-300" />
            <span className="text-base font-medium text-brand-500 dark:text-brand-300 tracking-wide uppercase">Atendimento digital em todo o Brasil</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]"
          >
            Verifique se você pode ter direito à isenção de Imposto de Renda por <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-brand-400 dark:from-brand-400 dark:to-brand-300">doença grave</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed text-justify"
          >
            Brasileiros já recuperaram até <span className="font-bold text-brand-600 dark:text-brand-300">R$ 80.000</span> em impostos pagos indevidamente. Realizamos uma análise inicial gratuita para identificar seu direito ao enquadramento legal.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-2xl overflow-hidden transition-colors w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span>Verificar meu caso</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.a
              href="#como-funciona"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-semibold rounded-2xl border border-slate-200 dark:border-white/10 transition-colors w-full sm:w-auto"
            >
              Entender como funciona
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
