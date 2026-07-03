import { Link } from 'react-router-dom';

export interface ProjectLink {
  /** Route path of the project to surface, e.g. "/iheart". */
  to: string;
  /** Display name of that project, e.g. "iHeart". */
  name: string;
}

interface NextProjectFooterProps {
  /** Project shown before the current one, e.g. { to: '/ehr', name: 'EHR' }. Required on every case study — pick it from the site's real project order. */
  previous: ProjectLink;
  next: ProjectLink;
}

export function NextProjectFooter({ previous, next }: NextProjectFooterProps) {
  return (
    <footer className="flex items-start justify-between gap-16 py-20 pb-16">
      <div>
        <div className="mb-3 font-['IBM_Plex_Mono'] text-[10px] tracking-[0.05em] text-[#666]">
          PREVIOUS PROJECT
        </div>
        <Link to={previous.to} className="font-['DM_Sans'] text-lg text-[#1a1a1a] no-underline">
          ← {previous.name}
        </Link>
      </div>
      <div className="text-right">
        <div className="mb-3 font-['IBM_Plex_Mono'] text-[10px] tracking-[0.05em] text-[#666]">NEXT PROJECT</div>
        <Link to={next.to} className="font-['DM_Sans'] text-lg text-[#1a1a1a] no-underline">
          {next.name} →
        </Link>
      </div>
    </footer>
  );
}
