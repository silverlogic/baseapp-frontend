import type { StorybookConfig } from '@storybook/react-webpack5'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: [
    resolve(__dirname, './*.mdx'),
    resolve(__dirname, '../modules/**/__storybook__/*.mdx'),
    resolve(__dirname, '../../design-system/components/**/__storybook__/*.mdx'),
    resolve(__dirname, '../../design-system/providers/**/__storybook__/*.mdx'),
    resolve(__dirname, '../modules/**/__storybook__/stories.@(js|jsx|mjs|ts|tsx)'),
    resolve(
      __dirname,
      '../../design-system/components/**/__storybook__/stories.@(js|jsx|mjs|ts|tsx)',
    ),
    resolve(
      __dirname,
      '../../design-system/providers/**/__storybook__/stories.@(js|jsx|mjs|ts|tsx)',
    ),
    // TODO compose wagtail stories here
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: [resolve(__dirname, '../public')],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
              {
                loader: 'postcss-loader',
                options: { implementation: require.resolve('postcss') },
              },
            ],
          },
        ],
      },
    },
  ],
  babel: async (options = {}) => {
    return {
      ...options,
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
      plugins: ['relay'],
    }
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'expo-constants': resolve(__dirname, '../__mocks__/expo-constants.ts'),
        'expo-modules-core': resolve(__dirname, '../__mocks__/expo-modules-core.ts'),
        'expo-secure-store': resolve(__dirname, '../__mocks__/expo-secure-store.ts'),
        'next/font/google': resolve(__dirname, '../__mocks__/next-font.ts'),
        'next/image': resolve(__dirname, './__mocks__/NextImage.tsx'),
        'react-native': resolve(__dirname, '../__mocks__/react-native.ts'),
        events: resolve(__dirname, '../__mocks__/events.ts'),
      }
      config.resolve.modules = [resolve(__dirname, 'node_modules'), 'node_modules']
    }

    return config
  },
}
export default config
