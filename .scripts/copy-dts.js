const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const mkdir = promisify(fs.mkdir)
const copyFile = promisify(fs.copyFile)
const readdir = promisify(fs.readdir)

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(res)
    } else {
      yield res
    }
  }
}

async function copyDTS() {
  const declarationsDir = path.join(process.cwd(), 'tmp-dts')
  const distDir = path.join(process.cwd(), 'dist')
  
  for await (const filePath of walk(declarationsDir)) {
    if (filePath.endsWith('.d.ts')) {
      // Convert: tmp-dts/modules/.../file.d.ts → dist/.../file.d.ts
      const relativePath = path.relative(declarationsDir, filePath)
      const destPath = path.join(
        distDir, 
        relativePath.replace(/^modules\//, '')
      )
      
      await mkdir(path.dirname(destPath), { recursive: true })
      await copyFile(filePath, destPath)
    }
  }
  console.log('Declaration files copied. 😉')
}

copyDTS().catch(console.error)