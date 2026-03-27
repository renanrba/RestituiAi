import { motion } from 'motion/react';
import { Shield, Globe } from 'lucide-react';

export function AboutUs() {
  return (
    <section id="quem-somos" className="py-24 bg-white dark:bg-[#050814] relative transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Quem somos?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-justify mb-8">
              A RestituiAI foi pensada para tornar mais clara a etapa inicial de verificação em casos que envolvem isenção de Imposto de Renda por doença grave. O objetivo é reduzir ruído, organizar informações e dar direção ao usuário desde o primeiro contato.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-1">7+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider">Anos de experiência</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-1">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider">Casos analisados</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Shield className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium">Conformidade total com a LGPD</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Globe className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium">Atendimento digital em todo o Brasil</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Profile Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center md:justify-end"
          >
            {/* Renally Lima */}
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-4 backdrop-blur-sm shadow-sm dark:shadow-none w-full sm:w-64">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-200 dark:bg-slate-800">
                <img
                  src="https://i.imgur.com/DjPZaAX.jpeg"
                  alt="Renally Lima"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="text-lg font-bold">Renally Lima</h4>
                  <p className="text-brand-300 font-medium text-sm">Coordenadora Jurídica</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium text-center mb-2">Coordenação jurídica e tributária</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 italic text-center leading-tight">
                "Mais de 7 anos atuando em direito tributário e previdenciário, com foco em isenção de IR por doença grave."
              </p>
            </div>

            {/* Renan Ribeiro */}
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-4 backdrop-blur-sm shadow-sm dark:shadow-none w-full sm:w-64">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-200 dark:bg-slate-800">
                <img
                  src="https://i.imgur.com/vBFdkax.jpeg"
                  alt="Renan Ribeiro"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="text-lg font-bold">Renan Ribeiro</h4>
                  <p className="text-brand-300 font-medium text-sm">Consultor Senior</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium text-center mb-2">Suporte de IA / Tecnologia</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 italic text-center leading-tight">
                "Responsável por tecnologia e segurança de dados, com foco em privacidade e uso ético de IA."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
