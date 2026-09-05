---
title: "A filter can hide valid data"
slug: "a-filter-can-hide-valid-data"
description: "A class 2 worksheet existed, but the filter only offered classes 5 and 6. Here is how I traced the mismatch."
category: "Technical writer"
author:
  name: "Naufaldi Rafif Satriya"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: "2026-09-05"
---

I opened Teacher Exam's public bank and found a small mismatch: a class 2 worksheet was listed, but the grade filter only offered classes 5 and 6.

The data was visible. The interface still made that data harder to find.

## Start from the mismatch

I traced the public bank to a shared toolbar. Its grade options were a hardcoded list. The application's grade schema already supported classes 1–6.

The fix was to derive the options from that schema. I did not need a new endpoint or a database migration. The frontend was carrying an older version of the domain rules.

## Test the user action

The regression selects class 2 and checks the API request receives a numeric grade of 2. It then resets the filter and checks that the request no longer contains a grade.

Before the fix, the test failed because option 2 did not exist. After the fix, the selected public-bank, review, and preview suite passed 96 tests in a serial run.

That evidence is scoped. The API calls in those component tests are mocked, and the tests do not tell me whether a teacher can produce an acceptable exam.

## Keep technical checks separate from user feedback

I also prepared a pilot for 3–5 teachers. It asks them to review a worksheet, try the print flow, and describe their largest obstacle. It has no published participant results yet.

I can explain the filter defect from code and browser evidence. I cannot claim it was the most common teacher complaint, because I have not gathered that feedback.

[Read the case study](/projects/teacher-exam), [try the pilot](/pilot/teacher-exam/), or [inspect the workflow check](/evidence/teacher-exam/workflow-checks.txt).

## What I take from this

A shared type only helps when the interface actually uses it. Lists copied into UI components can drift even while the backend remains correct.

For me, the useful habit is to follow one visible inconsistency across the boundary: what does the screen allow, what does the request send, and what does the data model support?
