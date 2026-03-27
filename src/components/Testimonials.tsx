import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: "João Pereira",
    city: "São Paulo, SP",
    amount: "R$ 12.450,00",
    disease: "Cardiopatia grave",
    text: "Fui diagnosticado com cardiopatia grave e não sabia que tinha direito à isenção. A Restitui AI me ajudou a organizar tudo e recuperei o que paguei nos últimos 2 anos."
  },
  {
    name: "Maria Oliveira",
    city: "Curitiba, PR",
    amount: "R$ 28.900,00",
    disease: "Neoplasia maligna",
    text: "O processo foi muito transparente. A análise inicial me deu a segurança que eu precisava para seguir com o pedido de isenção por neoplasia maligna."
  },
  {
    name: "Carlos Santos",
    city: "Belo Horizonte, MG",
    amount: "R$ 8.720,00",
    disease: "Parkinson",
    text: "Excelente atendimento. Descobri que meu diagnóstico retroativo permitia a restituição de valores que eu já considerava perdidos."
  }
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-slate-50 dark:bg-[#0A0F1C] transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-100 dark:border-brand-500/20 uppercase tracking-wider mb-6">
            <Star className="w-3 h-3 fill-current" /> Prova Social
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Casos de Sucesso</h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-slate-600 dark:text-slate-400 font-bold">4.9/5 no Google Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl shadow-sm hover:shadow-md transition-all relative"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-brand-500/10" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="px-2 py-0.5 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-bold rounded-full border border-brand-100 dark:border-brand-500/20 uppercase tracking-tight">
                  {t.disease}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 italic leading-relaxed text-justify">"{t.text}"</p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500">{t.city}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Recuperado</div>
                  <div className="text-sm font-bold text-brand-600 dark:text-brand-300">{t.amount}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
