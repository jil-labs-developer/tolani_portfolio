import { CONTACT } from '../content/about';

export function Footer() {
  return (
    <footer className="border-t border-rule/30">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-6 font-mono text-[10px] tracking-wide text-muted sm:flex-row sm:items-center">
        <span>THANKS FOR STOPPING BY &lt;3</span>
        <div className="flex gap-6">
          <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">
            EMAIL
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
            LINKEDIN
          </a>
          <a href={CONTACT.resume} target="_blank" rel="noreferrer" className="hover:text-ink">
            RESUME
          </a>
        </div>
      </div>
    </footer>
  );
}
