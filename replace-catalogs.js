const fs = require('fs')
const path = require('path')
const YAML = require('yaml')
const { execSync } = require('child_process')

const workspaceConfigPath = path.resolve(__dirname, 'pnpm-workspace.yaml')

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

  ;['dependencies', 'devDependencies', 'peerDependencies', 'resolutions'].forEach((depType) => {
    if (packageJson[depType]) {
      Object.keys(packageJson[depType]).forEach((dep) => {
        const version = packageJson[depType][dep]
        if (version.startsWith('catalog:')) {
          const catalogName = version.split(':')[1]

          let resolvedVersion =
            rootCatalog[dep] || (catalogs[catalogName] && catalogs[catalogName][dep])

          if (resolvedVersion) {
            packageJson[depType][dep] = resolvedVersion
          } else {
            console.warn(
              `Could not find a matching version for ${dep} in catalog "${catalogName}" or root catalog.`,
            )
          }
        }
      })
    }
  })

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
}

const updatePackagesDependencies = () => {
  const { rootCatalog, catalogs } = loadWorkspaceCatalogs()
  const packagesPath = path.resolve(__dirname, 'packages')
  const packageFolders = fs.readdirSync(packagesPath)

  packageFolders.forEach((folder) => {
    const packageJsonPath = path.join(packagesPath, folder, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      replaceCatalogDependencies(packageJsonPath, rootCatalog, catalogs)
    }
  })
}

updatePackagesDependencies()
console.log(
  'Catalog dependencies have been replaced successfully. Be sure to double-check the changes made. 😉',
)

console.log('Regenerating pnpm-lock.yaml...');
try {
  execSync('pnpm install --lockfile-only', { stdio: 'inherit' })
  console.log('pnpm-lock.yaml has been successfully regenerated.')
} catch (error) {
  console.error('An error occurred while regenerating pnpm-lock.yaml:', error);
}

console.log(
  'The catalog replacements are temporary and intended only for local development or use with GitHub sources.',
)
console.warn('Remember to revert these changes before merging any commits to this repository.')
