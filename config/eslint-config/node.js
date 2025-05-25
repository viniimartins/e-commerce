/** @type { import('eslint').Linter.Config } */

module.exports = {
  extends: ['@rocketseat/eslint-config/node'],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'simple-import-sort/imports': 'error',
    'no-useless-constructor': 'off',
  },
}
