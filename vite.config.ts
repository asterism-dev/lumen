import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: ['safari15.4', 'chrome111', 'firefox115'],
    cssCodeSplit: true,
    lib: {
      formats: ['es'],
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        table: resolve(__dirname, 'src/table/index.ts'),
        editor: resolve(__dirname, 'src/editor/index.ts'),
        markdown: resolve(__dirname, 'src/markdown/index.ts'),
        dock: resolve(__dirname, 'src/dock/index.ts'),
      },
    },
    rollupOptions: {
      external: (id: string) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0'),
    },
  },
});
