import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchAbout, CONTACT } from '../content';

export function AboutPage() {
  const { data: about } = useQuery({ queryKey: ['about'], queryFn: fetchAbout });
  if (!about) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 sm:grid-cols-2">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          src={about.photo}
          alt="Tolani Adekoya"
          className="w-full rounded"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <h1 className="font-script text-4xl text-brand sm:text-5xl">Hello,</h1>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="font-sans text-sm leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <p className="font-sans text-sm leading-relaxed text-muted">
            If you'd like to connect, you can reach me by{' '}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-ink">
              email
            </a>{' '}
            or on{' '}
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-ink">
              linkedin
            </a>
            , or grab my{' '}
            <a href={CONTACT.resume} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-ink">
              resume
            </a>
            .
          </p>
          <p className="mt-4 font-script text-2xl text-brand">
            Staying curious,
            <br />
            Tolani
          </p>
          <img src={about.signature} alt="" className="w-40" />
        </motion.div>
      </div>
    </div>
  );
}
