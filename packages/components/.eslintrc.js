const config = require('@baseapp-frontend/config/.eslintrc.js')

module.exports = {
  ...config,
  parserOptions: {
    ...(config.parserOptions || {}),
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
}
