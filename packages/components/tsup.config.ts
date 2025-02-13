/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-param-reassign */
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  clean: true,
  dts: false,
  entry: ['./modules/**/(common|web|native)/index.ts'],
  esbuildOptions(esbuildOptions) {
    esbuildOptions.loader = {
      ...esbuildOptions.loader,
      '.css': 'file',
    }
  },
  external: [
    'react',
    'react-dom',
    /^@baseapp-frontend\//,
    'react-native',
    'next',
    '@mui/material',
    '@emotion/*',
    'zod',
    'zustand',
  ],
  format: ['esm', 'cjs'],
  minify: !options.watch,
  outDir: 'dist',
  sourcemap: true,
  splitting: true,
  treeshake: false,
  tsconfig: 'tsconfig.build.json',
}))
