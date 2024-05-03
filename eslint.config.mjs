import eslintJsPlugin from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

const files = ['**/*.ts'];
const ignores = [
  'package-lock.json',
  'playwright-report/**',
  'test-results/**',
];

export default [
  // global config, applied to all configurations
  {
    files,
    ignores,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
      globals: {
        ...globals.node,
      },
    },
  },
  // recommended js/ts config with overridden rules
  eslintJsPlugin.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },
  // configs for plugins with overridden rules
  {
    plugins: {
      typescriptEslintPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs['eslint-recommended'].rules,
      'typescriptEslintPlugin/explicit-function-return-type': 'error',
      'typescriptEslintPlugin/no-unused-vars': 'error',
    },
  },
  {
    plugins: { playwright },
    rules: {
      ...playwright.configs.recommended.rules,
      'playwright/no-nested-step': 'off',
    },
  },
  {
    plugins: { prettier },
    rules: {
      ...prettier.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      'no-console': 'warn',
      'prettier/prettier': 'warn',
    },
  },
];
