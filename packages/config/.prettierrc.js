module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  printWidth: 100,
  importOrder: ['^react$', '^@baseapp-frontend/(.*)$', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'), // must be loaded last
  ],
}
