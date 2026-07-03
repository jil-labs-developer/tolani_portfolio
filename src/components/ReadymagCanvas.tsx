import { useEffect, useRef, useState, type CSSProperties } from 'react';
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

export function ReadymagCanvas({ bundle }: { bundle: CanvasBundle }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
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
  const staticHtml = staticWidgets
    .map((w) => `<div class="${w.cls}" style="position:absolute;${w.style || ''}">${w.html || ''}</div>`)
    .join('');

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
  );
}
