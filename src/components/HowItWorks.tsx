import { motion } from 'motion/react';
import { ClipboardList, SearchCheck, FolderOpen, ArrowRightCircle } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: "Triagem inicial",
    deadline: "Imediato",
    description: "Você informa dados básicos sobre o benefício recebido e a condição de saúde relacionada ao pedido."
  },
  {
    icon: SearchCheck,
    title: "Verificação de enquadramento",
    deadline: "Até 24h",
    description: "É feita a conferência preliminar dos critérios legais normalmente exigidos para o reconhecimento da isenção."
  },
  {
    icon: FolderOpen,
    title: "Organização documental",
    deadline: "Até 48h",
    description: "Se houver viabilidade, são indicados os documentos mais relevantes para dar segurança à próxima fase."
  },
  {
    icon: ArrowRightCircle,
    title: "Encaminhamento do caso",
    deadline: "Conforme demanda",
    description: "Com as informações organizadas, o caso segue para a medida mais adequada conforme a situação apresentada."
  }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-white dark:bg-[#050814] relative transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Como a análise é conduzida</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line with Animation */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-white/10 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-brand-500 to-transparent"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="relative flex flex-col items-center text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-sm dark:shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all group-hover:border-brand-500/50"
              >
                <step.icon className="w-10 h-10 text-brand-800 dark:text-brand-400 group-hover:text-brand-600 transition-colors" />
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center border-4 border-white dark:border-[#050814] shadow-md">
                  {index + 1}
                </div>
              </motion.div>
              
              <div className="flex flex-col items-center mb-3">
                <span className="px-2 py-0.5 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 text-[10px] font-bold rounded-full border border-brand-100 dark:border-brand-500/20 uppercase tracking-tighter">{step.deadline}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 transition-colors">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-justify">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-brand-600 dark:text-brand-400 font-bold text-lg">
            Você não assume nenhum custo antes de entender a viabilidade do seu caso.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
