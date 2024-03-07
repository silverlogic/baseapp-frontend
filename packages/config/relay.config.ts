module.exports = {
  src: './',
  schema: './schema.graphql',
  exclude: ['**/.next/**', '**/node_modules/**', '**/__generated__/**', '**/.app-templates/**'],
  language: 'typescript',
  artifactDirectory: './__generated__',
}
