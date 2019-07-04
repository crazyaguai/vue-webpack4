module.exports = {
  // parser: 'babel-eslint',
  extends: [
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    "indent": ["error", 2]
  }
}