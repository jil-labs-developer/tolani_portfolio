import type { Block, CaseStudy } from '../types';

const img = (p: string) => `/assets/i-p.rmcdn.net/672a2fec22838d6c1d9cec45/6207066/${p}`;
const videoBase = '/assets/v-p.rmcdn1.net/672a2fec22838d6c1d9cec45/69b4738080c95a5c7b58ac2b';
const video = (id: string, hash: string) => ({
  src: `${videoBase}/${id}/${hash}/playlist.m3u8`,
  poster: `${videoBase}/${id}/${hash}/poster.jpg`,
});

const blocks: Block[] = [
  { type: 'section-heading', id: 'overview', eyebrow: 'OVERVIEW', title: "How might we help younger users discover and participate in iHeart's live radio experience?" },
  { type: 'subheading', text: 'Turning passive listeners to active participants' },
  {
    type: 'paragraph',
    text: "iHeartMedia has something most streaming platforms don't: live radio with real hosts, real moments, and real local personality. But younger users weren't staying. Over 12 weeks, we researched why, identified the gap, and redesigned the iHeart mobile app by introducing interactive live radio features and overhauling the navigation and onboarding experience to make iHeart's unique value actually discoverable. My contributions spanned secondary research, competitive analysis, ideation and wireframing, design feasibility research, and usability testing protocol.",
  },

  { type: 'section-heading', id: 'the-problem', eyebrow: 'THE PROBLEM', title: "iHeart's problem wasn't about content" },
  { type: 'paragraph', text: 'The app has plenty to offer. The experience of getting to and interacting with it was the issue.' },
  { type: 'label', text: "WHAT'S WRONG" },
  {
    type: 'bullets',
    items: [
      'Users abandoned the app before hearing a single song',
      'The features that made iHeart unique were impossible to find',
      'Live radio had no way to actually feel live',
    ],
  },

  { type: 'section-heading', id: 'opportunity', eyebrow: 'OPPORTUNITY', title: 'Make users feel like participants, not just listeners' },
  {
    type: 'paragraph',
    text: 'After synthesising research, one thing was clear: Live Radio and Podcasts are what genuinely set iHeart apart from other music streaming platforms. Fixing what makes iHeart unique would matter more than chasing features it already lacked.',
  },
  { type: 'label', text: 'HIGH-LEVEL GOALS' },
  {
    type: 'bullets',
    items: [
      'Remove the friction to get in by letting users skip unnecessary setup',
      'Give users an ability to curate their own experience by providing personlisation options',
      "Listeners had no way to interact with hosts or other listeners, making the 'live' experience feel one-sided",
    ],
  },

  { type: 'section-heading', id: 'the-solution', eyebrow: 'THE SOLUTION', title: 'A redesigned onboarding, navigation, live radio, and podcast experience for younger users' },
  {
    type: 'paragraph',
    text: 'The redesign addressed every point of friction—from a simplified onboarding flow to a restructured navigation and new interactive features that gave younger users a reason to stay enagaged.',
  },
  { type: 'link-line', text: 'Skip to design decisions', href: '#design-decisions' },

  { type: 'media-panel', label: 'ONBOARDING', video: video('69c88a5854d7286afa0e2f70', 'wSZVUqMkiHjJJHC6wQ-W-') },
  { type: 'subheading', text: 'Get in faster, decide later' },
  { type: 'paragraph', text: 'There a skip option on every screen so no questions are required. Users reach content before the app asks for their trust.' },

  { type: 'media-panel', label: 'HOME & MY PROFILE', video: video('69c88f0e4c0b7fbbaa4b6dfc', 'EZfD3cbcRBR-3H4axr-FM') },
  { type: 'subheading', text: "A personal space that's actually yours" },
  { type: 'paragraph', text: "Liked songs, playlists, and listening history are now separated from iHeart's curated content for the first time. Location, settings, and chat history all live here too." },

  { type: 'media-panel', label: 'RADIO', video: video('69c8936668f89c7535454ff0', '-mkKRBjUIO_AVPWVIHPfU') },
  { type: 'subheading', text: 'Call in. Chat. Dedicate a song' },
  { type: 'paragraph', text: 'Three new features turn passive listeners into active participants. The live radio experience now feels like being part of the show, not just tuning in.' },

  { type: 'media-panel', label: 'PODCAST', video: video('69c897fb83c62031366d2616', 'zJLY6nRj1mnD0oBnQRXJz') },
  { type: 'subheading', text: 'Bring the conversation inside the app' },
  { type: 'paragraph', text: 'Episode comments, host-created polls, and clearer navigation make podcasts a community experience. No more leaving the app for other people’s takes.' },

  { type: 'section-heading', id: 'research', eyebrow: 'RESEARCH GOALS & METHODS', title: "Understanding why younger users weren't staying" },
  {
    type: 'paragraph',
    text: "Before designing anything, I had a few questions: what are younger users' music and radio listening habits, what features do they value, what frustrates them, where does the current iHeart app create friction, and what does iHeart offer that competitors don't?",
  },
  { type: 'subheading', text: 'Market Trend Analysis' },
  { type: 'paragraph', text: 'Mapped emerging trends across radio, podcasts, and music streaming. My key takeaway was younger audiences expect interactivity, personalisation, and social features as standard.' },
  { type: 'image', src: img('image-408dcd14-e726-43b9-8990-e5d95c7721d6.png'), alt: 'Sticky notes mapping interactivity, personalisation, and social engagement trends' },
  { type: 'subheading', text: 'Competetive Analysis' },
  { type: 'paragraph', text: 'Against competitors, iHeart held its own on curated playlists and user engagement, but fell behind on personalisation and social features which, two areas younger users increasingly expect from a streaming platform.' },
  { type: 'image', src: img('image-7402e936-c533-4a9b-b1f2-901021834465.png'), alt: 'Logos of competing streaming apps: Audacy, TuneIn, Pandora, Spotify, Apple Music' },
  { type: 'subheading', text: 'Digital Ethnography' },
  { type: 'paragraph', text: 'Analysed user reviews across Reddit, Yelp, Google, and the App Store. The recurring complaints centered on excessive ads, repetitive content, and confusing navigation.' },
  { type: 'subheading', text: 'Cognitive Task Analysis' },
  { type: 'paragraph', text: 'Walked through the entire app from sign-in to every feature. I could surface navigation gaps, confusing iconography, and features that were effectively hidden from users.' },
  { type: 'subheading', text: 'User Interviews' },
  { type: 'paragraph', text: 'Interviewed six users aged 19–25 about streaming habits, pain points, and social behaviors, and they expressed a strong desire for personalisation, collaborative features, and shorter podcast formats.' },
  { type: 'image', src: img('image-d7e03f92-bdfa-427c-bee1-e73646616630.png'), alt: 'User interview synthesis notes' },
  { type: 'label', text: 'KEY INSIGHTS' },
  {
    type: 'card-grid',
    columns: 1,
    cards: [
      { title: '→  Onboarding was losing users before they heard a song', body: "82% of users had friction with the onboarding process. Some objected to being asked for their gender or date of birth before they'd heard a single song. Others dropped off because the flow was too long." },
      { title: '→  The navigation hid the best parts of the app', body: "Users couldn't find what they were looking for. Saved playlists were buried in the same space as iHeart's curated content. The search function didn't work as expected. Icons were unclear and confused nearly every user. One user spent several minutes unable to find a playlist they'd just created." },
      { title: '→  Live radio had no way to be actually live', body: "Young users came to iHeart for live radio—but they couldn't message the host, request a song, or connect with other listeners. Radio's defining quality—communal, live energy, wasn't in the app." },
      { title: '→  The UI felt cluttered and disengaging', body: "The app opened playing music before users had chosen anything. Ads played over content without pausing it. For an audience that makes quick judgments about whether an app feels worth their time, the first few seconds weren't landing." },
    ],
  },

  { type: 'section-heading', id: 'design-decisions', eyebrow: 'DESIGN DECISIONS', title: 'From findings to features' },
  { type: 'paragraph', text: 'We generated 20+ ideas in brainstorming and narrowed to a focused set of features after presenting concepts to our project sponsors and testing them against user and business needs.' },

  { type: 'subheading', text: "Streamlined onboarding—skip what doesn't matter yet" },
  { type: 'paragraph', text: 'We removed the requirement for demographic questions like gender and date of birth at signup, and restructured the flow to let users skip any screen that wasn’t essential to creating an account. Users could complete onboarding in fewer steps and get to content faster.' },
  { type: 'paragraph', text: 'We also rewrote the question framing so instead of the clinical "What is your gender?", the new screen reads "Tell Us About Yourself" with a warmer, more inviting tone.' },
  { type: 'before-after', image: img('image-b348d0bc-9753-452e-853d-033a32ac9d7d.png') },

  { type: 'subheading', text: 'My Profile—A Centralised Personal Space' },
  { type: 'paragraph', text: 'The top navigation was redesigned around a "My Profile" drawer that combined system settings and user preferences in one place. The key addition: "My Library" is a dedicated section that gives users clear, separate access to their liked songs, created playlists, and downloads.' },
  { type: 'paragraph', text: "This solved the core discovery problem. Users could finally find what they'd saved without it getting mixed in with iHeart's curated content. We also added Chat History—a persistent record of all their live chat and community interactions—and surfaced location settings at the top of the drawer after testing revealed users couldn't find it anywhere." },
  { type: 'paragraph', text: 'The "My Profile" icon replaced a confusing gear icon in the navigation bar, making it immediately recognizable as a personal space.' },
  { type: 'before-after', image: img('image-dbae6a26-ca3d-432a-a829-95e3f74f1c7e.png') },

  { type: 'subheading', text: 'Live Radio—Turn Listeners Into Participants' },
  { type: 'paragraph', text: "This was the most consequential design area, and where iHeart's real competitive advantage lived. Live Radio and Podcasts are things other music streaming platforms simply don't do the same way. We added three new interactive features to the live radio playback screen:" },
  { type: 'paragraph', text: 'Call Your Host: listeners can call the live show directly and go on air. Live Chat: a shared real-time chat room for everyone tuned into the same station. Song Dedication: a form to dedicate a song live on air, with a personalized message.' },
  { type: 'paragraph', text: 'These features transformed the passive listening experience into something communal. The visual design of the playback screen was also updated, replacing the cluttered, flat layout of the original.' },
  { type: 'before-after', image: img('image-f5422f23-a74f-4b03-b264-e6b6fac81bfb.png') },

  { type: 'subheading', text: 'Podcast Community—Comments, Polls, Connection' },
  { type: 'paragraph', text: "Users interviewed said they wanted to know other people's takes on episodes. They were already doing this informally through friends' recommendations and forums, so we brought that conversation directly into the app." },
  { type: 'paragraph', text: 'The redesigned podcast episode page added a community section where listeners can leave comments, reply to others, and participate in host-created polls. Podcast creators can use polls to gather real-time audience feedback. Users can track all their interactions through the Chat History in My Profile.' },
  { type: 'paragraph', text: 'We also decluttered the episode list view, adding clearer episode sorting, making the "Mark as Played" icon legible with supporting text, and adding podcast ratings to help users evaluate new shows.' },
  { type: 'before-after', image: img('image-baba1163-a9fa-40d3-a5c2-0c8277ddb5d3.png') },

  { type: 'section-heading', id: 'testing', eyebrow: 'TESTING & ITERATION', title: 'The prototype taught us three things' },
  { type: 'paragraph', text: 'I tested the prototype on Usertesting.com with real participants completing 24 structured tasks. The sessions surfaced three concrete issues that changed the design before we finalised it.' },

  { type: 'subheading', text: "Users couldn't find Location settings" },
  { type: 'paragraph', text: 'Location was buried in Advanced Settings. We moved it to the top of the My Profile drawer, where users intuitively looked first.' },
  { type: 'before-after', image: img('image-032facd3-2016-4373-8e34-697ea242ff2f.png') },

  { type: 'subheading', text: 'Song Dedication felt limited to the current song' },
  { type: 'paragraph', text: 'Users assumed Song Dedication only applied to what was currently playing. We relocated it to the main station page, making it clear any song could be requested.' },
  { type: 'before-after', image: img('image-8c148d94-8ad8-403a-bec0-90afecd43663.png') },

  { type: 'subheading', text: '"Mark as Played" icon was unrecognizable' },
  { type: 'paragraph', text: 'The checkmark icon in podcasts had confused users in both rounds of testing. We added supporting text labels so the function was clear without relying on icon recognition alone.' },
  { type: 'before-after', image: img('image-ee11b820-86b2-49a8-b45a-40969e5661b5.png') },

  { type: 'section-heading', id: 'next-steps', eyebrow: 'NEXT STEPS', title: "What we'd build with more time" },
  { type: 'paragraph', text: "Three features we ideated and prototyped that we couldn't fully validate in time" },
  {
    type: 'bullets',
    items: [
      'Hands-Free Mode: Young users multitask constantly while listening so voice-controlled interaction with the app was an idea that we prototyped but didn’t test.',
      'Podcast Ratings + Queue: Users want to evaluate podcasts before committing, and they want an add-to-queue option like the one they have for music.',
    ],
  },

  { type: 'section-heading', id: 'what-i-learned', eyebrow: 'WHAT I LEARNED', title: '' },
  { type: 'quote', text: "This project taught me that taking ownership isn't about having all the answers but about being willing to show up for a piece of the work." },
  {
    type: 'bullets',
    items: [
      'I learned that teamwork requires both grace and accountability. It involves giving space to others while taking ownership of my contributions',
      'I saw the importance of validating assumptions with users. Even “obvious” ideas sometimes failed in testing',
      'During this project, I practiced designing within business constraints. I understand the importance of aligning designs with company strategy and resources',
    ],
  },
];

export const iheart: CaseStudy = {
  slug: 'iheart',
  title: "Redesigning iHeart's live radio experience for the generation that wants to be heard",
  navTitle: '[UX Research & Interaction Design]',
  accent: 'var(--color-iheart)',
  heroImages: [img('image-5ab1d625-e3d2-4e2a-8868-36238c8bb16a.png')],
  sidebar: [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'the-problem', label: 'THE PROBLEM' },
    { id: 'opportunity', label: 'OPPORTUNITY' },
    { id: 'the-solution', label: 'THE SOLUTION' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'design-decisions', label: 'DESIGN DECISIONS' },
    { id: 'testing', label: 'TESTING & ITERATION' },
    { id: 'next-steps', label: 'NEXT STEPS' },
    { id: 'what-i-learned', label: 'WHAT I LEARNED' },
  ],
  blocks,
  complete: true,
};
