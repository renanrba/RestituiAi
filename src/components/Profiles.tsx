import { motion } from 'motion/react';
import { UserCheck, Users, Shield, FileHeart } from 'lucide-react';

const profiles = [
  {
    icon: UserCheck,
    title: "Aposentados do INSS ou de regime próprio"
  },
  {
    icon: Users,
    title: "Pensionistas"
  },
  {
    icon: Shield,
    title: "Militares da reserva ou reformados"
  },
  {
    icon: FileHeart,
    title: "Beneficiários com diagnóstico de doença prevista em lei"
  }
];

export function Profiles() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0A0F1C] border-y border-slate-200 dark:border-white/5 relative transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Perfis que costumam buscar essa análise
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {profiles.map((profile, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-6">
                <profile.icon className="w-7 h-7 text-brand-800 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                {profile.title}
              </h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-4 text-slate-600 dark:text-slate-400"
        >
          <p className="text-justify">
            A análise depende do caso concreto, da documentação disponível e da data relevante para o reconhecimento do direito.
          </p>
          <p className="text-sm text-justify">
            A base legal da isenção está no art. 6º, XIV, da Lei 7.713/88, e a Receita informa que a isenção alcança rendimentos de aposentadoria, pensão, reforma ou reserva, não outros rendimentos em geral.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
