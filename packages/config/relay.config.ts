module.exports = {
  src: './',
  schema: './schema.graphql',
  exclude: [
    '**/.next/**',
    '**/node_modules/**',
    '**/__generated__/**',
    '**/.app-templates/**',
    '**/cypress/**',
    '**/dist/**',
  ],
  language: 'typescript',
  artifactDirectory: './__generated__',
}
