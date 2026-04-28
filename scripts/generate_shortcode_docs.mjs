import { promises as fs } from 'fs';
import path from 'path';
const root = 'themes/comichero/layouts/shortcodes';
const files = (await fs.readdir(root)).filter((f) => f.endsWith('.html')).sort();
let out = '# Shortcode Parameter Reference (Auto-generated)\n\n';
for (const file of files) {
  const c = await fs.readFile(path.join(root, file), 'utf8');
  const params = [...c.matchAll(/\.Get\s+"([^"]+)"/g)].map((m) => m[1]);
  out += `## ${file}\n`;
  out += params.length
    ? `- Parameters: ${[...new Set(params)].map((v) => '`' + v + '`').join(', ')}\n\n`
    : '- Parameters: none\n\n';
}
await fs.writeFile('exampleSite/content/docs/shortcode-params.md', out);
console.log('generated exampleSite/content/docs/shortcode-params.md');
