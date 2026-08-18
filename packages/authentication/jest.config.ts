module.exports = {
  ...require('@baseapp-frontend/test/jest.config.ts'),
  // `.vitest.test.*` belong to the Vitest comparison lane — Jest ignores them.
  testPathIgnorePatterns: ['/node_modules/', '\\.vitest\\.test\\.'],
}
