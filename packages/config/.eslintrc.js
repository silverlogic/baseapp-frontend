module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    '.eslintrc.js',
    'cypress.config.ts',
    'jest.config.js',
    'jest.config.ts',
    '**/__mocks__/**',
    'next.config.js',
    'postcss.config.js',
    'tailwind.config.js',
    'relay.config.js',
    '**/mockServiceWorker.js',
  ],
  extends: [
    'next',
    'airbnb',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', '@emotion', '@baseapp-frontend'],
  rules: {
    'global-require': 0,
    '@emotion/jsx-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
    'react/require-default-props': 'warn',
    '@typescript-eslint/return-await': 'warn',
    'import/prefer-default-export': 0,
    'react/display-name': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@baseapp-frontend/no-process-env-comparison': 'error',
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
