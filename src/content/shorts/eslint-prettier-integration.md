---
title: "Integrating ESLint with Prettier"
slug: "eslint-prettier-integration"
tags: ["eslint", "prettier", "code-quality"]
date: "2024-01-21"
---

# Integrating ESLint with Prettier

Integrate ESLint with Prettier to maintain code consistency and avoid conflicts.

## Installation

Install the necessary packages:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

## Configuration

Update your `.eslintrc.json`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## Prettier Configuration

Create a `.prettierrc` file:

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

## How It Works

- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule
- **plugin:prettier/recommended**: Enables both configs together

## Benefits

- **Consistent formatting**: All code follows the same style
- **No conflicts**: ESLint and Prettier work together seamlessly
- **Automated**: Format on save with your editor
- **CI/CD integration**: Catch formatting issues in your pipeline

This setup ensures that Prettier's formatting rules are enforced as ESLint errors.

