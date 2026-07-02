import type { Block, CaseStudy } from '../types';

const img6207066 = (p: string) => `/assets/i-p.rmcdn.net/672a2fec22838d6c1d9cec45/6207066/${p}`;
const img5801868 = (p: string) => `/assets/i-p.rmcdn.net/672a2fec22838d6c1d9cec45/5801868/${p}`;

const blocks: Block[] = [
  { type: 'section-heading', id: 'overview', eyebrow: 'OVERVIEW', title: 'How might we help the Bloomington Center for Connection serve their clients better by improving how their team works?' },
  { type: 'subheading', text: 'Surfacing the gap between what admins knew and what clinicians experienced' },
  {
    type: 'paragraph',
    text: 'The Bloomington Center for Connection is a small mental health practice built on Relational-Cultural Therapy—a model that centers growth through authentic human connection. They came to us with what seemed like a straightforward ask: their EHR platform, SimplePractice, had gaps. Over the semester, we found the problem was far more complex than that.',
  },

  { type: 'section-heading', id: 'the-problem', eyebrow: 'THE PROBLEM', title: 'It wasn’t just the software. Administrators and clinicians were using the same tools to do completely different jobs' },
  { type: 'paragraph', text: "The BCC's EHR worked fine on paper. But administrators and clinicians were using the same tools to do completely different jobs" },
  { type: 'label', text: "WHAT'S WRONG" },
  {
    type: 'bullets',
    items: [
      'Rooms were being double-booked with no digital way to resolve it',
      'Clinicians had no visibility into room scheduling unless they physically checked the whiteboard in the common area',
      'SimplePractice couldn’t send messages to groups of patients which was critical as the BCC expanded into group therapy',
      'Insurance documentation requirements pulled clinicians away from the relational work RCT requires',
    ],
  },

  { type: 'section-heading', id: 'what-we-assumed', eyebrow: 'WHAT WE ASSUMED', title: 'We thought we were solving a software problem' },
  { type: 'paragraph', text: 'We went in expecting to evaluate SimplePractice, find its gaps, and recommend a better EHR. We also assumed that administrators and clinicians had the same understanding of what was broken.' },
  { type: 'paragraph', text: "We spent the first weeks of the project almost entirely with administrators. They were accessible and gave us a detailed picture of how the clinic operated. What we didn't realise until later was that we were only getting one side of the story, and that clinicians, once we reached them, had a meaningfully different experience of the same system." },

  { type: 'section-heading', id: 'research-method', eyebrow: 'RESEARCH METHOD', title: 'Clinicians had limited availability for direct interviews, so we designed a method that worked around their schedules' },
  { type: 'paragraph', text: 'Because clinicians had limited availability for direct interviews, we designed an asynchronous evaluation method instead. I created a two-axis diagram mapping the BCC’s current system across actors and channels, which both clinicians and administrators could annotate independently on their own time—correcting assumptions, adding missing pieces, and describing their ideal state.' },
  { type: 'image', src: img5801868('image-9ad737e0-bb8b-4c76-92f2-0e51902c0bc1.png'), alt: 'Two-axis diagram mapping actors and channels in the current system' },

  { type: 'section-heading', id: 'the-contradiction', eyebrow: 'THE CONTRADICTION', title: 'The same system. Two different experiences' },
  { type: 'paragraph', text: 'When the evaluation forms came back from clinicians, the picture shifted. Administrators had described the system as manageable while the clinicians described something different. Either side was not wrong, but they were experiencing the same system from opposite ends of it.' },

  { type: 'subheading', text: 'The whiteboard scheduling system' },
  {
    type: 'card-grid',
    columns: 2,
    cards: [
      { eyebrow: 'ADMIN', title: '', body: "The whiteboard gives us control. We know each clinician's tendencies and their clients. That implicit knowledge is what makes the BCC special." },
      { eyebrow: 'CLINICIANS', title: '', body: 'Changes to room assignment need to go through admin, and it could be more of a shared task if clinicians could digitally view room availability.' },
    ],
  },
  { type: 'bullets', items: ["Clinicians weren't asking for full control over room assignments. They just wanted visibility into what was scheduled, and the current system didn't allow for that."] },

  { type: 'subheading', text: 'Client communication' },
  {
    type: 'card-grid',
    columns: 2,
    cards: [
      { eyebrow: 'ADMIN', title: '', body: 'Communication is handled through SimplePractice, email, phone, and SMS as needed. We manage it centrally.' },
      { eyebrow: 'CLINICIANS', title: '', body: 'Client communication can easily get lost between the office phone, office email, individual emails, and individual phones.' },
    ],
  },
  { type: 'bullets', items: ['Administrators described client communication as manageable while clinicians described the same system as fragmented, with messages frequently getting lost across channels.'] },

  { type: 'subheading', text: 'Insurance documentation' },
  {
    type: 'card-grid',
    columns: 2,
    cards: [
      { eyebrow: 'ADMIN', title: '', body: "Insurance is a hassle but it's a necessary part of operating. We manage the filing process centrally." },
      { eyebrow: 'CLINICIANS', title: '', body: 'Notes need to meet very specific criteria to qualify for insurance reimbursement, which takes time and attention away from the actual work of therapy.' },
    ],
  },
  { type: 'bullets', items: ['The documentation burden fell most heavily on clinicians, pulling their focus away from therapy and toward writing notes that would satisfy insurance criteria rather than reflect the actual work being done in the room.'] },

  { type: 'section-heading', id: 'the-reframe', eyebrow: 'THE REFRAME', title: 'We shifted from evaluating software to understanding the system the software lived inside' },
  { type: 'paragraph', text: 'At midterm critique, our instructors pushed back on our framing. We had been approaching this as a platform evaluation problem without enough attention to the people using these tools and why they experienced them differently. Our project sponsor reinforced this separately and advised us not to try to solve everything at once, but to find tools that addressed one problem area well without disrupting the existing workflow.' },
  {
    type: 'card-grid',
    columns: 2,
    cards: [
      { eyebrow: 'PROBLEM 1', title: 'Insurance pressure on therapy quality', body: "Insurance forces clinicians to document in ways that conflict with RCT. The BCC's long-term goal is to move away from insurance reimbursement entirely." },
      { eyebrow: 'PROBLEM 2', title: 'Room scheduling lives on a whiteboard', body: 'SimplePractice has no room-filtering. Admins manually transfer appointments to a physical whiteboard every morning, giving admin control but leaving clinicians without visibility.' },
      { eyebrow: 'PROBLEM 3', title: 'No way to message clients as a group', body: 'SimplePractice supports individual messaging but not group announcements. With the BCC expanding into group therapy, this gap was increasingly costly.' },
    ],
  },

  { type: 'section-heading', id: 'recommendations', eyebrow: 'RECOMMENDATIONS', title: 'Three tools, each addressing one problem area' },
  { type: 'paragraph', text: "Each recommendation was evaluated against the BCC's specific context, including HIPAA compliance, sensitivity of client data, small-practice budget, and compatibility with Relational-Cultural Therapy." },

  { type: 'label', text: 'PROBLEM 1—SCHEDULING' },
  { type: 'subheading', text: 'Jane' },
  { type: 'paragraph', text: 'From over 20 EHR systems evaluated, Jane stood out for its room-filtering calendar, double-booking prevention, waitlist management, group appointment support, and secondary insurance filing. It also provides data migration guidance for practices moving from SimplePractice, which removes one of the biggest practical barriers to switching platforms.' },
  { type: 'tags', items: ['GROUP THERAPY', 'SECONDARY INSURANCE', 'DATA MIGRATION SUPPORT'] },

  { type: 'label', text: 'PROBLEM 2—ROOM MANAGEMENT' },
  { type: 'subheading', text: 'Envoy' },
  { type: 'paragraph', text: 'Envoy is a room-scheduling platform, not an EHR. Because it handles no patient data, it falls outside HIPAA compliance requirements, which administrators flagged as a significant training burden. Clinicians can view room availability without going through admin, while administrators retain final say over assignments. The tablet check-in feature also creates a more private, low-friction arrival experience for clients who are often anxious when entering the clinic.' },
  { type: 'tags', items: ['VISIBLE ROOM MANAGEMENT', 'PRESERVES ADMIN OVERSIGHT', 'PRIVATE CLIENT CHECK-IN'] },

  { type: 'label', text: 'PROBLEM 3—GROUP COMMUNICATION' },
  { type: 'subheading', text: 'TigerConnect' },
  { type: 'paragraph', text: "TigerConnect fills the gap SimplePractice doesn't address: broadcast messaging to groups of clients, scheduled appointment reminders, and two-way HIPAA-compliant SMS—without requiring clients to download an app or log into a portal. Clinicians' personal phone numbers are masked, which protects their privacy while still enabling the direct communication RCT depends on." },
  { type: 'tags', items: ['BROADCAST MESSAGING', 'HIPAA-COMPLAINT SMS', 'NO APP REQUIRED FOR CLIENTS', 'NUMBER MASKING'] },

  { type: 'section-heading', id: 'projected-impact', eyebrow: 'PROJECTED IMPACT', title: '' },
  {
    type: 'card-grid',
    columns: 2,
    cards: [
      { eyebrow: 'ADMINISTRATION', title: 'Shared scheduling, not lost control', body: "Both Envoy and Jane preserve admin's final say while giving clinicians visibility. The whiteboard can be retired without sacrificing institutional knowledge." },
      { eyebrow: 'CLINICIANS', title: 'More time for actual therapy', body: "Room visibility without admin bottleneck. Automated reminders reduce no-shows without manual follow-up. Insurance burden addressed through BCC's own long-term plan." },
      { eyebrow: 'CLIENTS', title: 'A more seamless experience', body: "Private check-in, timely reminders, and clinicians who aren't stretched thin by admin burden—all of this flows downstream to the quality of care clients receive." },
    ],
  },

  { type: 'section-heading', id: 'what-i-learned', eyebrow: 'WHAT I LEARNED', title: '' },
  { type: 'quote', text: 'This project taught me that access determines whose story you tell, and that recognising that bias early enough to correct it is itself a research skill.' },
  {
    type: 'bullets',
    items: [
      "When your research method isn't working, design a new one — Clinicians had limited availability for direct interviews, so I designed an asynchronous evaluation method instead. That decision shaped the entire second half of the project.",
      'When one group is easier to reach than another, their perspective dominates the research by default — We spent the first half of the semester almost entirely with administrators, not by choice but by availability. Recognizing that gap and designing around it was one of the most important decisions we made on the project.',
      "Constraints narrow the solution space usefully — HIPAA compliance, client sensitivity, and the BCC's RCT values all shaped the recommendations, and working within those constraints made them more specific and more honest.",
    ],
  },
];

export const ehr: CaseStudy = {
  slug: 'ehr',
  title: "Redesigning the BCC's operational system for the people who work inside it",
  navTitle: '[UX Research & Systems Analysis]',
  accent: 'var(--color-ehr)',
  heroImages: [img5801868('image-a5a0afe2-4558-4b79-a292-be8f650882c7.png')],
  sidebar: [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'the-problem', label: 'THE PROBLEM' },
    { id: 'what-we-assumed', label: 'WHAT WE ASSUMED' },
    { id: 'research-method', label: 'RESEARCH METHOD' },
    { id: 'the-contradiction', label: 'THE CONTRADICTION' },
    { id: 'the-reframe', label: 'THE REFRAME' },
    { id: 'recommendations', label: 'RECOMMENDATIONS' },
    { id: 'projected-impact', label: 'PROJECTED IMPACT' },
    { id: 'what-i-learned', label: 'WHAT I LEARNED' },
  ],
  blocks,
  complete: true,
};
