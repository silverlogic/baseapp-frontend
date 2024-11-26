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

const replaceCatalogDependencies = (packageJsonPath, rootCatalog, catalogs) => {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent)

  ;['dependencies', 'devDependencies', 'peerDependencies', 'resolutions'].forEach(
    (dependencyType) => {
      if (packageJson[dependencyType]) {
        Object.keys(packageJson[dependencyType]).forEach((dependency) => {
          const version = packageJson[dependencyType][dependency]
          if (version.startsWith('catalog:')) {
            const catalogName = version.split(':')[1]

            let resolvedVersion =
              rootCatalog[dependency] ||
              (catalogs[catalogName] && catalogs[catalogName][dependency])

            if (resolvedVersion) {
              packageJson[dependencyType][dependency] = resolvedVersion
            } else {
              console.warn(
                `Could not find a matching version for ${dependency} in catalog "${catalogName}" or root catalog.`,
              )
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
      replaceCatalogDependencies(packageJsonPath, rootCatalog, catalogs)
    }
  })
}

const selectedPackages = process.argv.slice(2)
updatePackagesDependencies(selectedPackages)
console.log(
  'Catalog dependencies have been replaced successfully. Be sure to double-check the changes made. 😉',
)

console.log('Regenerating pnpm-lock.yaml...')
try {
  execSync('pnpm install --lockfile-only', { stdio: 'inherit', cwd: rootDir })
  console.log('pnpm-lock.yaml has been successfully regenerated.')
} catch (error) {
  console.error('An error occurred while regenerating pnpm-lock.yaml:', error)
}

console.log(
  'The catalog replacements are temporary and intended only for local development or use with GitHub sources.',
)
console.warn('Remember to revert these changes before merging any commits to this repository.')
