# site/ — React app for tolaniadekoya.com

A React 18 + TypeScript single-page app, built with Vite. Builds `../deploy/`.

Stack: React Router v6 (routing), TanStack Query (page content loading/caching),
React Context (mobile nav state, case-study scrollspy), Tailwind CSS (styling),
Framer Motion (page transitions and scroll reveals).

Pages are served at named URLs: `/`, `/iheart`, `/knot`, `/ehr`, `/about`
(the old numeric `/2../5` paths redirect via `public/vercel.json`, with a
client-side fallback in `src/App.tsx` for environments that don't apply
`vercel.json`, e.g. `vite preview`).

## Commands

```bash
npm install
npm run dev        # localhost:8935
npm run build      # writes ../deploy (the folder that gets deployed)
npm run preview    # serve the build output on localhost:8935
npm run typecheck  # tsc --noEmit
```

## Layout

| Path | What it is |
|---|---|
| `src/content/` | Hand-authored, typed page content. `types.ts` defines the `Block` union used by case-study pages; `home.ts`/`about.ts` hold those pages' copy; `caseStudies/*.ts` hold the iHeart/Knot/EHR case studies (Knot is intentionally incomplete — `complete: false` — matching the source content); `index.ts` is the registry + the `fetch*` functions React Query calls. |
| `src/routes/` | One component per route: `Home.tsx`, `About.tsx`, `CaseStudy.tsx` (generic template driven by `content/caseStudies/*`, used for all three case studies). |
| `src/components/` | `Layout.tsx` (header/footer chrome + Framer Motion route transitions), `Header.tsx`, `Footer.tsx`, `CaseStudyBlocks.tsx` (renders the `Block` union), `HlsVideo.tsx` (lazy-loads `hls.js` for the case-study demo clips), `Reveal.tsx` (scroll-triggered fade-in). |
| `src/context/` | `SiteContext` (mobile nav open/close), `ScrollSpyContext` (active-section tracking for the case-study sidebar, via `IntersectionObserver`). |
| `public/` | Runtime assets served verbatim: the scraped CDN mirror (images, fonts, HLS video segments) under `public/assets/`, favicons under `public/dist/`, `vercel.json`. |

## Adding a new case study

1. Add page content to `src/content/caseStudies/<name>.ts` following the
   `CaseStudy` type in `src/content/types.ts` — a `blocks: Block[]` array
   describes the page body; see the existing case studies for the block
   vocabulary (`section-heading`, `paragraph`, `media-panel`, `card-grid`, etc).
2. Register it in `src/content/index.ts`'s `caseStudies` map and `pageOrder`.
3. Drop any new images/video into `public/assets/` (same CDN-mirror path
   layout as the existing assets) and reference them from the content file.
4. `npm run dev` — the page exists at `/<name>` with nav and sidebar wired up.

## Design tokens

Fonts and colors are defined in `src/index.css` (`@theme` block): IBM Plex
Mono for nav/labels, Instrument Serif for headings, DM Sans for body copy,
and a self-hosted Adobe Fonts script face (aliased to `Tolani Script`) for
the hero name and signature. Each case study carries an `accent` color
(`--color-iheart`/`knot`/`ehr`) used for its hero banner and section labels.
