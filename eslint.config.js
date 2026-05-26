import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  js.configs.recommended,

  stylistic.configs['recommended'],

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
    },
  },
])
