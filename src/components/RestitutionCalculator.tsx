import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info, ArrowRight } from 'lucide-react';

export function RestitutionCalculator({ onOpenModal }: { onOpenModal: () => void }) {
  const [benefit, setBenefit] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseFloat(benefit.replace(',', '.'));
    const y = parseInt(years);

    if (isNaN(b) || isNaN(y)) return;

    // Rough estimation: 15% IR rate on average for these benefits
    // 13 months per year (including 13th salary)
    const estimatedIR = b * 0.15;
    const total = estimatedIR * y * 13;
    setResult(total);
  };

  return (
    <section id="calculadora" className="py-24 bg-white dark:bg-[#050814] transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-100 dark:border-brand-500/20 uppercase tracking-wider mb-6">
              <Calculator className="w-3 h-3" /> Simulador de Restituição
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Quanto você pode recuperar?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-justify">
              Muitos aposentados e pensionistas pagam Imposto de Renda sem saber que têm direito à isenção. Use nossa calculadora para ter uma estimativa de quanto pode ser restituído dos últimos 5 anos.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                <Info className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  O cálculo é uma estimativa baseada em alíquotas médias. O valor real depende da sua faixa salarial e deduções.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm dark:shadow-none"
          >
            <div className="mb-6 p-4 bg-brand-50 dark:bg-brand-500/10 rounded-2xl border border-brand-100 dark:border-brand-500/20">
              <p className="text-sm text-brand-700 dark:text-brand-300 font-medium">
                Simulação anônima, sem necessidade de CPF. Você vê o valor estimado e decide se quer prosseguir.
              </p>
            </div>

            <form onSubmit={calculate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-base font-bold text-slate-700 dark:text-slate-300">Valor do benefício mensal (R$)</label>
                <input
                  type="text"
                  placeholder="Ex: 5.000,00"
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-bold text-slate-700 dark:text-slate-300">
                  Anos desde o diagnóstico
                  <span className="block text-sm font-normal text-slate-500 dark:text-slate-400 mt-1">
                    Se seu diagnóstico é antigo, você pode ter valores a recuperar dos últimos 5 anos
                  </span>
                </label>
                <select
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors appearance-none text-base"
                >
                  <option value="">Selecione...</option>
                  <option value="1">1 ano</option>
                  <option value="2">2 anos</option>
                  <option value="3">3 anos</option>
                  <option value="4">4 anos</option>
                  <option value="5">5 anos</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl transition-colors"
              >
                Calcular Estimativa
              </motion.button>
            </form>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-brand-500 text-white rounded-2xl text-center"
              >
                <div className="text-sm font-medium opacity-80 mb-1">Estimativa de Restituição</div>
                <div className="text-2xl font-bold mb-4">
                  {(result * 0.9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - {(result * 1.1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <button
                  onClick={onOpenModal}
                  className="w-full py-3 bg-white text-brand-600 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  Quero que a equipe revise meu caso
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
