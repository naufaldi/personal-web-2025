---
title: "Catching Up with AI"
slug: catching-up-with-ai
description: "Ever felt stuck in a project without clear direction? Working alone without a senior engineer to provide feedback or validate your work? Or being part of a team"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2025-04-19
image: "https://images.unsplash.com/photo-1743945968054-088cff86a63a?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;M3wxMTc3M3wwfDF8YWxsfDJ8fHx8fHx8fDE3NDUwMzYzMTZ8&amp;ixlib&#x3D;rb-4.0.3&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/catching-up-with-ai/"
---

Ever felt stuck in a project without clear direction? Working alone without a senior engineer to provide feedback or validate your work? Or being part of a team where the SDLC process feels chaotic, but you're hesitant to offer suggestions due to lack of experience?​

In the world of software engineering, such situations are not uncommon. Many of us face challenges like the absence of mentorship, unsupportive work environments, or pressure to deliver without adequate support.​

However, with the emergence of generative AI tools like ChatGPT, Claude, and Gemini, we now have new tools that can help us catch up and enhance our skills as software engineers.

## AI as a Buddy Engineer

![Image](https://blog.faldi.xyz/content/images/2025/04/image.png)

Imagine you're building a monorepo app—Next.js frontend, Hono backend API.  
You’re unsure whether to call the backend directly or proxy via a Next.js API route using TanStack Query. You second-guess every architecture choice. You need feedback—but there’s no one to ask.

Now AI steps in.

It reviews trade-offs, explains flow patterns, breaks down cache strategies, and even drafts API handlers with mock data. It’s not perfect—but it’s fast, patient, and relentless. You’re no longer stuck googling for hours. You're iterating.

Think of it as a **pair programming partner that doesn’t sleep.**  
One that helps you:

*   validate architecture decisions
*   debug error stacks
*   prototype design patterns
*   review code for consistency
*   simulate alternate flows before you commit

## AI as a Mentor

So how about AI as a mentor?

![Image](https://blog.faldi.xyz/content/images/2025/04/image-1.png)

Imagine you're debugging a `Tailwind CSS` error in your `Next.js` monorepo—something like:

```bash
Cannot apply unknown utility class: border-border
```

You’re staring at the terminal, confused. The docs don’t help. Google gives you five outdated Stack Overflow threads.  
Instead of digging through random GitHub issues, you drop the error into ChatGPT.

Boom—explanation.  
It tells you Tailwind v4 changed how CSS variables are handled, that `@apply` needs to be explicit, and why `border-border` isn't valid unless defined in your theme.

That’s mentoring.

It’s not just about fixing bugs. You can:

*   Ask **why this is happening**, not just how to solve it.
*   Get a second opinion on **code structure and architecture**.
*   Learn **alternatives** and best practices (e.g., "Should I debounce this search input or use a custom hook?")
*   Validate patterns: "Is this Intersection Observer setup okay for infinite scrolling?"

Even better: AI doesn’t shame you for asking “stupid” questions.  
It **encourages curiosity**, explains at your pace, and can go as deep or as abstract as you want.

AI mentorship is like having a senior engineer on-call—one who doesn’t mind explaining something 5 different ways until it finally clicks.

And when used consistently, this kind of feedback loop becomes a powerful force for **closing knowledge gaps**—fast.

## Boosting Learning and “Ngulik” with AI

> cooking some chrome extension 🍳 wdyt?  
>   
> \> WIP. only 5 hours progress [pic.twitter.com/b7UiDseuEz](https://t.co/b7UiDseuEz?ref=blog.faldi.xyz)
> 
> — Gading Nasution ᵍⁿ (@gadingnstn) [April 18, 2025](https://twitter.com/gadingnstn/status/1913271036893864212?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

One of my Twitter mutuals recently built a Chrome extension in just **five hours**.

> _"cooking some chrome extension 🔍 wdyat? — WIP. only 5 hours progress"_

It honestly blew my mind.

Not just because of the speed—but because it shows what’s now possible when you combine technical skill with the right tools, especially AI. These days, you can go from an idea to a working prototype in a single sitting. No waiting, no gatekeeping—just build.

For me personally, I’m not quite at that speed yet. Right now, I’m taking the slow route—building a fullstack monorepo using **Hono** for the backend and **Next.js** for the frontend. It’s not lightning fast, but I’m intentionally going deep to understand how backend and frontend systems connect. Every part of the stack is an opportunity to learn something new—from API routing and integration, to client-side data fetching and caching strategy.

And that’s totally fine. Everyone learns and builds at a different pace. What matters isn’t how fast we ship, but how well we understand what we’re building.

* * *

That said, having **AI in the loop makes a huge difference**. The feedback is instant. The iteration cycles are tighter. The confidence to explore things I don’t fully understand? Much stronger. I can validate my approach, ask for code suggestions, refactor with a second opinion, and even simulate edge cases—without context switching away from my editor.

Of course, this doesn’t mean we abandon the fundamentals. We still dive into official docs. We still browse GitHub issues. We still ask for help from peers and mentors. AI doesn’t replace those things—but it **reinforces** the process. It gives us another layer of support. When we're stuck, AI helps us move again. When we're unsure, it gives a starting point to work from.

The result? More momentum in how we learn and build—especially when we’re working alone.

At the end of the day, AI isn’t a shortcut. It’s a multiplier.  
It doesn’t replace documentation—it **amplifies** it.

Bagikan[](https://twitter.com/share?text=Catching Up with AI&url=http://blog.faldi.xyz/catching-up-with-ai/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/catching-up-with-ai/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/catching-up-with-ai//&title=Catching Up with AI "LinkedIn")[](/cdn-cgi/l/email-protection#211e5254434b4442551c6240554249484f46017451015648554901606807404c511a434e45581c495555511b0e0e434d4e460f47404d45480f59585b0e4240554249484f460c54510c564855490c40480e "Email")

Topik [Lesson Learned](/tag/lesson-learned/) [Opini](/tag/opini/)

[

## What Does It Really Mean to Be a Frontend Engineer?

“Frontend engineer” can mean many things, depending on where you work. At…

05 Mei 2025



](/what-does-it-really-mean-to-be-a-frontend-engineer/)[

## Tab Navigation vs Route-Based Navigation in React: My Experience with Large Datasets

Today I want to share my journey with a common React challenge:…

12 Mar 2025



](/tab-navigation-vs-route-based-navigation-in-react-my-experience-with-large-datasets/)