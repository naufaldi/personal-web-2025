---
title: "Prettier Configuration for Consistent Code Formatting"
slug: "prettier-config"
tags: ["prettier", "code-formatting", "javascript"]
date: "2024-01-17"
---

# Prettier Configuration for Consistent Code Formatting

Prettier is an opinionated code formatter that enforces a consistent style across your codebase.

## Sample `.prettierrc` Configuration

```json
{
  "printWidth": 80,
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "endOfLine": "auto"
}
```

## Configuration Options

- **printWidth**: Maximum line length (default: 80)
- **singleQuote**: Use single quotes instead of double quotes
- **semi**: Add semicolons at the end of statements
- **tabWidth**: Number of spaces per indentation level
- **trailingComma**: Print trailing commas wherever possible
- **endOfLine**: Line ending style (lf, crlf, cr, auto)

## Integration with ESLint

To integrate Prettier with ESLint, install:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

Then update your `.eslintrc.json`:

```json
{
  "extends": ["plugin:prettier/recommended"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

Place this configuration in a `.prettierrc` file at the root of your project.

