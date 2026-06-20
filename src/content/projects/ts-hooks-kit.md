---
title: "ts-hooks-kit"
slug: "ts-hooks-kit"
description: "A production-ready React hooks library for React 18 and 19, offering typed, tree-shakeable hooks, documentation, examples, and a migration path from usehooks-ts."
image: "https://opengraph.githubassets.com/portfolio-2026-05-05/naufaldi/ts-hooks-kit"
liveUrl: "https://ts-hooks-kit.netlify.app"
githubUrl: "https://github.com/naufaldi/ts-hooks-kit"
techStack:
  [
    "TypeScript",
    "React",
    "tsdown",
    "Changesets",
    "TypeDoc",
    "GitHub Actions",
    "ESLint",
    "Prettier",
  ]
date: "2026-03-13"
---

## Overview

ts-hooks-kit is a typed React hooks library built for modern React applications. It provides a collection of production-ready hooks for React 18 and React 19, with zero runtime dependencies beyond React peer dependencies.

The project continues the spirit of usehooks-ts while adding updated compatibility, packaging, documentation, and migration support.

## Problem

React teams often copy hooks between projects or depend on libraries that lag behind current React versions. That creates small but persistent maintenance problems: inconsistent behavior, outdated types, unclear compatibility, and duplicated utility code.

ts-hooks-kit packages those patterns into a maintained library with a clear API surface:

- State hooks such as counters, toggles, disclosure, queues, sets, and maps.
- Storage hooks for localStorage and sessionStorage.
- Browser and DOM hooks for media queries, events, hover, resize, clipboard, and geolocation.
- Timing and lifecycle hooks for debounce, throttle, intervals, update effects, and client checks.
- Data hooks such as async helpers and pagination.

## Technical Highlights

The library is designed for typed consumption and modern bundlers. Hooks are tree-shakeable, documented, and published as a package that can be imported selectively.

The repository includes documentation, examples, compatibility notes, and a codemod-style migration path from usehooks-ts imports. Tooling such as Changesets, TypeDoc, ESLint, Prettier, and GitHub Actions supports maintainable releases.

## Stack

- **TypeScript** for strongly typed hooks and public APIs.
- **React 18 and 19** compatibility.
- **tsdown** for package builds.
- **Changesets** for release management.
- **TypeDoc** for API documentation.
- **GitHub Actions** for CI.

## Outcome

ts-hooks-kit turns repeated frontend utility patterns into a reusable package. It is both a practical library and an exercise in maintaining a small open-source package with compatibility, documentation, and release discipline.

## Links

- Documentation: [https://ts-hooks-kit.netlify.app](https://ts-hooks-kit.netlify.app)
- Package: [https://www.npmjs.com/package/@ts-hooks-kit/core](https://www.npmjs.com/package/@ts-hooks-kit/core)
- GitHub repository: [https://github.com/naufaldi/ts-hooks-kit](https://github.com/naufaldi/ts-hooks-kit)
