import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

const entryCss = new Set(['index', 'table', 'editor', 'markdown', 'dock'].map((n) => `${n}.css`));

// Shared-chunk CSS (e.g. Table, TextInput) is emitted as an orphan file; fold it into index.css.
const mergeSharedCss: Plugin = {
  name: 'lumen-merge-shared-css',
  generateBundle(_, bundle) {
    const index = bundle['index.css'];
    if (index?.type !== 'asset') return;
    for (const [name, asset] of Object.entries(bundle)) {
      if (asset.type !== 'asset' || !name.endsWith('.css') || entryCss.has(name)) continue;
      index.source = `${asset.source}\n${index.source}`;
      delete bundle[name];
    }
  },
};

export default defineConfig({
  plugins: [vue(), mergeSharedCss],
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
