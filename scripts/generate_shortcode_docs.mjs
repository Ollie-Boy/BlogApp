import { promises as fs } from 'fs';
import path from 'path';
const root = 'themes/comichero/layouts/shortcodes';
const files = (await fs.readdir(root)).filter((f) => f.endsWith('.html')).sort();
let out = '# Shortcode 参数文档（自动生成）\n\n';
for (const file of files) {
  const c = await fs.readFile(path.join(root, file), 'utf8');
  const params = [...c.matchAll(/\.Get\s+"([^"]+)"/g)].map((m) => m[1]);
  out += `## ${file}\n`;
  out += params.length ? `- 参数：${[...new Set(params)].map((v)=>'`'+v+'`').join('、')}\n\n` : '- 参数：无\n\n';
}
await fs.writeFile('exampleSite/content/docs/shortcode-params.md', out);
console.log('generated exampleSite/content/docs/shortcode-params.md');
