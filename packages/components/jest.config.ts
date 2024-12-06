const jestConfigs = require('@baseapp-frontend/test/jest.config.ts')

module.exports = {
  ...jestConfigs,
  setupFilesAfterEnv: [
    ...(jestConfigs.setupFilesAfterEnv ?? []),
    '<rootDir>/jest/__mocks__/graphqlWsMock.ts',
  ],
}
