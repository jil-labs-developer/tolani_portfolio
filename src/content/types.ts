export type Block =
  | { type: 'section-heading'; id: string; eyebrow: string; title: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'label'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'media-panel'; label?: string; video?: { src: string; poster: string }; image?: string }
  | { type: 'before-after'; image: string }
  | { type: 'card-grid'; columns?: number; cards: { eyebrow?: string; title: string; body: string }[] }
  | { type: 'tags'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'divider' }
  | { type: 'link-line'; text: string; href: string };

export interface SidebarLink {
  id: string;
  label: string;
}

export interface CaseStudy {
  slug: 'iheart' | 'knot' | 'ehr';
  title: string;
  navTitle: string;
  accent: string;
  heroImages: string[];
  sidebar: SidebarLink[];
  blocks: Block[];
  complete: boolean;
}

export interface WorkCard {
  title: string;
  description: string;
  image: string;
  href?: string;
}
