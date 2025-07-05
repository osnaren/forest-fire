import { FlatCompat } from '@eslint/eslintrc';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { plugins: { 'jsx-a11y': jsxA11y } },
  ...compat.extends('next/core-web-vitals', 'plugin:jsx-a11y/recommended', 'prettier'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      ...jsxA11y.configs.recommended.rules,
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    ignores: ['node_modules', '.next', 'out', 'public', 'components/ui', 'components/magicui'],
  },
];

export default eslintConfig;
