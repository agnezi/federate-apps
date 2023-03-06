/// <reference types="vitest" />
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/second-app',

  server: {
    port: 4202,
    host: 'localhost',
  },

  preview: {
    port: 4302,
    host: 'localhost',
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
    federation({
      name: 'second-app',
      filename: 'remoteEntry.js',
      exposes: {
        './Home': './apps/second-app/src/views/Home.tsx',
      },
      shared: ['react', 'react-dom', 'react-is'],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
