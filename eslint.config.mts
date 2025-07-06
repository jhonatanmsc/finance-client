import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

export default [
  { ignores: ['eslint.config.mjs'] },

  // Regras para JS e JSX
  {
    ...eslintPluginReact.configs.flat.recommended,
    ...eslintPluginReact.configs.flat['jsx-runtime'],
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },

  // Regras para TS e TSX
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      ...eslintPluginTypescript.configs.recommended.rules,
      // Regras adicionais opcionais:
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // Prettier no final
  eslintPluginPrettierRecommended,
]
