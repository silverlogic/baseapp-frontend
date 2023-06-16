module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        diagnostics: {
          exclude: ['**'],
        },
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/__mocks__/consoleMock.ts',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@testing-library|@baseapp-frontend)/)'],
  verbose: true,
}
