import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { from: /blue-600/g, to: 'brand-800' },
  { from: /blue-500/g, to: 'brand-500' },
  { from: /blue-400/g, to: 'brand-400' },
  { from: /blue-300/g, to: 'brand-300' },
  { from: /blue-200/g, to: 'brand-200' },
  { from: /blue-100/g, to: 'brand-100' },
  { from: /blue-50/g, to: 'brand-50' },
  { from: /emerald-600/g, to: 'brand-500' },
  { from: /emerald-500/g, to: 'brand-400' },
  { from: /emerald-400/g, to: 'brand-300' },
  { from: /emerald-200/g, to: 'brand-200' },
  { from: /emerald-100/g, to: 'brand-100' },
  { from: /emerald-50/g, to: 'brand-50' },
  { from: /purple-600/g, to: 'brand-800' },
  { from: /purple-500/g, to: 'brand-500' },
  { from: /purple-400/g, to: 'brand-400' },
  { from: /purple-200/g, to: 'brand-200' },
  { from: /purple-100/g, to: 'brand-100' },
  { from: /purple-50/g, to: 'brand-50' },
  { from: /amber-600/g, to: 'brand-800' },
  { from: /amber-500/g, to: 'brand-500' },
  { from: /amber-400/g, to: 'brand-400' },
  { from: /amber-200/g, to: 'brand-200' },
  { from: /amber-100/g, to: 'brand-100' },
  { from: /amber-50/g, to: 'brand-50' },
  { from: /amber-700/g, to: 'brand-900' },
  { from: /amber-800/g, to: 'brand-950' },
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(filePath, content);
}
console.log('Done');
