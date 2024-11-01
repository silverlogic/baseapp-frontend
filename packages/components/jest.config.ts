const jestConfigs = require('@baseapp-frontend/test/jest.config.ts')

module.exports = {
  ...jestConfigs,
  testMatch: [...(jestConfigs.testMatch ?? []), '<rootDir>/**/*.(spec|test).(ts|tsx)'],
  setupFilesAfterEnv: [
    ...(jestConfigs.setupFilesAfterEnv ?? []),
    '<rootDir>/__mocks__/graphqlWsMock.ts',
  ],
  // Only one transform can be applied to the tests files.
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // This is to ignore the mocks folders from cypress and storybook.
  modulePathIgnorePatterns: [
    ...(jestConfigs.modulePathIgnorePatterns ?? []),
    '<rootDir>/(?!.*\\.(spec|test)\\.(ts|tsx)$).*__mocks__',
  ],
}
