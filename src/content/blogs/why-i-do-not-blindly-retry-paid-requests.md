---
title: "Why I do not blindly retry paid requests"
slug: "why-i-do-not-blindly-retry-paid-requests"
description: "A timeout leaves uncertainty. My Content Generator work made that distinction concrete."
category: "Technical writer"
author:
  name: "Naufaldi Rafif Satriya"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: "2026-09-05"
---

A timeout is easy to turn into a retry button. The harder question is what happened before the response disappeared.

In Content Generator, a request can reserve credits and call an AI provider before the result is saved. Repeating the request may repeat work that the provider already accepted.

## Follow the state, not just the error

I need to distinguish work that never started, work with a saved result, and work whose external result is unknown. Those states deserve different recovery behavior.

The implementation records durable job ownership and provider checkpoints. Recovery can reuse a completed checkpoint. An attempt token also prevents an old worker from saving a late response after a new worker takes ownership.

An in-memory error handler cannot provide that guarantee after its process stops. The recovery state has to survive outside the process.

## A rejection and an unknown result are different

An explicit rate-limit rejection can be retried within the operation deadline, using the provider's retry guidance. An uncertain paid request is recorded as uncertain rather than repeated automatically.

That means some failures need compensation instead of automatic completion. I accept that tradeoff because finishing a request is not the only goal. Accounting must also remain understandable.

## What I checked

The selected local suite passed 70 tests. It covers overlapping deliveries, expired ownership, saved result reuse, and recovery after losing an acknowledgement of a committed refund. The interruption tests reconstruct durable states. They do not kill a production Worker.

[Read the case study](/projects/content-generator) and [the sanitized evidence](/evidence/content-generator/README.txt).

## What I take from this

My frontend background makes me pay attention to the state a user sees. Full-stack work adds another question: what state will the next execution find?

I want to be able to explain both. The error message, the persisted record, and the recovery decision should describe the same operation.
