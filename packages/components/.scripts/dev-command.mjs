import chalk from 'chalk'
import chokidar from 'chokidar'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  cancelCurrentBuild,
  getConsumerAppBasePath,
  updateConsumerRsync,
  waitForReadyFile,
} from '../../../.scripts/command-utils.mjs'
import { runBuild } from './build.mjs'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(currentDir, '..')

const commandTag = '[@baseapp-frontend/components]'

let isBuilding = false
let needsRebuild = false
let buildTimeout = null
let currentBuildProcesses = []

const runWatchBuild = async () => {
  if (isBuilding) {
    needsRebuild = true
    await cancelCurrentBuild({ currentBuildProcesses, commandTag })
    return
  }

  isBuilding = true

  try {
    const consumerAppPath = getConsumerAppBasePath()

    const designSystemPath = path.join(rootDir, '..', 'design-system')
    const readyFileParentPath = path.join(designSystemPath, 'dist')
    await waitForReadyFile({ readyFileParentPath, commandTag })

    await runBuild(currentBuildProcesses)

    await updateConsumerRsync({
      consumerAppPath,
      sourceDist: path.join(rootDir, 'dist/'),
      packageName: 'components',
      commandTag,
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

const watchRegex = /^modules\/(?:.*\/)?(common|web|native)\/.*$/

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
