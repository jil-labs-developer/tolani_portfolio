import { NavLink } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const links = [
  { to: '/#work', label: 'WORK' },
  { to: '/#work', label: 'PLAY' },
  { to: '/about', label: 'ABOUT' },
];

export function Header() {
  const { mobileNavOpen, setMobileNavOpen } = useSite();

  return (
    <header className="sticky top-0 z-50 border-b border-rule/30 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-mono text-[10px] tracking-wide text-muted hover:text-ink">
          TOLANI ADEKOYA
        </NavLink>
        <nav className="hidden gap-8 font-mono text-[10px] tracking-wide sm:flex">
          {links.map((link) => (
            <a key={link.label} href={link.to} className="text-muted transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="font-mono text-[10px] tracking-wide text-muted sm:hidden"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>
      {mobileNavOpen && (
        <nav className="flex flex-col gap-4 border-t border-rule/30 px-6 py-4 font-mono text-[10px] tracking-wide sm:hidden">
          {links.map((link) => (
            <a key={link.label} href={link.to} className="text-muted" onClick={() => setMobileNavOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
