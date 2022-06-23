const withTM = require('next-transpile-modules')(['@baseapp-frontend/core'])

module.exports = withTM({
  reactStrictMode: true,
})
