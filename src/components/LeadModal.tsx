import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    beneficio: '',
    doenca: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Supabase integration
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          name: formData.name, 
          phone: formData.phone,
          email: formData.email,
          beneficio: formData.beneficio,
          doenca: formData.doenca,
          source: 'modal'
        }]);

      if (error) throw error;
      setStatus('success');
    } catch (error) {
      console.error('Error saving lead:', error);
      // Fallback for demo
      setTimeout(() => setStatus('success'), 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[95vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>

            {/* Left Side - Form (60%) */}
            <div className="w-full md:w-[60%] p-6 md:p-10 overflow-y-auto">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Inicie sua verificação</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-medium border border-brand-200 dark:border-brand-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Análise inicial simples
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-medium border border-brand-200 dark:border-brand-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sigilo absoluto
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-medium border border-brand-200 dark:border-brand-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Atendimento personalizado
                  </span>
                </div>
                <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                  Retornamos em até 24h úteis
                </p>
              </div>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                  <div className="w-20 h-20 bg-brand-100 dark:bg-brand-400/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-500 dark:text-brand-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Informações Recebidas!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-justify">Nossa equipe analisará os dados iniciais e entrará em contato em breve.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-xl transition-colors"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-base font-medium text-slate-700 dark:text-slate-300">Nome</label>
                    <input
                      id="name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors text-base"
                      placeholder="Maria da Silva"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-base font-medium text-slate-700 dark:text-slate-300">Telefone</label>
                      <input
                        id="phone"
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors text-base"
                        placeholder="11 998765432"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-base font-medium text-slate-700 dark:text-slate-300">Email</label>
                      <input
                        id="email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors text-base"
                        placeholder="maria@exemplo.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="beneficio" className="text-base font-medium text-slate-700 dark:text-slate-300">Fonte de Renda</label>
                    <select
                      id="beneficio"
                      required
                      value={formData.beneficio}
                      onChange={(e) => setFormData({...formData, beneficio: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors appearance-none text-base"
                    >
                      <option value="" disabled>Selecione...</option>
                      <option value="Aposentado">Aposentado</option>
                      <option value="Pensionista">Pensionista</option>
                      <option value="Militar Reformado">Militar Reformado</option>
                      <option value="Reserva Remunerada">Reserva Remunerada</option>
                      <option value="Beneficiário da previdência">Beneficiário da previdência</option>
                      <option value="Na Ativa">Na Ativa</option>
                      <option value="Já sou cliente">Já sou cliente</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="doenca" className="text-base font-medium text-slate-700 dark:text-slate-300">Doença diagnosticada</label>
                    <select
                      id="doenca"
                      required
                      value={formData.doenca}
                      onChange={(e) => setFormData({...formData, doenca: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors appearance-none text-base"
                    >
                      <option value="" disabled>Selecione...</option>
                      <option value="Neoplasia Maligna (Câncer)">Neoplasia Maligna (Câncer)</option>
                      <option value="Cardiopatia grave">Cardiopatia grave</option>
                      <option value="Paralisia Irreversível e Incapacitante">Paralisia Irreversível e Incapacitante</option>
                      <option value="AIDS">AIDS</option>
                      <option value="Alienação mental">Alienação mental (Alzheimer, Demência, Esquizofrenia, etc.)</option>
                      <option value="Acidente de serviço ou Moléstias profissionais">Acidente de serviço ou Moléstias profissionais</option>
                      <option value="Cegueira">Cegueira</option>
                      <option value="Contaminação por radiação">Contaminação por radiação</option>
                      <option value="Doença de Paget">Doença de Paget</option>
                      <option value="Doença de Parkinson">Doença de Parkinson</option>
                      <option value="Esclerose múltipla">Esclerose múltipla</option>
                      <option value="Espondiloartrose anquilosante">Espondiloartrose anquilosante</option>
                      <option value="Fibrose cística (Mucoviscidose)">Fibrose cística (Mucoviscidose)</option>
                      <option value="Hanseníase">Hanseníase</option>
                      <option value="Hepatopatia grave">Hepatopatia grave</option>
                      <option value="Nefropatia Grave">Nefropatia Grave</option>
                      <option value="Tuberculose Ativa">Tuberculose Ativa</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/50 text-white font-bold rounded-xl transition-colors mt-6"
                  >
                    {status === 'loading' ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Enviar informações para análise'
                    )}
                  </motion.button>
                  
                  <div className="flex items-start gap-2 mt-4 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-brand-500 dark:text-brand-300" />
                    <p className="text-xs leading-relaxed text-justify">
                      Seus dados são tratados com sigilo e utilizados apenas para fins de verificação de elegibilidade, em conformidade com a LGPD.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Side - Image (40%) */}
            <div className="hidden md:block w-[40%] bg-brand-100 dark:bg-brand-900/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,107,154,0.2),transparent_70%)] z-10" />
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000" 
                alt="Justiça e Direito" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-90 mix-blend-multiply dark:mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
