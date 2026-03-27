import { motion } from 'motion/react';
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPage() {
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
              <Shield className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Política de Privacidade</h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-justify">
              A RestituiAI valoriza a sua privacidade e está comprometida em proteger os seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">1. Coleta de Dados</h3>
            <p className="text-justify">
              Coletamos informações básicas como nome, telefone, e-mail, fonte de renda e condição de saúde para realizar a triagem inicial de elegibilidade à isenção de IR.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">2. Finalidade do Tratamento</h3>
            <p className="text-justify">
              Os dados coletados são utilizados exclusivamente para:
              <ul className="list-disc pl-6 mt-2">
                <li>Verificar a viabilidade do pedido de isenção;</li>
                <li>Entrar em contato para dar continuidade ao atendimento;</li>
                <li>Organizar a documentação necessária para o processo.</li>
              </ul>
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">3. Segurança dos Dados</h3>
            <p className="text-justify">
              Utilizamos tecnologias de criptografia e servidores seguros para garantir que suas informações de saúde e financeiras permaneçam protegidas contra acessos não autorizados.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">4. Compartilhamento de Informações</h3>
            <p className="text-justify">
              Não compartilhamos, vendemos ou alugamos seus dados pessoais a terceiros para fins de marketing. O compartilhamento ocorre apenas com parceiros jurídicos e órgãos públicos estritamente necessários para o processo de isenção.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">5. Seus Direitos</h3>
            <p className="text-justify">
              Você tem o direito de solicitar o acesso, a correção ou a exclusão de seus dados pessoais a qualquer momento através do nosso canal de atendimento: <span className="font-bold">contato@restituiai.com</span>.
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
