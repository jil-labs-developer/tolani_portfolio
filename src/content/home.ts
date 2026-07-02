import type { WorkCard } from './types';

const asset = (p: string) => `/assets/i-p.rmcdn.net/672a2fec22838d6c1d9cec45/6207066/${p}`;

export const home = {
  intro: "I design from insight, build for function, and make it beautiful on the way there",
  note: "Recently completed a Master's in Human-Computer Interaction Design at IUB + currently seeking product design and research roles",
  workCards: [
    {
      title: 'iHeart Media',
      description: 'Redesigning the mobile radio experience for a younger generation of listeners.',
      image: asset('image-a4154b62-3c6a-4aec-8da4-07cdcc778756.png'),
      href: '/iheart',
    },
    {
      title: 'Knot',
      description: 'Designing a companion app for maintaining long-distance friendships through mutual understanding.',
      image: asset('image-2b474f66-0040-4a5e-b929-62c76a6cc7e7.png'),
      href: '/knot',
    },
    {
      title: 'Bloomington Center for Connection',
      description: 'Researching the operational gap between how administrators and clinicians used the same system.',
      image: asset('image-0775383a-ecfc-4f45-999b-957d7c1746a3.png'),
      href: '/ehr',
    },
    {
      title: 'Balance Life Design',
      description: "Synthesising early user feedback to inform product and positioning decisions at Balance Life Design.",
      image: asset('image-78c3c267-062f-4a44-baa8-c10100cdb088.png'),
    },
  ] satisfies WorkCard[],
};
