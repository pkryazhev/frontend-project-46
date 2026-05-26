import { compare } from '../src/parser.js'
import { test, expect } from '@jest/globals'

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
  const result = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}'
  expect(compare(object1, object2)).toBe(result)
})
