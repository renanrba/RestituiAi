import { motion } from 'motion/react';
import { FileText, CheckCircle2 } from 'lucide-react';

const documents = [
  "Documento de identificação (RG, CNH ou Passaporte)",
  "Comprovante do benefício (Aposentadoria, pensão ou reforma)",
  "Laudo médico e exames (Para comprovar a doença prevista em lei)",
  "Declarações de IR dos últimos anos (Se houver, para base de cálculo)",
  "Comprovantes de retenção na fonte (Quando aplicável)"
];

export function Documents() {
  return (
    <section className="py-24 bg-white dark:bg-[#050814] border-y border-slate-200 dark:border-white/5 relative transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-6 border border-brand-100 dark:border-brand-500/20">
              <FileText className="w-8 h-8 text-brand-800 dark:text-brand-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              O que normalmente é importante ter em mãos
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-justify">
              Normalmente a Receita exige laudo médico oficial e comprovante de aposentadoria ou pensão; ajudamos você a organizar isso para garantir que seu pedido tenha a base documental correta.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
          >
            <ul className="space-y-4">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 dark:text-brand-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {doc}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
