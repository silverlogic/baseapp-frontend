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
        tsconfig: './tsconfig.jest.json',
      },
    ],
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/__mocks__/consoleMock.ts', '<rootDir>/__mocks__/fetchMock.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@testing-library|@baseapp-frontend)/)'],
  verbose: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
}
