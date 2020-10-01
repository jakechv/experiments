module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": "error",
    "no-eval": "error",
    "import/first": "error",
    "@typescript-eslint/ban-ts-comment": 1,
    "react/jsx-no-comment-textnodes": 1,
    "react/prop-types": 1,
  },
}
