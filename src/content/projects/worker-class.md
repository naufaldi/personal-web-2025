---
title: "Worker Class - International Workers' Day Countdown"
slug: "worker-class"
description: "A cinematic single-page countdown for International Workers' Day 2026, combining a full-screen visual treatment, animated countdown state, Three.js particles, GSAP motion, and music controls."
image: "https://opengraph.githubassets.com/portfolio-2026-05-05/naufaldi/worker-class"
githubUrl: "https://github.com/naufaldi/worker-class"
techStack: ["HTML", "CSS", "JavaScript", "Three.js", "GSAP"]
date: "2026-04-14"
---

## Overview

Worker Class is a focused single-page web experience for International Workers' Day on May 1, 2026. It turns a static commemorative landing page into a full-screen countdown with image-driven atmosphere, kinetic typography, and lightweight interactive effects.

The project is small by design. It is a self-contained experiment in building a polished event countdown without introducing a framework or a larger application structure.

## Problem

Countdown pages are often treated as throwaway widgets. This project explores how much visual weight and mood can be created with a single HTML entrypoint, careful typography, layered imagery, and animation timing.

The page centers on a few clear jobs:

- Show a live countdown to May 1, 2026.
- Keep the message readable on top of a full-screen background image.
- Add depth with a canvas layer and motion effects.
- Provide a music toggle without crowding the main composition.

## Technical Highlights

The implementation uses plain HTML, CSS, and JavaScript. Three.js powers the background canvas layer, while GSAP handles motion timing for the page elements. The design uses display typography, a full-viewport layout, and responsive `clamp()` sizing so the countdown remains legible across screen sizes.

Because the app is static, it can be hosted as a simple public page. That makes it useful for short-lived event pages, campaign pages, or visual experiments where deployment speed matters more than application architecture.

## Stack

- **HTML and CSS** for the static page structure and responsive layout.
- **JavaScript** for countdown state and interaction.
- **Three.js** for the canvas visual layer.
- **GSAP** for animation timing.
- **Static assets** for the hero image and audio experience.

## Outcome

Worker Class demonstrates a compact way to build an expressive commemorative page. It keeps the implementation intentionally lean while still giving the page a strong visual identity and interactive rhythm.

## Links

- GitHub repository: [https://github.com/naufaldi/worker-class](https://github.com/naufaldi/worker-class)
