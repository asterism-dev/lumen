import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const src = resolve(import.meta.dirname, '../src');

// Builds the live examples into a single script the Zensical pages load
export default defineConfig({
  plugins: [vue()],
  define: { 'process.env.NODE_ENV': '"production"' },
  resolve: {
    alias: [
      { find: /^@asterism-dev\/lumen$/, replacement: `${src}/index.ts` },
      { find: /^@asterism-dev\/lumen\/(\w+)$/, replacement: `${src}/$1/index.ts` },
    ],
  },
  build: {
    outDir: resolve(import.meta.dirname, 'assets/lumen'),
    emptyOutDir: true,
    lib: {
      entry: resolve(import.meta.dirname, 'islands.ts'),
      formats: ['iife'],
      name: 'LumenDocs',
      fileName: () => 'islands.js',
      cssFileName: 'islands',
    },
  },
});
