import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface TocEntry {
  id: string;
  label: string;
}

interface CaseStudyLayoutProps {
  title: string;
  /** Project's unique accent color — see reference/style-tokens.md § Color. Don't reuse red (iheart) or purple (ehr). */
  accent: string;
  toc: TocEntry[];
  /** Main cover image/placeholder for the hero band, e.g. <PlaceholderImage label="X-hero" width={1200} height={800} />. */
  cover: ReactNode;
  children: ReactNode;
}

function scrollToId(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// The captured iheart/ehr/knot/about/home pages fill the full viewport width
// at a scale of (viewportWidth / designWidth) — see ReadymagCanvas.tsx. A
// hand-authored page centered in a fixed max-w column with unscaled text
// reads as much smaller/"zoomed out" next to those pages. Match the same
// net scale here so hand-authored case studies feel consistent with the rest
// of the site.
const DESKTOP_DESIGN = 1024;
const MOBILE_DESIGN = 320;
const MOBILE_BREAKPOINT = 640;

// Measured directly off src/canvas-data/iheart.json + ehr.json (design-space
// px, i.e. before the zoom above): a left nav column (← HOME + TOC, stacked
// with a 24px rhythm) that only exists in the hero row, an accent-tinted
// cover band filling the rest of that row's width, then body content below
// indented to align with the nav column's right edge. Both reference pages
// use these exact numbers, so hand-authored pages reuse them too.
const SIDEBAR_WIDTH = 210;
const CONTENT_RIGHT_PAD = 48;

// Site-wide contact footer — identical on every canvas page (home/iheart/ehr/
// knot/about). Baked into the shared layout (not a per-project prop) so every
// hand-authored case study gets it automatically and can't drift.
const FOOTER_LINKS = [
  { label: 'EMAIL', href: 'mailto:oluwatolaniadekoya@gmail.com' },
  { label: 'LINKEDIN', href: 'http://www.linkedin.com/in/oluwatolani' },
  {
    label: 'RESUME',
    href: 'https://drive.google.com/file/d/1WHyAY5b-c7v2Zb5oaMjG2V47J73SU1jn/view?usp=sharing',
  },
];

/**
 * Shared chrome for hand-authored case studies (see .claude/skills/new-case-study).
 * The captured iheart/ehr/knot/about/home pages bake their own chrome per
 * widget instead, so this is intentionally new — every future case study
 * built via the skill should share this one layout for consistency.
 */
export function CaseStudyLayout({ title, accent, toc, cover, children }: CaseStudyLayoutProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(() => (typeof window === 'undefined' ? 1440 : window.innerWidth));

  useEffect(() => {
    function update() {
      setWidth(wrapperRef.current?.clientWidth ?? window.innerWidth);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const design = width < MOBILE_BREAKPOINT ? MOBILE_DESIGN : DESKTOP_DESIGN;
  const isMobile = design === MOBILE_DESIGN;
  const scale = width / design;
  const contentStyle = { width: design, zoom: scale } as CSSProperties;

  const navLinkClass = "font-['IBM_Plex_Mono'] text-[10px] tracking-[0.05em] text-[#666] no-underline";

  const nav = (
    <div className="flex flex-col gap-6">
      <Link to="/" className={navLinkClass}>
        ← HOME
      </Link>
      <nav className="flex flex-col gap-6">
        {toc.map((entry) => (
          <a key={entry.id} href={`#${entry.id}`} onClick={(e) => scrollToId(e, entry.id)} className={navLinkClass}>
            {entry.label.toUpperCase()}
          </a>
        ))}
      </nav>
    </div>
  );

  return (
    <div ref={wrapperRef} style={{ width: '100%', overflowX: 'hidden' }}>
      <div style={contentStyle}>
        {isMobile ? (
          <>
            <header className="px-8 py-8">{nav}</header>
            <div className="px-8">{cover}</div>
          </>
        ) : (
          <div className="flex">
            <aside className="shrink-0 pt-10 pl-7" style={{ width: SIDEBAR_WIDTH }}>
              {nav}
            </aside>
            <div
              className="flex-1 py-8 pr-8"
              style={{ background: `color-mix(in srgb, ${accent} 10%, white)` }}
            >
              {cover}
            </div>
          </div>
        )}

        <div
          className="px-8"
          style={!isMobile ? { paddingLeft: SIDEBAR_WIDTH, paddingRight: CONTENT_RIGHT_PAD } : undefined}
        >
          <h1 className="mt-12 font-['DM_Sans'] text-[22px] font-normal text-[#1a1a1a]">{title}</h1>
          <div className="mt-5 h-0.5 w-12" style={{ background: accent }} />

          <main>{children}</main>
        </div>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 py-4 pl-7 pr-12">
          <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.05em] text-[#666]">
            THANKS FOR STOPPING BY &lt;3
          </span>
          <div className="flex gap-8">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('mailto:') ? {} : { rel: 'noopener noreferrer' })}
                className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.05em] text-[#666] no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
