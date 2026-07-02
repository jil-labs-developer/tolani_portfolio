import type { CaseStudy } from './types';
import { home } from './home';
import { about, CONTACT } from './about';
import { iheart } from './caseStudies/iheart';
import { knot } from './caseStudies/knot';
import { ehr } from './caseStudies/ehr';

export { home, about, CONTACT };

export const caseStudies: Record<string, CaseStudy> = { iheart, knot, ehr };

export interface PageMeta {
  slug: string;
  path: string;
  title: string;
}

/** Registry order mirrors the original site; drives prev/next chaining. */
export const pageOrder: PageMeta[] = [
  { slug: 'home', path: '/', title: 'Tolani Adekoya' },
  { slug: 'iheart', path: '/iheart', title: 'Tolani Adekoya — iheart' },
  { slug: 'knot', path: '/knot', title: 'Tolani Adekoya — knot' },
  { slug: 'ehr', path: '/ehr', title: 'Tolani Adekoya — ehr' },
  { slug: 'about', path: '/about', title: 'Tolani Adekoya — about' },
];

export async function fetchCaseStudy(slug: string): Promise<CaseStudy> {
  const study = caseStudies[slug];
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return study;
}

export async function fetchHome() {
  return home;
}

export async function fetchAbout() {
  return about;
}
