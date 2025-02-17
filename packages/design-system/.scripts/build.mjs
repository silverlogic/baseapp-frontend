import chalk from 'chalk'
import { execa } from 'execa'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const commandTag = '[@baseapp-frontend/design-system]'

export const runBuild = async (currentBuildProcesses = []) => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url))
  const rootDir = path.join(currentDir, '..')
  const readyFilePath = path.join(rootDir, 'dist', 'build.ready')

  console.log(`${chalk.magenta(`${commandTag} Starting build process...`)}`)

  try {
    await Promise.all([
      (async () => {
        console.log(chalk.yellow(`${commandTag} Running tsup bundling...`))
        const tsupProc = execa('pnpm', ['tsup:bundle', '--silent'], { preferLocal: true })
        currentBuildProcesses?.push(tsupProc)
        await tsupProc
        console.log(chalk.yellow(`${commandTag} Bundling completed.`))
      })(),
      (async () => {
        console.log(chalk.blue(`${commandTag} Running type declaration generation...`))
        const tscProc = execa('pnpm', ['tsc:declaration'], { preferLocal: true })
        currentBuildProcesses?.push(tscProc)
        await tscProc
        console.log(chalk.blue(`${commandTag} Type declarations generated.`))

        console.log(chalk.cyan(`${commandTag} Copying DTS files...`))
        const copyProc = execa('pnpm', ['copy:dts'], { preferLocal: true })
        currentBuildProcesses?.push(copyProc)
        await copyProc
        console.log(chalk.cyan(`${commandTag} DTS files copied.`))
      })(),
    ])

    console.log(chalk.hex('#c86c2c')(`${commandTag} Cleaning temporary files...`))
    const cleanProc = execa('pnpm', ['clean:tmp'], { preferLocal: true })
    currentBuildProcesses?.push(cleanProc)
    await cleanProc
    console.log(chalk.hex('#c86c2c')(`${commandTag} Temporary files cleaned.`))

    await fs.writeFile(readyFilePath, 'ready', 'utf8')
    console.log(chalk.green(`${commandTag} Build completed successfully.`))
  } catch (error) {
    if (error.signal !== 'SIGTERM') {
      console.error(chalk.red(`${commandTag} Build failed:`))
      console.error(chalk.red(error.stderr || error.message))
    }
    throw error
  } finally {
    currentBuildProcesses = []
  }
}
