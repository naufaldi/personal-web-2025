# Projects index layout verification

Verified on 4 October 2026 against the local production preview.

The project and shared summary selectors previously had equal specificity. Production loaded the shared three-column rule last, placing project titles in its 24px disclosure column. Development loaded the project rule last and hid the problem. The project variant now uses `.editorial-index.project-index summary` with a shrinkable title track at both breakpoints.

## Reproduce verification

```sh
bun run build
bun run preview --host 127.0.0.1 --port 4342
```

In another terminal:

```sh
bun test tests/projects-index.browser.test.ts --timeout 30000
```

Set `PROJECTS_TEST_ORIGIN` to use a different preview address. The tests require the installed `agent-browser` CLI.

## Results

- Before the fix: 6 failed, 3 passed. Titles measured 24px at every tested project viewport.
- After the fix: 9 passed, 0 failed. Build succeeded with 0 errors and 0 warnings; Astro reported 14 existing hints.
- All project rows checked at 320, 390, 768, 1024, and 1536px for cover width, available title width, containment, and horizontal overflow.
- Open index, direct hash entry, keyboard expansion/Escape, visible expanded links, search, empty results, and category filtering passed.
- Blog, Books, and Manhwa index geometry passed at 390 and 1536px.
- Desktop and mobile screenshots were visually inspected for readable titles and aligned covers/disclosure icons.

Screenshots: [Desktop, 1536px](desktop-1536.png) and [Mobile, 390px](mobile-390.png).
