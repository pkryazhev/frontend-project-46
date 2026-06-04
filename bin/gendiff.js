import { program } from 'commander'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { compare, parseFile, format, plateFormat } from '../src/parser.js'

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.0.1')
  .action((filepath1, filepath2) => {
    const path1 = path.resolve(filepath1)
    const ext1 = path.extname(filepath1)
    const path2 = path.resolve(filepath2)
    const ext2 = path.extname(filepath2)
    const fileData1 = readFileSync(path1, 'utf-8')
    const fileData2 = readFileSync(path2, 'utf-8')
    const data = compare(parseFile(fileData1, ext1), parseFile(fileData2, ext2))
    console.log("\n" + plateFormat(data, []));
  })

program.parse()
