module.exports = {
  src: './',
  schema: './schema.graphql',
  exclude: [
    '**/.next/**',
    '**/node_modules/**',
    '**/__generated__/**',
    '**/.app-templates/**',
    '**/cypress/**',
    '**/dist/**', // Exclude built artifacts
    '**/schema.graphql', // Exclude schemas
  ],
  language: 'typescript',
  artifactDirectory: './__generated__',
}
