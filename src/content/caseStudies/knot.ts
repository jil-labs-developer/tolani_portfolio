import type { Block, CaseStudy } from '../types';

const img = (p: string) => `/assets/i-p.rmcdn.net/672a2fec22838d6c1d9cec45/6207066/${p}`;

const blocks: Block[] = [
  { type: 'section-heading', id: 'overview', eyebrow: 'OVERVIEW', title: 'How might we help adults in their 20s maintain close long-distance friendships amidst life transitions and busy schedules?' },
  { type: 'subheading', text: 'Promoting mutual understanding between long-distance friends' },
  {
    type: 'paragraph',
    text: "Adults in their 20s navigating relocation and new routines don't necessarily lose the desire to stay close to their friends. They struggle with existing in the shared context that makes closeness feel effortless. Existing tools treat this as a communication frequency problem and respond with nudges, streaks, and scheduling features but my user research suggested the real gap was elsewhere.",
  },
  {
    type: 'paragraph',
    text: "Over one semester, I led end-to-end research and design on Knot, a mobile app that utilises the home screen widget to help adults maintain close long-distance friendships. Through surveys, semi-structured interviews, digital ethnography, and a literature review, I identified mutual understanding—not communication frequency—as the load-bearing insight. That reframe shaped every subsequent design decision. Knot's three core features build, maintain, and activate shared context.",
  },

  { type: 'section-heading', id: 'the-origin', eyebrow: 'THE ORIGIN', title: 'Where this started' },
  {
    type: 'paragraph',
    text: 'This project was inspired by my best friend. She has had close friends move away at different points in her life, and even though she genuinely cares about them, the active work of maintaining those friendships has never come easily to her. Checking in, knowing when to reach out, keeping a connection alive across distance, require sustained effort which she finds difficult, even when the care itself is clearly there. I watched this pattern play out multiple times and listened to her berate herself for it. If the intention exists but the friendship still fades, something else must be getting in the way. If it is not indifference, what is it?',
  },
  {
    type: 'paragraph',
    text: 'That question is what pulled me toward this as a design problem. Most existing tools treat long-distance friendship maintenance as a communication frequency problem. Wenhart et al. (2025) reviewed 241 technologies designed for connection and found that most focus on the mechanics of contact. Very few address the foundation that makes communication feel meaningful in the first place. My aim was to take a different approach: rather than optimising how friends communicate, this project asks what needs to be true about their understanding of each other before communication can feel effortless.',
  },

  { type: 'section-heading', id: 'the-problem', eyebrow: 'THE PROBLEM', title: 'When adults relocate, their close friendships lose the conditions that made them effortless' },
  {
    type: 'paragraph',
    text: "Apart, friendships require a kind of work they never did before. For a lot of people, that work becomes too much—so friendships fade not because anyone stopped caring, but because life got in the way. The existing tools people use—messaging apps, video call platforms, and social media—to stay connected were designed for communication, not to support the relationship underneath it.",
  },
];

export const knot: CaseStudy = {
  slug: 'knot',
  title: 'Maintaining long-distance friendships through mutual understanding',
  navTitle: '[UX Research & Product Design]',
  accent: 'var(--color-knot)',
  heroImages: [img('image-fab18a4a-6008-425d-bfa4-bf33314b7965.png')],
  sidebar: [],
  blocks,
  complete: false,
};
