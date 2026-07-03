import type { ReactNode } from 'react';

interface CaseStudySectionProps {
  /** Anchor id — must match the corresponding entry in CaseStudyLayout's `toc` prop. */
  id: string;
  /** Uppercase kicker label rendered above the section, e.g. "THE PROBLEM". */
  label: string;
  children: ReactNode;
}

/** One named block in the long-scroll narrative (see reference/style-tokens.md § Section spine). */
export function CaseStudySection({ id, label, children }: CaseStudySectionProps) {
  return (
    <section id={id} className="py-16 [scroll-margin-top:32px]">
      <div className="mb-5 font-['IBM_Plex_Mono'] text-[10px] tracking-[0.05em] text-[#666]">
        {label.toUpperCase()}
      </div>
      <div className="flex flex-col gap-6 font-['DM_Sans'] text-[12px] leading-[1.7] text-[#1a1a1a]">
        {children}
      </div>
    </section>
  );
}
