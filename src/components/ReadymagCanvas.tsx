import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { HlsVideo } from './HlsVideo';
import type { CanvasBundle, CanvasPage } from '../canvas-data';

// Each captured canvas replicates exactly what the live viewer renders at its
// reference viewport, so we recreate the container at that baked scale and add
// one outer transform scale(viewportWidth / referenceWidth) to fit any width.
// Net scale = baked * (W/ref) = W/design — identical to the live site.
const DESKTOP = { design: 1024, ref: 1440, scale: 1440 / 1024, mode: 'zoom' as const };
const MOBILE = { design: 320, ref: 390, scale: 390 / 320, mode: 'transform' as const };
const MOBILE_BREAKPOINT = 640;

const HREF_MAP: Record<string, string> = {
  '/1/': '/', '/1': '/',
  '/2/': '/iheart', '/2': '/iheart',
  '/3/': '/knot', '/3': '/knot',
  '/4/': '/ehr', '/4': '/ehr',
  '/5/': '/about', '/5': '/about',
};

/** Detect widgets carrying a Readymag "coming soon" cursor (external CDN image-set). */
function hasComingSoonCursor(style: string, html: string): boolean {
  const combined = style + html;
  return combined.includes('cursor') && combined.includes('image-set(');
}

/** Strip `cursor: image-set(…)` declarations so the site-wide cursor is used. */
function stripCursorImageSet(s: string): string {
  return s.replace(/cursor:\s*image-set\([^;]*;?\s*/g, '');
}

export function ReadymagCanvas({ bundle, slug }: { bundle: CanvasBundle; slug: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(() => (typeof window === 'undefined' ? 1440 : window.innerWidth));
  const navigate = useNavigate();

  useEffect(() => {
    function update() {
      setWidth(wrapperRef.current?.clientWidth ?? window.innerWidth);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const useMobile = width < MOBILE_BREAKPOINT && bundle.mobile.canvasWidth <= MOBILE_BREAKPOINT;
  const page: CanvasPage = useMobile ? bundle.mobile : bundle.desktop;
  const cfg = page.canvasWidth <= MOBILE_BREAKPOINT ? MOBILE : DESKTOP;

  const fit = width / cfg.ref;
  const realHeight = page.canvasHeight * cfg.scale * fit;

  const videoWidgets = page.widgets.filter((w) => w.type === 'video');
  const staticWidgets = page.widgets.filter((w) => w.type !== 'video');

  // Build the static HTML string, injecting data attributes for interactive
  // behaviours and stripping broken cursor declarations from the Readymag export.
  const staticHtml = staticWidgets
    .map((w) => {
      let style = w.style || '';
      let html = w.html || '';
      let extraAttrs = '';

      // Mark "coming soon" widgets and clean up their cursor
      if (hasComingSoonCursor(style, html)) {
        extraAttrs += ' data-coming-soon';
        style = stripCursorImageSet(style);
        html = stripCursorImageSet(html);
      }

      // About page: mark the photo and the hidden painting caption
      if (slug === 'about') {
        if (w.dataId === '69df69dd0fbcdab7a0bd58bb') {
          extraAttrs += ' data-about-photo';
        }
        if (w.cls.includes('invisible')) {
          extraAttrs += ' data-about-caption';
        }
      }

      return `<div class="${w.cls}"${extraAttrs} style="position:absolute;${style}">${html}</div>`;
    })
    .join('');

  // ── "Coming soon" tooltip ────────────────────────────────────────
  // Follows the cursor when it enters a [data-coming-soon] element.
  // Uses direct DOM manipulation to avoid React re-renders on every mousemove.
  useEffect(() => {
    const container = wrapperRef.current;
    const tip = tooltipRef.current;
    if (!container || !tip) return;

    function onMove(e: MouseEvent) {
      const hit = (e.target as HTMLElement).closest('[data-coming-soon]');
      if (hit) {
        tip!.style.display = 'block';
        tip!.style.left = `${Math.min(e.clientX + 16, window.innerWidth - 200)}px`;
        tip!.style.top = `${Math.min(e.clientY + 16, window.innerHeight - 50)}px`;
      } else {
        tip!.style.display = 'none';
      }
    }
    function onLeave() {
      tip!.style.display = 'none';
    }

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── About page: painting caption reveal ──────────────────────────
  // Shows the hidden "circe invidiosa" caption when the photo is hovered.
  useEffect(() => {
    if (slug !== 'about') return;
    const container = wrapperRef.current;
    if (!container) return;

    const photo = container.querySelector<HTMLElement>('[data-about-photo]');
    const caption = container.querySelector<HTMLElement>('[data-about-caption]');
    if (!photo || !caption) return;

    const show = () => caption.classList.add('visible');
    const hide = () => caption.classList.remove('visible');

    photo.addEventListener('mouseenter', show);
    photo.addEventListener('mouseleave', hide);
    return () => {
      photo.removeEventListener('mouseenter', show);
      photo.removeEventListener('mouseleave', hide);
    };
  }, [slug, useMobile]);

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    // Readymag section-menu items are <a class="anchor-link" data-anchor-link-pos="...">
    // with no href — each targets a vertical position (in the canvas design space)
    // on the current page. Convert to a screen offset and scroll there.
    const anchorPos = a.getAttribute('data-anchor-link-pos');
    if (anchorPos !== null) {
      e.preventDefault();
      const offset = Number(anchorPos) * (width / cfg.design);
      const wrapperTop = (wrapperRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      window.scrollTo({ top: wrapperTop + offset, behavior: 'smooth' });
      return;
    }
    const href = a.getAttribute('href') || '';
    if (HREF_MAP[href] !== undefined) {
      e.preventDefault();
      navigate(HREF_MAP[href]);
    } else if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const containerStyle: CSSProperties = {
    width: cfg.design,
    height: page.canvasHeight,
    position: 'relative',
    ...(cfg.mode === 'zoom'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ zoom: cfg.scale } as any)
      : { transform: `scale(${cfg.scale})`, transformOrigin: '0 0' }),
  };

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ position: 'relative', width: '100%', height: realHeight, overflow: 'hidden', background: page.pageBg }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: cfg.ref, transformOrigin: '0 0', transform: `scale(${fit})` }}>
          <div className="page-content-container" style={containerStyle}>
            <div onClick={onClick} dangerouslySetInnerHTML={{ __html: staticHtml }} />
            {videoWidgets.map((w, i) => (
              <div
                key={w.dataId ?? i}
                className={w.cls}
                style={{
                  position: 'absolute',
                  left: w.rect.left,
                  top: w.rect.top,
                  width: w.rect.width,
                  height: w.rect.height,
                  zIndex: w.rect.z,
                  overflow: 'hidden',
                }}
              >
                {w.m3u8 && <HlsVideo src={w.m3u8} poster={w.poster} className="h-full w-full object-cover" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* "Coming Soon" tooltip — portaled to body to avoid transform/overflow issues */}
      {createPortal(
        <div
          ref={tooltipRef}
          className="coming-soon-tooltip"
          style={{ display: 'none', position: 'fixed' }}
        >
          COMING SOON
        </div>,
        document.body
      )}
    </>
  );
}
