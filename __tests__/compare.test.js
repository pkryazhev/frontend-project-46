import { compare } from '../src/parser.js'
import { test, expect } from '@jest/globals'
import genDiff from '../src/index.js'
import { expectedJson } from './__fixtures__/expected.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('compare check', () => {
  const object1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  }
  const object2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  }
  const result = [{ key: 'follow', type: 'removed', value: false }, { key: 'host', type: 'unchanged', value: 'hexlet.io' }, { key: 'proxy', type: 'removed', value: '123.234.53.22' }, { key: 'timeout', newValue: 20, oldValue: 50, type: 'changed' }, { key: 'verbose', type: 'added', value: true }]
  expect(compare(object1, object2)).toEqual(result)
})

test('plain format check', () => {
  const result = genDiff(path.join(__dirname, '__fixtures__', 'file1.json'), path.join(__dirname, '__fixtures__', 'file2.json'), 'plain')
  const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`
  expect(result).toEqual(expected)
})

test('yaml files check', () => {
  const actual = genDiff(path.join(__dirname, '__fixtures__', 'file3.yml'), path.join(__dirname, '__fixtures__', 'file4.yaml'))
  expect(actual).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}')
})

test('stylish format check', () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const actual = genDiff(path.join(__dirname, '__fixtures__', 'file5.json'), path.join(__dirname, '__fixtures__', 'file6.json'))
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`
  expect(actual).toEqual(expected)
})

test('json format check', () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const actual = genDiff(path.join(__dirname, '__fixtures__', 'file5.json'), path.join(__dirname, '__fixtures__', 'file6.json'), 'json')
  const expected = JSON.stringify(expectedJson, null, 2)
  expect(actual).toEqual(expected)
})
