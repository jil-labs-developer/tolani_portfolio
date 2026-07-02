import type { Block } from '../content/types';
import { Reveal } from './Reveal';
import { HlsVideo } from './HlsVideo';
import { useScrollSpy } from '../context/ScrollSpyContext';

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  const { register } = useScrollSpy();
  return (
    <div ref={(el) => register(id, el)} className="scroll-mt-28 pt-6">
      <p className="mb-3 font-mono text-[10px] tracking-wide" style={{ color: 'var(--section-accent, #666)' }}>
        {eyebrow}
      </p>
      {title && <h2 className="max-w-3xl font-serif text-2xl text-ink sm:text-3xl">{title}</h2>}
    </div>
  );
}

export function CaseStudyBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'section-heading':
      return <SectionHeading eyebrow={block.eyebrow} title={block.title} id={block.id} />;

    case 'subheading':
      return (
        <Reveal>
          <h3 className="max-w-2xl font-sans text-base text-ink sm:text-lg">{block.text}</h3>
        </Reveal>
      );

    case 'paragraph':
      return (
        <Reveal>
          <p className="max-w-2xl font-sans text-xs leading-relaxed text-muted sm:text-sm">{block.text}</p>
        </Reveal>
      );

    case 'label':
      return (
        <p className="mt-2 font-mono text-[10px] tracking-wide text-muted/80">{block.text}</p>
      );

    case 'bullets':
      return (
        <Reveal>
          <ul className="flex max-w-2xl flex-col gap-2">
            {block.items.map((item, i) => (
              <li key={i} className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
                {item.startsWith('→') ? item : `→  ${item}`}
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case 'image':
      return (
        <Reveal>
          <img src={block.src} alt={block.alt ?? ''} loading="lazy" className="w-full max-w-3xl rounded" />
        </Reveal>
      );

    case 'media-panel':
      return (
        <Reveal>
          <div className="flex max-w-xl flex-col items-center gap-4 rounded border border-rule/20 bg-panel p-6">
            {block.label && <p className="self-start font-mono text-[10px] tracking-wide text-muted">{block.label}</p>}
            {block.video ? (
              <HlsVideo src={block.video.src} poster={block.video.poster} className="max-h-[380px] rounded-xl" />
            ) : block.image ? (
              <img src={block.image} alt="" className="max-h-[380px] rounded-xl" />
            ) : null}
          </div>
        </Reveal>
      );

    case 'before-after':
      return (
        <Reveal>
          <div className="max-w-xl overflow-hidden rounded border border-rule/20 bg-panel p-6">
            <img src={block.image} alt="Before and after comparison" className="w-full" />
          </div>
        </Reveal>
      );

    case 'card-grid':
      return (
        <Reveal>
          <div
            className="grid max-w-2xl gap-4"
            style={{ gridTemplateColumns: `repeat(${block.columns ?? 2}, minmax(0, 1fr))` }}
          >
            {block.cards.map((card, i) => (
              <div key={i} className="rounded border border-rule/20 bg-panel p-4">
                {card.eyebrow && <p className="mb-2 font-mono text-[10px] tracking-wide text-muted">{card.eyebrow}</p>}
                {card.title && <p className="mb-1 font-sans text-sm text-ink">{card.title}</p>}
                <p className="font-sans text-xs leading-relaxed text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      );

    case 'tags':
      return (
        <div className="flex max-w-2xl flex-wrap gap-2">
          {block.items.map((tag) => (
            <span key={tag} className="rounded-full border border-rule/20 bg-panel px-3 py-1 font-mono text-[9px] tracking-wide text-muted">
              {tag}
            </span>
          ))}
        </div>
      );

    case 'quote':
      return (
        <Reveal>
          <blockquote className="max-w-2xl font-serif text-xl italic text-ink sm:text-2xl">
            “{block.text}”
          </blockquote>
        </Reveal>
      );

    case 'divider':
      return <hr className="border-rule/20" />;

    case 'link-line':
      return (
        <a href={block.href} className="max-w-2xl font-sans text-xs text-muted underline underline-offset-4 hover:text-ink sm:text-sm">
          {block.text}
        </a>
      );

    default:
      return null;
  }
}
