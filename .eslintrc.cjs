module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off'
  },
  overrides: [
    {
      files: ['frontend/**/*.{ts,tsx}'],
      env: { browser: true, node: false },
      extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
      parserOptions: { ecmaFeatures: { jsx: true } },
    }
  ]
}
