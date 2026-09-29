import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'astro/no-set-html-directive': 'off',
    },
  },
  {
    files: ['src/components/seo/Analytics.astro'],
    rules: {
      'no-var': 'off',
      'prefer-rest-params': 'off',
      'prefer-spread': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '.astro/'],
  },
];
