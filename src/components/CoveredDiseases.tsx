import { motion } from 'motion/react';
import { 
  Heart, 
  Activity, 
  Brain, 
  Eye, 
  ShieldAlert, 
  Stethoscope, 
  AlertTriangle,
  Zap,
  Dna,
  Thermometer,
  Microscope,
  Bone
} from 'lucide-react';

const diseases = [
  { icon: Activity, name: "Neoplasia Maligna (Câncer)" },
  { icon: Heart, name: "Cardiopatia Grave" },
  { icon: Brain, name: "Doença de Parkinson" },
  { icon: Brain, name: "Alienação Mental" },
  { icon: Stethoscope, name: "Nefropatia Grave" },
  { icon: Stethoscope, name: "Hepatopatia Grave" },
  { icon: Zap, name: "Paralisia Irreversível" },
  { icon: Eye, name: "Cegueira" },
  { icon: ShieldAlert, name: "AIDS (SIDA)" },
  { icon: Thermometer, name: "Hanseníase" },
  { icon: Microscope, name: "Tuberculose Ativa" },
  { icon: AlertTriangle, name: "Contaminação por Radiação" },
  { icon: Bone, name: "Doença de Paget" },
  { icon: Dna, name: "Fibrose Cística" },
  { icon: Bone, name: "Espondiloartrose Anquilosante" },
  { icon: Microscope, name: "Esclerose Múltipla" }
];

export function CoveredDiseases() {
  return (
    <section id="doencas" className="py-24 bg-slate-50 dark:bg-[#0A0F1C] transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Doenças que garantem a isenção</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            O Art. 6º, inciso XIV, da Lei 7.713/88 lista as patologias que permitem a isenção do Imposto de Renda sobre aposentadoria, pensão ou reforma.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {diseases.map((disease, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
                <disease.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{disease.name}</h3>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-2xl text-center">
          <p className="text-sm text-brand-800 dark:text-brand-300 font-medium">
            * A lista acima é exemplificativa conforme a legislação. Outras condições podem ser analisadas dependendo do laudo médico.
          </p>
        </div>
      </div>
    </section>
  );
}
