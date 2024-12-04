const jestConfigs = require('@baseapp-frontend/test/jest.config.ts')

module.exports = {
  ...jestConfigs,
  testMatch: [...(jestConfigs.testMatch ?? []), '<rootDir>/**/*.(spec|test).(ts|tsx)'],
}
