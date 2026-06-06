import path from 'node:path'
import { readFileSync } from 'node:fs'
import { parse } from 'yaml'

export const getFilePath = (filepath) => {
  return [path.resolve(filepath), path.extname(filepath)]
}

export const parseFile = function (path, ext) {
  const fileData = readFileSync(path, 'utf-8')
  switch (ext) {
    case '.json':
      return JSON.parse(fileData)
    case '.yml':
    case '.yaml':
      return parse(fileData)
    default:
      throw new Error('Unknown format')
  }
}
