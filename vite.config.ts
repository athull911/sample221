import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveHtmlEntryPlugin(): Plugin {
  return {
    name: 'resolve-html-entry',
    enforce: 'pre',
    resolveId(source: string, importer?: string) {
      if (
        importer &&
        importer.endsWith('index.html') &&
        (source.includes('main.tsx') ||
          source.includes('Main.tsx') ||
          source.includes('main.ts') ||
          source.includes('Main.ts'))
      ) {
        const candidates = [
          path.resolve(__dirname, 'src/main.tsx'),
          path.resolve(__dirname, 'src/Main.tsx'),
          path.resolve(__dirname, 'src/main.ts'),
          path.resolve(process.cwd(), 'src/main.tsx'),
          path.resolve(process.cwd(), 'src/Main.tsx'),
        ];
        for (const candidate of candidates) {
          if (fs.existsSync(candidate)) {
            return candidate;
          }
        }
        return path.resolve(__dirname, 'src/main.tsx');
      }
      return null;
    },
  };
}

export default defineConfig(() => {
  return {
    root: process.cwd(),
    plugins: [resolveHtmlEntryPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['motion'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
