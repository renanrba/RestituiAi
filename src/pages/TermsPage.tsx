import { motion } from 'motion/react';
import { Shield, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] pt-32 pb-24 transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="w-5 h-5" /> Voltar para o início
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-sm dark:shadow-none"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Termos e Condições de Uso</h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-justify">
              Bem-vindo à RestituiAI. Ao acessar ou utilizar nossa plataforma, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">1. Natureza dos Serviços</h3>
            <p className="text-justify">
              A RestituiAI é uma plataforma digital que oferece serviços de triagem inicial e organização documental para processos de isenção de Imposto de Renda por doença grave. Nossos serviços não substituem a consultoria jurídica individualizada ou a perícia médica oficial.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">2. Uso da Plataforma</h3>
            <p className="text-justify">
              O usuário compromete-se a fornecer informações verídicas e completas durante o preenchimento dos formulários. O uso indevido da plataforma para fins fraudulentos resultará no bloqueio imediato do acesso e possíveis medidas legais.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">3. Limitação de Responsabilidade</h3>
            <p className="text-justify">
              A RestituiAI realiza uma análise preliminar baseada nas informações fornecidas pelo usuário. O reconhecimento final do direito à isenção compete exclusivamente aos órgãos públicos competentes ou ao Poder Judiciário.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">4. Propriedade Intelectual</h3>
            <p className="text-justify">
              Todo o conteúdo, design e tecnologia da plataforma são de propriedade exclusiva da RestituiAI, protegidos pelas leis de direitos autorais e propriedade intelectual.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">5. Alterações nos Termos</h3>
            <p className="text-justify">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma.
            </p>

            <p className="mt-12 text-sm text-slate-500 dark:text-slate-400 italic">
              Última atualização: 26 de Março de 2026.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
