/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'node:path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/admin',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    nxViteTsPaths(),
  ],
  resolve: {
    alias: {
      '@creditwave/hooks': resolve(__dirname, '../../packages/hooks/src'),
      '@creditwave/ui': resolve(__dirname, '../../packages/ui/src'),
      '@creditwave/utils': resolve(__dirname, '../../packages/utils/src'),
      // Ajoutez tous vos packages ici
    }
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
