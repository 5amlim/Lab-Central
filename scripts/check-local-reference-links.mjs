#!/usr/bin/env node
// Verify directly referenced local PDFs and other source files in Lab Central.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sources = readdirSync(root).filter(name => /\.(?:html|js)$/.test(name));
const errors = [];
let checked = 0;
const seen = new Set();
const localRef = /(['"`])(assets\/[^'"`\r\n]+?\.(?:pdf|png|jpe?g|webp|svg|csv|mp4|docx)(?:\?[^'"`\r\n]*)?)\1/gi;
for (const source of sources) {
  const file = readFileSync(join(root, source), 'utf8');
  for (const match of file.matchAll(localRef)) {
    const url = match[2].split(/[?#]/, 1)[0];
    let pathname;
    try { pathname = decodeURIComponent(url); }
    catch { errors.push(source + ': malformed URL ' + url); continue; }
    const full = resolve(root, pathname);
    if (!full.startsWith(root + sep)) {
      errors.push(source + ': path outside repository: ' + pathname);
      continue;
    }
    if (seen.has(pathname)) continue;
    seen.add(pathname);
    checked++;
    if (!existsSync(full)) errors.push(source + ': missing local reference ' + pathname);
  }
}
if (errors.length) {
  errors.forEach(error => console.error('ERROR: ' + error));
  process.exitCode = 1;
} else {
  console.log('Verified ' + checked + ' unique local reference files across ' + sources.length + ' source files.');
}
