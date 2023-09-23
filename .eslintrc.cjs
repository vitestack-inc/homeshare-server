module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
  ],
  "plugins": ["@typescript-eslint"],
  'overrides': [
    {
      files: ['**/*.ts', '**/*.tsx'], 
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs,ts}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
      'projext': './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    // no unused variable
    '@typescript-eslint/no-unused-expressions': 'error',
    // react in jsx / tsx off
    'react/react-in-jsx-scope': 'off',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'semi': ['error', 'always'],
    'no-extra-semi': 'off',
    '@typescript-eslint/semi': ['off', 'always'],
    '@typescript-eslint/no-var-requires': 'off',
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/strict-boolean-expressions": "off"
  },
};
