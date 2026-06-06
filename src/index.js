import { formatData } from './formatters/format.js'
import { getFilePath, parseFile } from './file.js'
import { compare } from './parser.js'

const genDiff = (filepath1, filepath2, format) => {
  const [path1, ext1] = getFilePath(filepath1)
  const [path2, ext2] = getFilePath(filepath2)
  const fileData1 = parseFile(path1, ext1)
  const fileData2 = parseFile(path2, ext2)
  const data = compare(fileData1, fileData2)
  return formatData(data, format)
}

export default genDiff
