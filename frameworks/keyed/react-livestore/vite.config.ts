// @ts-check
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

const credentiallessHeaders = {
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Service-Worker-Allowed': '/',
};

const isProdBuild = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: "/frameworks/keyed/react-livestore/dist",
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 60001,
    headers: credentiallessHeaders,
  },
  preview: {
    headers: credentiallessHeaders,
  },
  worker: isProdBuild ? { format: 'es' } : undefined,
  optimizeDeps: {
    exclude: ['@livestore/wa-sqlite'],
  },
  plugins: [
    react(),
    visualizer(),
  ],
});
