module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@babel/eslint-parser', // Handles root JavaScript files (metro.config, babel.config, etc.)
  env: {
    'react-native/react-native': true,
    es2021: true,
    node: true,
  },
  plugins: ['react', 'react-native', 'import', 'prettier', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    // ============================================
    // IMPORT ORGANIZATION RULES
    // ============================================
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'react/**', group: 'external', position: 'before' },
          { pattern: 'react-native', group: 'external', position: 'before' },
          { pattern: '@react-native/**', group: 'external', position: 'before' },
          { pattern: 'react-native-*', group: 'external', position: 'before' },
          { pattern: '@app/**', group: 'internal', position: 'after' },
          { pattern: '@components/**', group: 'internal', position: 'after' },
          { pattern: '@screens/**', group: 'internal', position: 'after' },
          { pattern: '@utils/**', group: 'internal', position: 'after' },
          { pattern: '@hooks/**', group: 'internal', position: 'after' },
          { pattern: '@services/**', group: 'internal', position: 'after' },
          { pattern: '@constants/**', group: 'internal', position: 'after' },
          { pattern: '@styles/**', group: 'internal', position: 'after' },
          { pattern: '@types/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        distinctGroup: true,
        warnOnUnassignedImports: false,
      },
    ],

    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-unresolved': ['error', { ignore: ['react-native'] }],
    'import/no-cycle': 'warn',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

    // ============================================
    // REACT & REACT NATIVE RULES
    // ============================================
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/jsx-uses-react': 'off', // Not needed in React 17+
    'react/jsx-uses-vars': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'warn',

    // ============================================
    // CODE QUALITY RULES
    // ============================================
    'prettier/prettier': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'object-shorthand': 'error',

    // ============================================
    // NAMING CONVENTIONS
    // ============================================
    camelcase: [
      'warn',
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],
  },

  overrides: [
    {
      // Targeting only TypeScript files ensures Babel handles JS and TypeScript-ESLint handles TS
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser', // ✅ Uses the updated parser
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'], // ✅ Safely loads the plugin since it's now installed
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/explicit-function-return-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};
