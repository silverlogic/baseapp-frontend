import chalk from "chalk"
import chokidar from "chokidar"
import { execa } from "execa"
import fs from "fs/promises"
import path from "path"

export const cancelCurrentBuild = async ({
  currentBuildProcesses,
  commandTag,
}) => {
  console.log(chalk.red(`${commandTag} Canceling current build processes...`))
  for (const proc of currentBuildProcesses) {
    try {
      proc.kill()
    } catch (err) {
      console.error(
        chalk.red(
          `${commandTag} Error killing process ${proc.pid}: ${err.message}`
        )
      )
    }
  }
  await execa("pnpm", ["clean:tmp"], { preferLocal: true })
  currentBuildProcesses = []
}

export const getConsumerAppBasePath = () => {
  const consumerPath = process.env.BASEAPP_FRONTEND_TEMPLATE_PATH
  if (!consumerPath) {
    console.error(
      chalk.red(
        " Error: Please set the environment variable BASEAPP_FRONTEND_TEMPLATE_PATH in your shell startup (e.g., in ~/.bashrc or ~/.zshrc) before running this command.\n",
        "Example: export BASEAPP_FRONTEND_TEMPLATE_PATH=/path/to/the/baseapp-frontend-template\n",
        `Note: Don't forget to restart your terminal after setting the new environment variable.`
      )
    )

    process.exit(1)
  }
  return consumerPath
}

export const updateConsumerRsync = async ({
  consumerAppPath,
  sourceDist,
  packageName,
  commandTag,
}) => {
  const targetDist =
    path.join(
      consumerAppPath,
      "node_modules",
      "@baseapp-frontend",
      packageName,
      "dist"
    ) + "/"

  console.log(
    chalk.cyan(`${commandTag} Syncing dist folder to consumer app...`)
  )
  try {
    await execa(
      "rsync",
      ["-av", "--delete", "--delay-updates", sourceDist, targetDist],
      {
        shell: true,
      }
    )
    console.log(chalk.cyan(`${commandTag} Sync completed successfully.`))
  } catch (error) {
    console.error(chalk.red(`${commandTag} Sync failed:`))
    console.error(chalk.red(error.stderr || error.message))
  }
}

export const waitForReadyFile = async ({ readyFilePath, commandTag }) => {
  console.log(
    chalk.yellow(`${commandTag} Waiting for other packages to start...`)
  )
  try {
    await fs.access(readyFilePath)
    return
  } catch (err) {}

  return new Promise((resolve, reject) => {
    const watcher = chokidar.watch(readyFilePath, { ignoreInitial: true })
    watcher.on("add", () => {
      watcher.close()
      resolve()
    })
    watcher.on("error", (err) => {
      watcher.close()
      reject(err)
    })
  })
}
