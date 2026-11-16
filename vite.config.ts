import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

const ownerOf = (id: string) => {
  const dir = /\/src\/([^/]+)\//.exec(id)?.[1];
  return dir && ['table', 'editor', 'markdown', 'dock'].includes(dir) ? dir : 'index';
};

// Shared-chunk CSS is emitted as an orphan file; fold it into the CSS of the entry owning its modules.
const routeSharedCss: Plugin = {
  name: 'lumen-route-shared-css',
  generateBundle(_, bundle) {
    const created = new Map<string, string>();
    for (const chunk of Object.values(bundle)) {
      if (chunk.type !== 'chunk' || chunk.isEntry) continue;
      const owners = new Set(
        chunk.moduleIds.filter((id) => !id.includes('node_modules')).map(ownerOf),
      );
      for (const cssName of chunk.viteMetadata?.importedCss ?? []) {
        const css = bundle[cssName];
        if (css?.type !== 'asset') continue;
        if (owners.size !== 1) this.error(`${cssName} spans entries: ${[...owners].join(', ')}`);
        const owner = [...owners][0];
        const target = bundle[`${owner}.css`];
        if (target?.type === 'asset') {
          target.source = `${css.source}\n${target.source}`;
        } else {
          const isEntry = Object.values(bundle).some(
            (c) => c.type === 'chunk' && c.isEntry && c.name === owner,
          );
          if (!isEntry) this.error(`${cssName}: ${owner} is not an entry`);
          created.set(owner, `${created.get(owner) ?? ''}${css.source}\n`);
        }
        delete bundle[cssName];
      }
    }
    for (const [owner, source] of created)
      this.emitFile({ type: 'asset', fileName: `${owner}.css`, source });
  },
};

export default defineConfig({
  plugins: [vue(), routeSharedCss],
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
