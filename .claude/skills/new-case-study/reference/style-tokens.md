# Style tokens (extracted from iheart.json / ehr.json)

These are measured from the actual captured widget HTML in `src/canvas-data/iheart.json` and `ehr.json` — not guessed. A new hand-authored case study should reuse these so it reads as part of the same portfolio, not a redesign.

All three font families below are already loaded site-wide via `/assets/fonts.googleapis.com/css` (linked in `index.html`) — no new `<link>` or `@font-face` needed.

## Typography

| Role | Font | Weight | Size | Color | Notes |
|---|---|---|---|---|---|
| Body copy | `DM Sans` | 400 | 12px | `rgba(26,26,26,1)` | The dominant text style in both case studies (67 uses in iheart, 38 in ehr). |
| Larger body / lead paragraph | `DM Sans` | 400 | 15px | `rgba(26,26,26,1)` | Used sparingly for opening/lead paragraphs. |
| Nav / TOC / meta labels | `IBM Plex Mono` | 400 (700 for the active item) | 10px | `rgba(102,102,102,1)` | Always uppercase in practice (OVERVIEW, THE PROBLEM, WHAT I LEARNED, ...). Track the letters slightly (~0.05em). |
| Serif accent | `Instrument Serif` | 400 | 25px | inherits | Used once per page, sparingly — a pull-quote or single emphasized line, not the main heading. Don't overuse. |

There is no oversized "hero display" type in either reference page — this is an editorial, text-forward portfolio style, not a big-type landing page. Keep new hero titles modest (DM Sans, roughly 18-24px) rather than defaulting to a huge headline.

## Color

- Page background: `rgb(255,255,255)` (plain white) in both.
- Primary text: `rgba(26,26,26,1)` (near-black, not pure black).
- Secondary/nav text: `rgba(102,102,102,1)` (mid-gray).
- Accent color — **unique per project**, used for links/highlights/section dividers:
  - iheart: `rgba(197,32,45,1)` (red)
  - ehr: `rgba(108,68,115,1)` (purple/plum)
  - Pick a new, distinct accent color per new case study — don't reuse red or purple.

## Layout

- Desktop design width: `1024px` canvas (both pages), rendered at `zoom: viewportWidth / 1024` — i.e. net scale = `viewportWidth / designWidth`, exactly like `ReadymagCanvas.tsx`'s `DESKTOP`/`MOBILE` config (design 1024 desktop / 320 mobile, 640px breakpoint). **Don't build new case studies as a centered `max-w-[1024px]` column with unscaled text** — on a real viewport that reads as much smaller/"zoomed out" than iheart/ehr, which fill the full browser width. `CaseStudyLayout` already implements this scaling; just use it rather than a plain Tailwind container.
- Section rhythm: each named section (see below) is a substantial vertical block — case studies read as a long-scroll narrative, not a tight single-viewport layout.
- **Header is a sidebar, not a top bar.** Measured directly off `iheart.json`/`ehr.json` (design-space px, i.e. before the zoom above): a left nav column at `x≈28px` containing `← HOME` then the TOC, each stacked with a `24px` vertical rhythm (`gap-6` in Tailwind). This column is `210px` wide (`SIDEBAR_WIDTH` in `CaseStudyLayout.tsx`) and only exists in the hero row — below it, that same width is just blank left margin, not a repeated/sticky nav (confirmed: scrolling past the hero, the nav does not stay visible in either reference page).
- **Cover band.** To the right of the sidebar, in that same hero row, both reference pages have a full-height accent-tinted band holding the page's main image. `CaseStudyLayout`'s required `cover` prop renders into this band (background = `color-mix(in srgb, ${accent} 10%, white)`).
- **Body content indent.** Below the hero row, all section content is indented by the same `210px` on the left (`SIDEBAR_WIDTH`) and `48px` on the right (`CONTENT_RIGHT_PAD`) — not centered, not full width.
- **Site-wide footer.** Every canvas page (home/iheart/ehr/knot/about) ends with an identical contact footer: a hairline top border, "THANKS FOR STOPPING BY <3" on the left, and EMAIL / LINKEDIN / RESUME links on the right, in a *thin* bar (not much vertical padding — text sits close to the divider). `CaseStudyLayout` bakes this in automatically (see `FOOTER_LINKS` in the component) — never re-add it per page.
- **Prev/next project nav.** `NextProjectFooter` renders `previous: {to, name}` flush left and `next: {to, name}` flush right (`justify-between`), spanning the full content width — not centered, not clustered on one side. Both props are required on every case study; pick them from the real project order on the site.

## Section spine (in-page TOC anchors)

Both pages share an anchor-linked table-of-contents pattern (`data-anchor-link-pos` in the original scrape → just `#section-id` + smooth scroll in a hand-authored page). Anchors seen:

- **iheart**: Overview → The Problem → Opportunity → The Solution → Research → Design Decisions → Testing & Iteration → What I Learned → Next Steps
- **ehr**: Overview → The Problem → What We Assumed → The Contradiction → The Reframe → Research Method → Recommendations → Projected Impact → What I Learned

Common spine: **Overview** and **The Problem** open every case study; **What I Learned** closes it (iheart also adds a **Next Steps** coda after). The middle section titles are bespoke per project's actual narrative — don't force a rigid template onto every project's story.
