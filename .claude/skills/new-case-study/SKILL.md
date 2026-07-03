---
name: new-case-study
description: Use this skill to create a brand-new portfolio case study page for tolaniadekoya.com, styled to match the existing iheart/ehr case studies. Triggers on requests like "add a new case study", "create a case study for X", "/new-case-study". Runs an interactive draft → review → naming → push workflow gated by explicit user approval at each step.
---

# New case study

Builds a new, hand-authored React case-study page for this portfolio (repo root — this repo has no nested `site/` directory, `src/` is at the top level), visually consistent with the existing `iheart`/`ehr` pages, and ships it through to a reviewed, approved GitHub push.

## Why this isn't "just add a page"

`iheart`, `ehr`, `knot`, `about`, and home are **not** normal React pages — they're frozen, pixel-exact JSON replicas of a scraped Readymag site (`src/canvas-data/*.json`, rendered by `ReadymagCanvas.tsx`). That format is a byproduct of scraping and is impractical to hand-author: hundreds of absolute-positioned widgets with literal captured HTML. A brand-new case study has no Readymag source to scrape, so it must be a **real, hand-authored React component** instead — built to visually match the reference pages, not literally replicate their JSON.

Read `reference/style-tokens.md` before writing any content or markup — it has the actual fonts/colors/section-spine/layout geometry measured from `iheart.json`/`ehr.json`, so the new page matches without guessing.

Reuse the shared primitives in `src/components/case-study/` (`CaseStudyLayout`, `CaseStudySection`, `PlaceholderImage`, `NextProjectFooter`) for every new case study — don't recreate this chrome per project. In particular, `CaseStudyLayout` is not just a centered text column: it renders the same fixed-position `← HOME` + vertical TOC sidebar iheart/ehr use, an accent-tinted cover band next to it (fed by the required `cover` prop), and the site-wide contact footer ("THANKS FOR STOPPING BY <3" / EMAIL / LINKEDIN / RESUME) automatically at the bottom — no new case study should re-implement or omit any of these; they come for free from the shared component.

**Styling: Tailwind utility classes, not inline `style={{}}` objects.** This project already has Tailwind v4 wired up (`@tailwindcss/vite`, `@import 'tailwindcss'` in `src/index.css`) — the shared primitives use Tailwind classes (arbitrary-value syntax like `font-['IBM_Plex_Mono']`, `text-[10px]`, `text-[#666]` for the exact tokens in `reference/style-tokens.md`). New case-study components should follow the same pattern. Reach for an inline `style` prop only for values that are genuinely dynamic at runtime and can't be static Tailwind classes — e.g. a per-project `accent` color passed as a prop.

## Hard rules

1. **Stop-and-wait approval gate, at every numbered step below.** Present that step's output, then explicitly ask for approval and wait. If the response is anything other than clear approval — a correction, "no", a change request, or silence followed by an edit — treat it as feedback: revise *that same step's* output and re-present it for approval again. Never advance to the next step without unambiguous go-ahead for the current one. This applies to the wireframe, the draft page, the screenshots, the route name, the optional home-grid tile, and the final push.
2. **Never `git push origin master` without an explicit, separate confirmation at the Ship step**, even if every earlier step was approved. A push deploys straight to production (Vercel auto-deploys `master`).
3. Do all work on a feature branch (e.g. `case-study/<slug>`) until the Ship step. Never commit to `master` directly.
4. Don't touch `src/canvas-data/*.json` except in the explicitly opt-in Home-grid wiring step, and only with the before/after screenshot review described there — that data is a fragile, frozen scrape.

## Step-by-step

### 1. Intake
Ask whether the user has existing draft material (pasted text, a file path, screenshots, a Figma link) or wants you to work from a one-line brief. If given a draft, read and analyze it thoroughly — preserve its structure, facts, and voice; don't rewrite content it already specified. If no draft, generate a structure grounded in the section spine in `reference/style-tokens.md`: **Overview** and **The Problem** open, **What I Learned** closes — the middle sections are custom to that project's actual story, so ask enough clarifying questions about the project (what it was, your role, the problem, the outcome) to write real, specific placeholder copy instead of generic filler.

### 2. Markdown wireframe (with self-review)
Write a temporary `.md` wireframe to the scratchpad or a location the user names — section by section, in reading order, with named, sized image placeholders the user can map 1:1 to real assets later, e.g.:

```
![PLACEHOLDER: hero-shot — 1200×800]
![PLACEHOLDER: mobile-flow-01 — 320×640]
```

**Before showing this to the user**, do a silent self-review pass on your own draft: fix typos/grammar, resolve inconsistent terminology (project name spelled differently in two places, tense shifts), confirm every TOC/anchor entry has a matching section and vice versa, and check placeholder image labels are actually referenced consistently in the surrounding copy. This cleanup happens automatically on *every* revision of the wireframe (including ones triggered by user feedback), not just the first draft — it is not a separate approval gate, just part of what "the draft" means before it's presented.

Present the cleaned-up wireframe and ask for approval (rule 1).

### 3. Design-token check
Before building the real page, re-confirm against `reference/style-tokens.md`: body copy is `DM Sans` 400 12px `rgba(26,26,26,1)`; nav/TOC labels are `IBM Plex Mono` 10px `rgba(102,102,102,1)`, uppercase; pick one accent color for this project not already used (not iheart's red `rgba(197,32,45,1)` or ehr's purple `rgba(108,68,115,1)`). No separate user-facing gate for this step — it's input to step 4.

### 4. Build the draft page
On a feature branch:
- Create `src/pages/<Slug>.tsx` (or similarly named) using `CaseStudyLayout` + `CaseStudySection` for each approved wireframe section, `PlaceholderImage` for every image/video slot (pass the same label/dimensions from the wireframe so they map 1:1), and `NextProjectFooter` pointing at real existing projects.
- `CaseStudyLayout` requires a `cover` prop — the wireframe's hero image placeholder (e.g. `<PlaceholderImage label="X-hero" width={1200} height={800} />`) goes there, not as the first item inside the Overview section; the layout renders it inside the accent-tinted band next to the sidebar.
- `NextProjectFooter` takes both `previous: { to, name }` and `next: { to, name }` — both required on every case study, no exceptions. Pick both from the site's actual existing project order (home → iheart → ehr → knot → about, or wherever the new case study is meant to sit in that sequence) so the reader can always navigate both directions.
- Wire the route: add a line to `src/App.tsx`'s `<Routes>` (`<Route path="<slug>" element={<Slug />} />`) — leave the final slug placeholder-named until step 6 confirms it; a working temporary path is fine for review.
- Run `npm run typecheck`.

### 5. Screenshot review
Start the dev server (`npm run dev`, port 8935) and use Playwright to screenshot the new route at both **desktop** (1440px, matching this app's reference viewport) and **mobile** (390px) widths — this page is genuinely responsive, unlike the frozen canvases, so both must be checked. If `playwright` isn't installed in this repo's devDependencies yet, add it (`npm install -D playwright && npx playwright install chromium`). A minimal one-off script (Node + `playwright`, launch chromium, goto `http://localhost:8935/<slug>`, screenshot at each width) is enough — write it to the repo root (not `/tmp` or the scratchpad — Node can't resolve the `playwright` package from outside the project) and delete it again once you're done with it. When in doubt about whether the new page reads consistently with the rest of the site, screenshot the equivalent region of an existing page (`/iheart`, `/ehr`, or `/`) side by side — several rounds of this skill's own revisions were caught exactly this way (zoom/scale mismatch, header structure, footer thickness).

Show both screenshots to the user and ask for approval (rule 1). Loop back to step 4 (adjusting the component) on any requested change, then re-screenshot.

### 6. Route naming
Propose 2-3 URL slug options derived from the project name (short, lowercase, hyphen-free to match the existing style — `iheart`, `knot`, `ehr`, `about`). Check for collisions against `src/App.tsx`'s existing routes and the `LEGACY_REDIRECTS` keys (`/1`-`/5`). Once approved, rename the route/file to the final slug if it differed from the placeholder used in step 4-5.

### 7. Home-grid wiring — opt-in, separately approved
`src/canvas-data/home.json` has a project grid with exactly two absolute-positioned tiles (`maglink` widgets linking to iheart and ehr). Adding a tile there means inserting a new widget block and shifting every widget below it down by the new tile's height in a frozen, pixel-exact JSON — mechanical but easy to get subtly wrong by hand. Explain this tradeoff to the user and ask if they want it attempted this run.

If yes: write a small script that (a) clones the shape of an existing tile widget, (b) points it at the new route, (c) shifts the `top` of every widget below the insertion point by the new tile's height + existing gap, applied to **both** `home.json` and `home-mobile.json`. Screenshot the home page before and after, and get approval (rule 1) before it's included in the commit. If no: skip silently — this is a fine default, not a failure.

### 8. Ship
Show the full diff (new files + route registration + any home-grid change) on the feature branch. Ask for final, explicit confirmation before running `git push origin master` (or opening a PR, if the user prefers review-before-merge over a direct push — ask which). If the user requests changes even at this last gate, apply them, re-show the diff, and ask again — don't push on an unclear response (rule 1, rule 2).

After pushing, remind the user: placeholder images still need to be swapped for real assets (same filenames/labels as the wireframe), and Vercel will auto-deploy from the push.
