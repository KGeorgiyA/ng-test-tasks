// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "td-list",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "td-list",
          style: "kebab-case",
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          "accessibility": "explicit",
          "overrides": {
            constructors: "no-public",
          }
        }
      ],
      'indent': ['error', 2],
      "semi": ["error", "always"],
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "never",
        "exports": "never",
        "functions": "never"
      }],
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs', {allowSingleLine: true}],
      'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0}],
      'keyword-spacing': ['error', {"before": true, "after": true}],
      'space-before-blocks': ['error', 'always'],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
