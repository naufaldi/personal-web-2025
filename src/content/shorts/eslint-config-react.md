---
title: "ESLint Configuration for React Projects"
slug: "eslint-config-react"
tags: ["eslint", "react", "linting"]
date: "2024-01-18"
---

# ESLint Configuration for React Projects

ESLint helps identify and fix problems in your JavaScript code.

## Sample `.eslintrc.js` Configuration

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

## Key Configuration Options

- **env**: Specifies the environments your code is designed to run in
- **extends**: Inherits configurations from recommended ESLint and React rules
- **parserOptions**: Specifies the JavaScript language options
- **plugins**: Adds support for React-specific linting rules
- **rules**: Customizes individual linting rules

## Installation

Ensure you have the necessary dependencies installed:

```bash
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks
```

Place this configuration in a `.eslintrc.js` file at the root of your project.

