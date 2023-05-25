const withTM = require('next-transpile-modules')([
  '@baseapp-frontend/core',
  '@baseapp-frontend/config',
  '@baseapp-frontend/design-system-mui',
  '@baseapp-frontend/tsconfig',
])

module.exports = withTM({
  reactStrictMode: true,
})
