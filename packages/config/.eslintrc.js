module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'], // make sure prettier is last
  plugins: ['@emotion'],
  rules: {
    '@emotion/jsx-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
    '@typescript-eslint/no-var-requires': 0,
    'react/display-name': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
}
