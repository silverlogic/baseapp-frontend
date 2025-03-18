import chalk from 'chalk'
import chokidar from 'chokidar'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  cancelCurrentBuild,
  cleanupReadyFile,
  getConsumerAppBasePath,
  updateConsumerRsync,
} from '../../../.scripts/command-utils.mjs'
import { runBuild } from './build.mjs'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(currentDir, '..')

const readyFilePath = path.join(rootDir, 'dist', 'build.ready')

const commandTag = '[@baseapp-frontend/design-system]'

let isBuilding = false
let needsRebuild = false
let buildTimeout = null
let currentBuildProcesses = []

process.on('SIGINT', async () => {
  const readyFilePath = path.join(rootDir, 'dist', 'build.ready')
  await cleanupReadyFile({ readyFilePath })
  if (buildTimeout) clearTimeout(buildTimeout)
  process.exit()
})

const runWatchBuild = async () => {
  await cleanupReadyFile({ readyFilePath })

  if (isBuilding) {
    needsRebuild = true
    await cancelCurrentBuild({ commandTag, currentBuildProcesses })
    return
  }

  isBuilding = true

  try {
    const consumerAppPath = getConsumerAppBasePath()

    await runBuild(currentBuildProcesses)

    await updateConsumerRsync({
      commandTag,
      consumerAppPath,
      packageName: 'design-system',
      sourceDist: path.join(rootDir, 'dist/'),
    })

    console.log(`${chalk.magenta(`${commandTag} Watching for file changes...`)}`)
  } catch (error) {
    if (error.signal !== 'SIGTERM') {
      console.error(chalk.red(`${commandTag} Build failed:`))
      console.error(chalk.red(error.stderr || error.message))
    }
  } finally {
    isBuilding = false
    currentBuildProcesses = []
    if (needsRebuild) {
      needsRebuild = false
      runWatchBuild()
    }
  }
}

const watchRegex = /^(components|hooks|layouts|providers|styles|utils)\/(common|web|native)(\/.*)?$/

const watcher = chokidar.watch(rootDir, {
  ignoreInitial: true,
  usePolling: true,
  interval: 100,
  awaitWriteFinish: {
    stabilityThreshold: 500,
    pollInterval: 100,
  },
  ignored: (filePath, stats) => {
    if (
      filePath.includes('node_modules') ||
      filePath.includes('dist') ||
      filePath.includes('tmp')
    ) {
      return true
    }
    if (stats && stats.isFile()) {
      const relative = path.relative(rootDir, filePath).replace(/\\/g, '/')
      if (!watchRegex.test(relative)) {
        return true
      }
    }
    return false
  },
})

watcher.on('all', (event, changedPath) => {
  const relativePath = path.relative(rootDir, changedPath).replace(/\\/g, '/')
  console.log(`${commandTag} Detected event "${event}" on: ${relativePath}`)
  if (buildTimeout) clearTimeout(buildTimeout)
  buildTimeout = setTimeout(runWatchBuild, 2000)
})

runWatchBuild()
