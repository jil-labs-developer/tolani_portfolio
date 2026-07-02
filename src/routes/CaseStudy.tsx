import { createContext, useContext, type CSSProperties } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchCaseStudy } from '../content';
import type { CaseStudy } from '../content/types';
import { ScrollSpyProvider, useScrollSpy } from '../context/ScrollSpyContext';
import { CaseStudyBlocks } from '../components/CaseStudyBlocks';

const CaseStudyContext = createContext<CaseStudy | null>(null);
const useCaseStudyContext = () => {
  const ctx = useContext(CaseStudyContext);
  if (!ctx) throw new Error('missing CaseStudyContext');
  return ctx;
};

const ACCENT_TERMS = ["iHeart's", 'mutual understanding', "BCC's"];

function Sidebar() {
  const study = useCaseStudyContext();
  const { activeId } = useScrollSpy();

  return (
    <aside className="hidden w-52 shrink-0 lg:block">
      <div className="sticky top-24 flex flex-col gap-3">
        <Link to="/" className="mb-2 font-mono text-[10px] tracking-wide text-muted hover:text-ink">
          ← HOME
        </Link>
        {study.sidebar.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="font-mono text-[10px] tracking-wide transition-colors"
            style={{ color: activeId === item.id ? 'var(--section-accent, #1a1a1a)' : undefined }}
          >
            <span className={activeId === item.id ? '' : 'text-muted hover:text-ink'}>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

export function CaseStudyPage() {
  const { slug = '' } = useParams();
  const { data: study, isLoading } = useQuery({
    queryKey: ['case-study', slug],
    queryFn: () => fetchCaseStudy(slug),
  });

  if (!isLoading && !study) return <Navigate to="/" replace />;
  if (!study) return null;

  const accentStyle = { '--section-accent': study.accent } as CSSProperties;

  return (
    <CaseStudyContext.Provider value={study}>
      <ScrollSpyProvider ids={study.sidebar.map((s) => s.id)}>
        <div style={accentStyle}>
          <div
            className="relative flex items-end justify-center overflow-hidden py-10"
            style={{ backgroundColor: study.accent }}
          >
            {study.heroImages.map((src) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="max-h-[420px] w-auto max-w-full object-contain"
              />
            ))}
          </div>

          <div className="mx-auto flex max-w-6xl gap-12 px-6 py-10">
            <Sidebar />
            <div className="min-w-0 flex-1">
              <h1 className="max-w-3xl font-serif text-2xl text-ink sm:text-4xl">
                {study.title.split(new RegExp(`(${ACCENT_TERMS.join('|')})`)).map((part, i) =>
                  ACCENT_TERMS.includes(part) ? (
                    <span key={i} style={{ color: study.accent }}>
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </h1>
              <p className="mt-3 font-mono text-[10px] tracking-wide text-ink/80">{study.navTitle}</p>

              <div className="mt-8">
                <CaseStudyBlocks blocks={study.blocks} />
              </div>

              {!study.complete && (
                <p className="mt-16 font-mono text-[10px] tracking-wide text-muted">MORE COMING SOON</p>
              )}
            </div>
          </div>
        </div>
      </ScrollSpyProvider>
    </CaseStudyContext.Provider>
  );
}
