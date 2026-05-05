---
title: "Teacher Exam - AI Exam Sheet Generator"
slug: "teacher-exam"
description: "A full-stack exam generation platform for Indonesian elementary teachers, turning one topic prompt into print-ready A4 exam sheets with answer keys, explanations, curriculum grounding, and review workflows."
image: "https://opengraph.githubassets.com/portfolio-2026-05-05/naufaldi/teacher-exam"
liveUrl: "https://ujian-sekolah.faldi.xyz"
githubUrl: "https://github.com/naufaldi/teacher-exam"
techStack:
  [
    "React",
    "Vite",
    "TypeScript",
    "Hono",
    "Effect-TS",
    "Drizzle",
    "PostgreSQL",
    "better-auth",
    "Docker",
    "Caddy",
  ]
date: "2026-04-22"
---

## Overview

Teacher Exam is an AI-assisted exam sheet generator built for Indonesian elementary-school teachers. The app turns a compact teacher prompt, such as a grade level, subject, topic, and exam type, into a structured A4-ready assessment with mixed question types, an answer key, and teacher-facing explanations.

The goal is practical: reduce the hours teachers spend manually drafting exams while keeping the result aligned with classroom constraints, print workflows, and Indonesian curriculum language.

## Problem

Generic AI output can produce convincing questions, but it often misses the details teachers actually need:

- Curriculum alignment with Capaian Pembelajaran and Tujuan Pembelajaran.
- Vocabulary appropriate for elementary-school students.
- Balanced question types across a full exam sheet.
- Consistent answer keys and explanations.
- A print preview that matches the final PDF.

Teacher Exam wraps the AI layer with product constraints, schemas, review states, and print-first UI so the output is closer to a usable teaching artifact than a free-form chat response.

## Technical Highlights

The platform is split into a web app, API, shared schemas, and database layer. React 19 and Vite power the teacher-facing interface, while Hono handles the API layer. Effect-TS is used for service boundaries and structured error handling, and Drizzle manages the PostgreSQL schema.

The generation flow uses schema-validated AI output so exam questions, answer keys, and explanations stay consistent between the backend, preview screen, and print route. The app also supports Google sign-in through better-auth, history workflows, duplicate-as-draft behavior, and print-ready previews.

## Stack

- **React 19 and Vite** for the SPA experience.
- **Hono** for a compact API service.
- **Effect-TS** for typed service composition and validation boundaries.
- **Drizzle and PostgreSQL** for persistence.
- **better-auth** for authentication.
- **Docker and Caddy** for VPS deployment and HTTPS routing.

## Outcome

Teacher Exam is a focused education tool for generating, reviewing, and printing classroom assessments. It demonstrates how AI features become more useful when wrapped in domain-specific constraints, strong schemas, and teacher-centered workflows.

## Links

- Live app: [https://ujian-sekolah.faldi.xyz](https://ujian-sekolah.faldi.xyz)
- GitHub repository: [https://github.com/naufaldi/teacher-exam](https://github.com/naufaldi/teacher-exam)
