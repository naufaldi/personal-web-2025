# Portfolio evidence, weeks 6–12

I shipped the public deliverables on September 5, 2026. Calendar weeks describe the roadmap, not elapsed user research. I have not completed teacher interviews or measured adoption.

## Weeks 6–9: teacher workflow and pilot

I added a public Indonesian pilot guide at /pilot/teacher-exam/. A teacher can follow the review and print workflow, time a session, record an outcome, and download their own notes. Consent is required. Optional missing measurements remain null rather than becoming zero. The form does not send or persist data automatically.

I found a concrete issue during the public workflow check: grade 2 worksheets existed, but the filter offered only grades 5 and 6. I now derive options from the shared grade schema. A regression test failed before the fix and passed afterward. The selected public bank, review, and preview suites passed 96 tests in 14 files with one worker. These use mocked APIs and do not establish teacher usability.

I corrected one outdated test to assert the existing missing-exam redirect contract. Concurrent execution had also produced timeouts; the serial run isolated that stale assertion.

The frontend fix is deployed from teacher-exam commit fff83fb. A live browser selected grade 2 and received two grade 2 rows. The API and database remained healthy and were not recreated.

Still required: 3–5 voluntary teacher sessions, review of their actual notes, selection of a recurring problem, and a follow-up improvement validated with teachers. No participant findings or savings are claimed. The observed grade-filter issue is engineering evidence, not a substitute for those sessions.

## Weeks 10–12: make the reasoning accessible

I published two articles: why I do not blindly retry paid requests, and how a filter can hide valid data. Both explain the behavior, the boundary that owns the rule, the tests, and the limits of the evidence.

I added /demos/fullstack-walkthrough/, a five-step guided walkthrough linking the architecture, failure tests, UI evidence, and teacher pilot. This is an interactive written walkthrough, not a recorded incident or a video. It works without login and exposes all content when JavaScript is unavailable.

## Verification

- Portfolio production build passed, including TypeScript and generated discovery pages.
- bun test tests: 5 passed, 0 failed.
- Local browser: consent, timer start/stop, partial outcome, and download confirmation passed with explicitly synthetic notes.
- Walkthrough: starts on step 1, reaches step 5 with Next disabled, Show all reveals all five steps; no horizontal overflow at 390px.
- Content Generator: 70 selected reliability tests passed in the earlier evidence pass.
- Teacher Exam: 96 selected tests and production web build passed.
- Independent code review reported no actionable findings for the pilot and teacher change.

## Release record

First portfolio release: Cloudflare version 11760e6a-865a-41e6-83d6-6b6db39bc843. This made the weeks 1–5 case studies public before the second phase.

Teacher frontend release: teacher-exam-web:pilot-fff83fb, image sha256:fbdf021ea6803ebc4a798df45e857a7a24886d4e5631d1ab6126f467b5821d42. Build uses the existing production API origin. The runtime is based on the previous deployed Caddy image, with the new static build copied in. Existing hashed assets remain available to older tabs.

The VPS release directory is /home/naufaldi/releases/teacher-pilot-fff83fb. From /home/naufaldi/projects/teacher-exam, use the existing .env.production and docker-compose.prod.yml with that directory's override.yml, then up -d --no-deps web. rollback.yml selects the previous web image. No migration is needed. A normal future deployment without the override replaces this manual frontend release, so the source fix must be incorporated before that deployment.

Second portfolio release: a3c0b12e-c52b-43f3-bb87-6add317f3a9d. Nine public endpoints returned HTTP 200, including both articles, the pilot module, walkthrough, and teacher evidence. A final review removed section fragments from walkthrough links because the SPA does not reliably restore hash positions.

Source is preserved on GitHub branches codex/portfolio-evidence and codex/teacher-pilot-readiness. Teacher main was not changed, because its push workflow redeploys the full stack.

Final link correction release: d7f1d7dd-0ad4-4c71-8c5f-8f297d47551d. Public pilot timer start/stop verified after deployment.
