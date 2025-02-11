module.exports = {
  ...require('./.eslintrc.js'),
  plugins: [...require('./.eslintrc.js').plugins, 'import'],
  rules: {
    ...require('./.eslintrc.js').rules,
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: '**/common/**',
            from: '**/web/**',
            message: 'Files in `common/` cannot import from `web/`.',
          },
          {
            target: '**/common/**',
            from: '**/native/**',
            message: 'Files in `common/` cannot import from `native/`.',
          },

          {
            target: '**/web/**',
            from: '**/native/**',
            message: 'Files in` web/` cannot import from `native/`.',
          },
          {
            target: '/**/native/**',
            from: '**/web/**',
            message: 'Files in `native/` cannot import from `web/`.',
          },
        ],
      },
    ],
  },
}
