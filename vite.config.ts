import { defineConfig as defineVite, type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, mergeConfig, type UserConfig as VitestUserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
// import viteCompression from 'vite-plugin-compression';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './.env.development' });
}

const viteConfig: UserConfig = defineVite({
  plugins: [
    react(),
    tsconfigPaths(),
    // se quiser reinstalar depois, use esta linha inteira:
    // viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 10240, deleteOriginFile: false }),
  ],
  define: {
    'process.env': {
      VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:8111',
    },
  },
  server: {
    port: 4000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: '',
        quietDeps: true,
      },
    },
    postcss: './postcss.config.js',
    modules: {
      scopeBehaviour: 'local',
    },
  },
  build: {
    rollupOptions: {
      external: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**',
        '**/html/**',
        '**/testes/**',
        '**/test-utils/**',
        '**/coverage/**',
      ],
    },
  },
});

const vitestConfig: VitestUserConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'jest-setup.js',
    css: false,
    resolveSnapshotPath: (testPath, snapshotExtension) => testPath + snapshotExtension,
    alias: {
      '^.+\\.(css|scss|sass)$': './testes/style-mock.ts',
    },
    exclude: ['node_modules', 'dist', 'coverage', 'test-utils', 'e2e', 'testes/unit'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'html', 'cobertura', 'json-summary', 'json'],
      reportsDirectory: './testes/unit/coverage',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/test-utils/**',
        '**/testes/unit/**',
        '**/types/**',
        '**/coverage/**',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*index.ts',
        '**/*jest.config.ts',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/*.config.js',
        '.eslintrc.js',
        'testes/style-mock.ts',
        'postcss.config.cjs',
      ],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
