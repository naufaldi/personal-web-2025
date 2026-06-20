---
title: "FanGuard - macOS Fan Control"
slug: "mac-fan-ctrl"
description: "A native macOS fan control utility built with Tauri, Rust, and Svelte, providing temperature monitoring, fan-speed modes, presets, and thermal safety controls."
image: "https://opengraph.githubassets.com/portfolio-2026-05-05/naufaldi/mac-fan-ctrl"
liveUrl: "https://github.com/naufaldi/mac-fan-ctrl/releases"
githubUrl: "https://github.com/naufaldi/mac-fan-ctrl"
techStack: ["Tauri", "Rust", "Svelte", "TypeScript", "Vite", "Tailwind CSS"]
date: "2026-03-04"
---

## Overview

FanGuard is a native macOS fan control and temperature monitoring app. It combines a Rust backend through Tauri v2 with a Svelte 5 frontend, giving users a desktop interface for reading system temperatures and managing fan behavior.

The project targets the kind of utility that needs to feel native, responsive, and cautious because it touches hardware-level controls.

## Problem

Mac fan control tools need to balance power and safety. Users may want manual control, but the app still has to respect thermal limits, expose clear state, and avoid making hardware control feel mysterious.

FanGuard focuses on:

- Real-time temperature monitoring through SMC and IOKit sensors.
- Per-fan control modes such as automatic, constant RPM, and sensor-based curves.
- A menu bar tray with live CPU temperature.
- Presets for repeatable thermal profiles.
- Emergency thermal override behavior.
- Light and dark mode support through system appearance.

## Technical Highlights

The backend is written in Rust and uses macOS system interfaces to read sensor data and manage fan behavior. Tauri provides the bridge between native capabilities and the frontend, while Svelte handles the interactive UI.

The project also includes release-oriented work such as a downloadable DMG path, Homebrew cask support, unit tests, Playwright tests, and Biome checks. Because fan control can require elevated permissions, the app documents root-related behavior and safe launch expectations.

## Stack

- **Tauri v2** for the native app shell.
- **Rust** for system integration and backend logic.
- **Svelte 5 and TypeScript** for the interface.
- **Vite and Tailwind CSS** for frontend development.
- **Biome, Vitest, and Playwright** for quality checks.

## Outcome

FanGuard is a practical macOS systems utility and a deeper desktop-app experiment. It shows how Rust and Tauri can wrap hardware-adjacent functionality in a focused, user-facing app.

## Links

- Releases: [https://github.com/naufaldi/mac-fan-ctrl/releases](https://github.com/naufaldi/mac-fan-ctrl/releases)
- GitHub repository: [https://github.com/naufaldi/mac-fan-ctrl](https://github.com/naufaldi/mac-fan-ctrl)
