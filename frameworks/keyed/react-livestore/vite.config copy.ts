// @ts-check
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";
// https://vitejs.dev/config
export default defineConfig({
  build: {
    assetsDir: '',
    rollupOptions: {
      input: ['src/main.jsx', 'src/schema/index.js', 'src/livestore.worker.js'],
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    },
  },
  optimizeDeps: {
    // TODO remove @livestore/wa-sqlite once fixed https://github.com/vitejs/vite/issues/8427
    // TODO figure out why `fsevents` is needed. Otherwise seems to throw error when starting Vite
    // Error: `No loader is configured for ".node" files`
    exclude: ['@livestore/wa-sqlite', 'fsevents'],
  },
  plugins: [
    wasm(),
    react(),
    // function() {
    //   return {
    //     name: 'test',
    //     transform: (...args) => {
    //       console.log(args)
    //     }
    //   }
    // }()
  ]
})
