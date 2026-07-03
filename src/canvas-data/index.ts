import homeJson from './home.json';
import iheartJson from './iheart.json';
import knotJson from './knot.json';
import ehrJson from './ehr.json';
import aboutJson from './about.json';
import homeMobileJson from './home-mobile.json';
import iheartMobileJson from './iheart-mobile.json';
import knotMobileJson from './knot-mobile.json';
import ehrMobileJson from './ehr-mobile.json';
import aboutMobileJson from './about-mobile.json';

export interface WidgetRect {
  left: number;
  top: number;
  width: number;
  height: number;
  z: number;
}

export interface CanvasWidget {
  type: string;
  cls: string;
  rect: WidgetRect;
  dataId: string | null;
  html?: string | null;
  style?: string;
  poster?: string;
  m3u8?: string;
}

export interface CanvasPage {
  canvasWidth: number;
  canvasHeight: number;
  pageBg: string;
  widgets: CanvasWidget[];
}

export interface CanvasBundle {
  desktop: CanvasPage;
  mobile: CanvasPage;
}

const p = (j: unknown) => j as unknown as CanvasPage;

/** Exact per-widget layouts captured from the live Readymag canvases (desktop 1024px + phone 320px). */
export const canvasBundles: Record<string, CanvasBundle> = {
  home: { desktop: p(homeJson), mobile: p(homeMobileJson) },
  iheart: { desktop: p(iheartJson), mobile: p(iheartMobileJson) },
  knot: { desktop: p(knotJson), mobile: p(knotMobileJson) },
  ehr: { desktop: p(ehrJson), mobile: p(ehrMobileJson) },
  about: { desktop: p(aboutJson), mobile: p(aboutMobileJson) },
};

export async function fetchCanvasBundle(slug: string): Promise<CanvasBundle> {
  const b = canvasBundles[slug];
  if (!b) throw new Error(`Unknown page: ${slug}`);
  return b;
}
