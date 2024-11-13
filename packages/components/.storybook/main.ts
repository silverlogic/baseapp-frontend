import type { StorybookConfig } from '@storybook/react-webpack5'
import { dirname, join, resolve } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: [
    resolve(__dirname, './*.mdx'),
    resolve(__dirname, '../modules/**/__storybook__/*.mdx'),
    resolve(__dirname, '../../design-system/components/**/__storybook__/*.mdx'),
    resolve(__dirname, '../modules/**/__storybook__/stories.@(js|jsx|mjs|ts|tsx)'),
    resolve(
      __dirname,
      '../../design-system/components/**/__storybook__/stories.@(js|jsx|mjs|ts|tsx)',
    ),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  staticDirs: [resolve(__dirname, '../public')],
  addons: [
    '@storybook/addon-docs',
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
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
        events: require.resolve('../__mocks__/eventEmitterMock.ts'),
        'expo-secure-store': false,
        'react-native': false,
        'next/font/google': resolve(__dirname, './__mocks__/nextFontMock.ts'),
        'next/image': resolve(__dirname, './__mocks__/NextImageMock.tsx'),
      }
      config.resolve.modules = [resolve(__dirname, 'node_modules'), 'node_modules']
    }

    return config
  },
}
export default config
