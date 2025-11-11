---
title: "Tailwind CSS Quick Tips and Snippets"
slug: "tailwind-css-tips"
tags: ["tailwind-css", "styling", "css"]
date: "2024-01-24"
---

# Tailwind CSS Quick Tips and Snippets

Quick reference for common Tailwind CSS patterns and utilities.

## Responsive Design

Use responsive prefixes for mobile-first design:

```html
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text sizing
</div>
```

## Hover and Focus States

```html
<button class="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
  Interactive button
</button>
```

## Flexbox Patterns

```html
<!-- Centered content -->
<div class="flex items-center justify-center h-screen">
  Centered content
</div>

<!-- Space between -->
<div class="flex justify-between items-center">
  <div>Left</div>
  <div>Right</div>
</div>
```

## Grid Layouts

```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Custom Utilities

Add custom utilities in your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
    },
  },
};
```

## Dark Mode

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Dark mode support
</div>
```

## Common Patterns

- **Card**: `bg-white rounded-lg shadow-md p-6`
- **Button**: `px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`
- **Input**: `border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2`

These patterns help you build consistent UIs quickly with Tailwind CSS.

