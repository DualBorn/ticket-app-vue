import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: globals.browser
    },
    plugins: {
      '@typescript-eslint': typescript,
      vue: vuePlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...vuePlugin.configs['vue3-recommended'].rules,
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-unused-vars': 'off'
    }
  },
  {
    ignores: ['dist', 'node_modules', '.vite']
  }
];

