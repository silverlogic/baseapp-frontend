const fs = require('fs')
const path = require('path')
const YAML = require('yaml')
const { execSync } = require('child_process')

const scriptDir = path.resolve(__dirname)
const rootDir = path.resolve(scriptDir, '..')
const workspaceConfigPath = path.join(rootDir, 'pnpm-workspace.yaml')

const loadWorkspaceCatalogs = () => {
  const workspaceContent = fs.readFileSync(workspaceConfigPath, 'utf8')
  const workspaceConfig = YAML.parse(workspaceContent)
  const rootCatalog = workspaceConfig.catalog || {}
  const catalogs = workspaceConfig.catalogs || {}

  return { rootCatalog, catalogs }
}

const getCatalogNameForDependency = (dependency, catalogs) => {
  for (const [catalogName, catalogDeps] of Object.entries(catalogs)) {
    if (catalogDeps[dependency]) {
      return catalogName
    }
  }
  return null
}

const replaceVersionsWithCatalogs = (packageJsonPath, rootCatalog, catalogs) => {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent)

  ;['dependencies', 'devDependencies', 'peerDependencies', 'resolutions'].forEach(
    (dependencyType) => {
      if (packageJson[dependencyType]) {
        Object.keys(packageJson[dependencyType]).forEach((dependency) => {
          const version = packageJson[dependencyType][dependency]

          if (!version.startsWith('catalog:')) {
            let catalogVersion = null

            if (rootCatalog[dependency]) {
              catalogVersion = 'catalog:'
            } else {
              const catalogName = getCatalogNameForDependency(dependency, catalogs)
              if (catalogName) {
                catalogVersion = `catalog:${catalogName}`
              }
            }

            if (catalogVersion) {
              packageJson[dependencyType][dependency] = catalogVersion
            }
          }
        })
      }
    },
  )

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
}

const updatePackagesDependencies = (selectedPackages) => {
  const { rootCatalog, catalogs } = loadWorkspaceCatalogs()
  const packagesPath = path.join(rootDir, 'packages')
  const packageFolders = fs.readdirSync(packagesPath)

  const foldersToProcess =
    selectedPackages.length > 0
      ? packageFolders.filter((folder) => selectedPackages.includes(folder))
      : packageFolders

  foldersToProcess.forEach((folder) => {
    const packageJsonPath = path.join(packagesPath, folder, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      replaceVersionsWithCatalogs(packageJsonPath, rootCatalog, catalogs)
    }
  })
}

const selectedPackages = process.argv.slice(2)
updatePackagesDependencies(selectedPackages)
console.log(
  'Dependencies have been replaced with catalog references successfully. Be sure to double-check the changes made. 😉',
)

console.log('Regenerating pnpm-lock.yaml...')
try {
  execSync('pnpm install --lockfile-only', { stdio: 'inherit', cwd: rootDir })
  console.log('pnpm-lock.yaml has been successfully regenerated.')
} catch (error) {
  console.error('An error occurred while regenerating pnpm-lock.yaml:', error)
}

console.log(
  'The catalog references are now set. Remember to ensure these changes are appropriate before committing.',
)
