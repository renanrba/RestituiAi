import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Quem pode ter direito à isenção?",
    answer: "Em regra, aposentados, pensionistas e militares da reserva ou reformados, desde que haja doença prevista em lei e documentação compatível."
  },
  {
    question: "E se o diagnóstico foi retroativo?",
    answer: "Se o laudo médico indicar que a doença foi contraída em data anterior à atual, é possível solicitar a isenção e a restituição dos valores pagos desde aquela data, respeitando o limite prescricional de 5 anos."
  },
  {
    question: "A isenção se aplica a pensão por morte?",
    answer: "Sim. Pensionistas que possuem alguma das doenças listadas na Lei 7.713/88 também têm direito à isenção do Imposto de Renda sobre o valor da pensão recebida."
  },
  {
    question: "Quem já fez declaração simplificada perde o direito?",
    answer: "Não. O direito à isenção e à restituição independe da forma como você declarou (simplificada ou completa). O que muda é a forma de processar a recuperação dos valores."
  },
  {
    question: "Quanto tempo demora o processo?",
    answer: "O tempo varia conforme o órgão pagador e a via escolhida (administrativa ou judicial). Em média, a análise administrativa pode levar de 3 a 6 meses, enquanto a judicial pode demorar mais, porém com maior segurança jurídica em casos complexos."
  },
  {
    question: "Há risco de malha fina ao solicitar?",
    answer: "Se a solicitação for feita com base em documentação médica idônea e seguindo os procedimentos corretos da Receita Federal, o risco de malha fina é minimizado. Nossa análise inicial serve justamente para garantir que você tenha os documentos necessários."
  },
  {
    question: "A isenção vale para qualquer renda?",
    answer: "Não. A Receita informa que, em regra, a isenção recai sobre rendimentos de aposentadoria, pensão, reforma ou reserva, e não sobre outras rendas como aluguel ou remuneração da ativa."
  },
  {
    question: "Quanto vou pagar?",
    answer: "Nossa análise inicial é gratuita. Caso seu direito seja confirmado e você decida prosseguir com nossa assessoria, trabalhamos com o modelo de êxito: você só paga uma porcentagem do valor recuperado após o recebimento da restituição ou implantação da isenção. Sem custos iniciais ocultos."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-[#0A0F1C] border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Perguntas frequentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 overflow-hidden shadow-sm dark:shadow-none"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
