import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Users, Clock } from 'lucide-react';

export function Metrics() {
  const stats = [
    { label: "Casos analisados", value: "+500", icon: Users },
    { label: "Recuperados", value: "R$ 2.8M", icon: TrendingUp },
    { label: "Sigilo absoluto", value: "100%", icon: ShieldCheck },
    { label: "Tempo de resposta", value: "24h", icon: Clock },
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#0A0F1C] py-12 border-y border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
