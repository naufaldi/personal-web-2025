---
title: "ESLint Configuration for TypeScript Projects"
slug: "typescript-eslint-config"
tags: ["eslint", "typescript", "linting"]
date: "2024-01-23"
---

# ESLint Configuration for TypeScript Projects

Configure ESLint for TypeScript to catch type errors and enforce coding standards.

## Installation

Install the necessary packages:

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

## Basic Configuration

Create an `.eslintrc.js` file:

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
```

## Type-Aware Rules

Enable type-aware linting for better type checking:

```javascript
{
  "extends": [
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

## Common Rules

- **@typescript-eslint/no-explicit-any**: Warns against using `any` type
- **@typescript-eslint/explicit-function-return-type**: Requires explicit return types
- **@typescript-eslint/no-unused-vars**: Catches unused variables
- **@typescript-eslint/prefer-const**: Prefers `const` over `let`

## Integration with Prettier

Combine with Prettier for formatting:

```bash
npm install --save-dev eslint-config-prettier
```

```javascript
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ]
}
```

This configuration helps maintain code quality and catch TypeScript-specific issues.

