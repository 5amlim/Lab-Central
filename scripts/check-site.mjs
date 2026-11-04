#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = readdirSync(root).filter((name) => name.endsWith('.html'));
const errors = [];
let references = 0;

for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  const tags = html.match(/<(?:script|link|img)\b[^>]*>/gi) || [];

  for (const tag of tags) {
    const match = tag.match(/\b(?:src|href)\s*=\s*["']([^"']+)["']/i);
    if (!match) continue;

    const url = match[1].trim();
    if (!url || /^(?:[a-z]+:|\/\/|#)/i.test(url)) continue;

    const asset = decodeURIComponent(url.split(/[?#]/, 1)[0]);
    if (!asset) continue;

    references += 1;
    if (!existsSync(resolve(root, asset))) {
      errors.push(page + ': missing ' + asset);
    }
  }
}

if (!pages.includes('index.html')) errors.push('Missing index.html');
if (errors.length) {
  for (const error of errors) console.error('ERROR: ' + error);
  process.exitCode = 1;
} else {
  console.log('Verified ' + references + ' local asset references across ' + pages.length + ' HTML pages.');
}
