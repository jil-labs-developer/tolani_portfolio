# site/ — React app for tolaniadekoya.com (exact visual replica)

React 18 + TypeScript + Vite, using React Router v6, TanStack Query, and Framer
Motion. Builds `../deploy/`. The goal is a pixel-exact replica of the live
Readymag-built tolaniadekoya.com, so each page is rendered from an exact capture
of the live site's own computed widget layout rather than a hand-authored reflow.

## How it works

The live site is a Readymag "canvas": a fixed-width design surface (`1024px` on
desktop, `320px` on phones) of absolutely-positioned widgets, scaled to the
viewport. We captured, per page and per breakpoint, every widget's geometry +
rendered HTML + inline styles into `src/canvas-data/*.json`, rewrote all asset
URLs to the local mirror in `public/assets/`, and re-render them through
`ReadymagCanvas` inside a container reproduced at the live scale
(desktop `zoom:1.40625`, mobile `transform:scale(1.21875)`), wrapped in one
outer `transform: scale(viewportWidth / referenceWidth)` so the net scale equals
the live site's at any width. `src/readymag.css` holds the exact Readymag CSS
rules those widgets reference (emotion classes, link styles, text metrics),
extracted from the live stylesheets, plus a few base/reset rules.

## Commands

```bash
npm install
npm run dev        # localhost:8935
npm run build      # writes ../deploy
npm run preview    # serve the build on localhost:8935
npm run typecheck  # tsc --noEmit
```

## Layout

| Path | What it is |
|---|---|
| `src/canvas-data/*.json` | Captured widget layouts. `<page>.json` (desktop 1024) and `<page>-mobile.json` (phone 320). `index.ts` bundles them per slug and exposes `fetchCanvasBundle`. |
| `src/components/ReadymagCanvas.tsx` | Renders a bundle: picks desktop/mobile by viewport width, reproduces the canvas at the live baked scale + an outer fit transform, injects the static widgets via one `dangerouslySetInnerHTML`, overlays `HlsVideo` for the video widgets, and intercepts in-canvas maglink clicks to route via React Router. |
| `src/components/HlsVideo.tsx` | Plays the case-study demo clips (HLS via lazy-loaded hls.js, native on Safari). |
| `src/routes/CanvasRoute.tsx` | Per-slug route: `useQuery(fetchCanvasBundle)` → `ReadymagCanvas`. |
| `src/components/Layout.tsx` | Framer Motion route-transition wrapper (each canvas already contains its own header/footer widgets). |
| `src/readymag.css` | Exact Readymag widget CSS (extracted) + base/reset + entrance-animation neutralization. |
| `public/assets/` | Verbatim CDN mirror (images, fonts, HLS video). `public/cursor/` holds the 18px olive-dot cursor images. |

## Re-capturing from the live site

The capture scripts live in this session's scratchpad (`extract-canvas.js`,
`extract-mobile.js`, `extract-css2.js`): they load each page on
tolaniadekoya.com at 1440 and 390, read `.page.center-page .page-content-container`,
and dump widget geometry/HTML/CSS with asset URLs rewritten to `/assets/...`.
Re-run them if the live site changes, then re-apply the base rules prepended to
`readymag.css` (see git history / the file's top comment).
