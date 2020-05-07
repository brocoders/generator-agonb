module.exports = {
  extends: [
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
    "plugin:mocha/recommended",
  ],
  rules: {
    'semi': [2, "always"],
    'object-curly-spacing': ['error', 'always'],
    'mocha/no-mocha-arrows': 'off',
    'mocha/no-sibling-hooks': 'off',
    'cypress/no-assigning-return-values': 'warn',
    'cypress/no-unnecessary-waiting': 'warn',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
  },
  settings: {
    'import/resolver': {
      node: { paths: ['./src'], extensions: ['.js'] }
    },
  },
  plugins: [
    'cypress',
    'chai-friendly',
    'json-format',
  ],
  env: {
    'cypress/globals': true
  },
};
