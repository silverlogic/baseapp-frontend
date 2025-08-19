/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-param-reassign */
import { defineConfig } from 'tsup'

export default defineConfig(() => ({
  clean: true,
  dts: false,
  entry: ['./modules/**/(common|web|native)/index.ts'],
  esbuildOptions(esbuildOptions) {
    esbuildOptions.loader = {
      ...esbuildOptions.loader,
      '.css': 'file',
    }
    esbuildOptions.external = ['react-multi-carousel', 'react-multi-carousel/lib/styles.css']
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
    'react-multi-carousel',
    'react-multi-carousel/lib/styles.css',
  ],
  format: ['esm', 'cjs'],
  minify: false,
  outDir: 'dist',
  sourcemap: true,
  splitting: true,
  treeshake: false,
  tsconfig: 'tsconfig.build.json',
}))
