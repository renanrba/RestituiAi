import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, ArrowLeft, AlertCircle } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple hardcoded check for demonstration as requested "simple login"
    // In a real app, this would be a Supabase Auth call
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_session', 'true');
      navigate('/admin');
    } else {
      setError('Usuário ou senha incorretos.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050814] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-brand-500" />
            </div>
            <div className="w-9" /> {/* Spacer */}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Acesso Restrito</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">
            Entre com suas credenciais para acessar o painel administrativo.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-400 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-500/20"
            >
              {loading ? 'Entrando...' : 'Entrar no Painel'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
