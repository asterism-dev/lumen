import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const forbidden = [
  'codemirror',
  '@codemirror/',
  '@lezer/',
  'dockview',
  '@tanstack/',
  'markdown-it',
  'dompurify',
  'highlight.js',
];
const importPattern = /(?:import|export)\s*\(?\s*(?:[^'"]*?\sfrom\s*)?['"](\.[^'"]+)['"]/g;

const files = [resolve('dist/index.css')];
const queue = [resolve('dist/index.js')];
const seen = new Set();
while (queue.length) {
  const file = queue.pop();
  if (seen.has(file)) continue;
  seen.add(file);
  files.push(file);
  const source = readFileSync(file, 'utf8');
  for (const [, spec] of source.matchAll(importPattern)) queue.push(resolve(dirname(file), spec));
}

let failed = false;
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  for (const pattern of forbidden) {
    if (source.includes(pattern)) {
      console.error(`${file}: contains "${pattern}"`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log(`isolation ok (${files.length} files checked)`);
