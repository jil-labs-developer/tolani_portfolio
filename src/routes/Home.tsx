import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchHome } from '../content';
import type { WorkCard } from '../content/types';
import { Reveal } from '../components/Reveal';

const asset = (p: string) => `/assets/i-p.rmcdn.net/672a2fec22838d6c1d9cec45/6207066/${p}`;
const clipPin = asset('image-de640239-ffbe-4765-bc0e-8679bce397ae.png');
const starPin = asset('image-506a1e0c-aa33-47ec-a36d-d101f19f9370.png');

function WorkCardTile({ card }: { card: WorkCard }) {
  const content = (
    <>
      <div className="overflow-hidden rounded">
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <h3 className="font-serif text-2xl text-ink">{card.title}</h3>
        <p className="mt-1 font-sans text-sm text-muted">{card.description}</p>
      </div>
    </>
  );
  return (
    <Reveal>
      {card.href ? (
        <Link to={card.href} className="group flex flex-col gap-4">
          {content}
        </Link>
      ) : (
        <div className="group flex flex-col gap-4">{content}</div>
      )}
    </Reveal>
  );
}

export function HomePage() {
  const { data: home } = useQuery({ queryKey: ['home'], queryFn: fetchHome });
  if (!home) return null;

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="flex flex-col items-center gap-16 py-20 text-center sm:py-28">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-script text-6xl text-brand sm:text-8xl"
        >
          Tolani Adekoya
        </motion.h1>

        <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, rotate: -6, y: 20 }}
            animate={{ opacity: 1, rotate: -4, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="relative rounded border border-yellow-600/40 bg-card p-6 text-left"
          >
            <img src={clipPin} alt="" className="absolute -top-5 left-10 w-10" />
            <p className="font-serif text-lg text-muted sm:text-xl">{home.intro}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 6, y: 20 }}
            animate={{ opacity: 1, rotate: 2, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="relative rounded border border-yellow-600/40 bg-card p-6 text-left"
          >
            <img src={starPin} alt="" className="absolute -top-6 left-10 w-9" />
            <p className="font-mono text-sm leading-relaxed text-muted">{home.note}</p>
          </motion.div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 pb-20">
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {home.workCards.map((card) => (
            <WorkCardTile key={card.title} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}
