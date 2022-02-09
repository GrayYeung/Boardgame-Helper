import fs from 'fs'

export const readFileLines = (filePath: string): string[] | undefined => {
  console.log('filePath::', filePath)

  try {
    return fs.readFileSync(filePath).toString('utf8').split('\n')
  } catch (e) {
    console.error(e)
  }
}
