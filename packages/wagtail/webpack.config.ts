import webpack from 'webpack'
import type { Configuration } from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

const path = require('path')

const devServer: DevServerConfiguration = {
  port: 3001,
  compress: true,
  hot: true,
}

const config: Configuration = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'expo-constants': require.resolve('./__mocks__/expo-constants.ts'),
      'expo-modules-core': require.resolve('./__mocks__/expo-modules-core.ts'),
      'expo-secure-store': require.resolve('./__mocks__/expo-secure-store.ts'),
      'react-native': require.resolve('./__mocks__/react-native.ts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /next\/font\/google/,
      path.resolve(__dirname, './__mocks__/next-font.ts'),
    ),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NEXT_PUBLIC_APP_BASE_URL: 'http://localhost:3000',
        NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8000/v1',
        NEXT_PUBLIC_RELAY_ENDPOINT: 'http://localhost:8000/graphql',
        NEXT_PUBLIC_WS_RELAY_ENDPOINT: 'ws://localhost:8000/graphql',
      }),
    }),
  ],
  devServer,
}

export default config
