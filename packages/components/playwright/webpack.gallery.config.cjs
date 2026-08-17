/**
 * Serves the Playwright component-testing gallery from this package's existing
 * webpack pipeline, so stories inherit `babel-plugin-relay`, the
 * react-native/expo aliases, the `next/font` mock and postcss/tailwind exactly
 * as the Cypress component runner and Storybook already do.
 *
 * CommonJS on purpose: `../webpack.config.ts` mixes `require()` with
 * `export default`, so it cannot be loaded through webpack-cli's ESM/ts-node
 * path. Registering ts-node in CommonJS mode here keeps a single source of
 * truth for the bundler settings instead of duplicating them.
 */
const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

require('ts-node').register({
  // DOCS: the package tsconfig uses `moduleResolution: bundler`, which is
  // incompatible with `module: commonjs` — override both for this loader only.
  compilerOptions: { module: 'commonjs', moduleResolution: 'node' },
  transpileOnly: true,
})

const baseConfig = require('../webpack.config.ts').default

module.exports = {
  ...baseConfig,
  entry: path.resolve(__dirname, './gallery/main.tsx'),
  output: {
    path: path.resolve(__dirname, './gallery/dist'),
    publicPath: '/',
    filename: 'gallery.[contenthash].js',
  },
  plugins: [
    ...(baseConfig.plugins ?? []),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './gallery/index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    port: 3100,
    host: '127.0.0.1',
    compress: true,
    hot: false,
  },
}
