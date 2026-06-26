#!/usr/bin/env node
/** Minify theme CSS into dist/theme.css */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '../src/shutters-theme.css');
const out = path.join(__dirname, '../dist/theme.css');

const css = fs.readFileSync(src, 'utf8');
const result = await transform(css, { loader: 'css', minify: true });
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, result.code);
console.log('✓ Built dist/theme.css');
