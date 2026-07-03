// ─────────────────────────────────────────────────────────────────
// constants/data.ts — All portfolio content as typed, structured data
// Update this file with your real info; all components pull from here.
// ─────────────────────────────────────────────────────────────────

export interface PersonInfo {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  bio: string[];
  resumeUrl: string;
}

export interface Education {
  school: string;
  degree: string;
  program: string;
  faculty: string;
  intake: string;
  expectedGrad: string;
  coursework: string[];
}

export interface Job {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  bullets: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'email' | 'twitter';
}

// ── Person ──────────────────────────────────────────────────────
export const PERSON: PersonInfo = {
  name: 'Medhansh Negi',
  firstName: 'Medhansh',
  title: 'Math Student & Software Developer',
  tagline: 'Building things at the intersection of math and software.',
  bio: [
    'I\'m Medhansh — a Bachelor of Mathematics student at the University of Waterloo (Fall 2026 intake), passionate about algorithms, data-driven products, and clean software design.',
    'I love turning abstract ideas into real, working systems — from analysing datasets to shipping full-stack applications. Currently exploring competitive programming, ML fundamentals, and modern web development.',
  ],
  resumeUrl: '/resume.pdf',
};

// ── Education ───────────────────────────────────────────────────
export const EDUCATION: Education = {
  school: 'University of Waterloo',
  degree: 'Bachelor of Mathematics',
  program: 'Mathematics',
  faculty: 'Faculty of Mathematics',
  intake: 'Fall 2026',
  expectedGrad: 'Spring 2030',
  coursework: [
    'Calculus I & II',
    'Linear Algebra',
    'Introduction to CS (CS 135)',
    'Statistics & Probability',
    'Algorithm Design',
  ],
};

// ── Experience ──────────────────────────────────────────────────
export const EXPERIENCE: Job[] = [
  {
    id: 'exp-1',
    company: 'Daffodil Dressup',
    role: 'iOS Developer Intern',
    dateRange: 'May–Aug 2025',
    location: 'Atlanta GA',
    bullets: [
      'Full-scale iOS app in SwiftUI, 120+ clothing options, UI mirroring website aesthetic',
      'Category filtering, featured products, cart, click impressions with AI'
    ],
    tags: ['SwiftUI', 'iOS', 'AI']
  },
  {
    id: 'exp-2',
    company: 'Robotics & ML Apprenticeship',
    role: 'Robotics & ML Apprentice',
    dateRange: 'Aug–Sept 2025',
    location: 'Mississauga ON',
    bullets: [
      'Observed robotic medication dispensing workflows',
      'Studied foundational ML: AI doc processing, summarization, workflow automation',
      'Built AI PDF analysis prototype using LLM-based summarization'
    ],
    tags: ['Robotics', 'Machine Learning', 'AI']
  }
];

// ── Projects ─────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Deeplearning.AI Stanford Cert',
    bullets: [
      'Full-stack Flask + React app, GitHub OAuth, Celery + Redis async tasks'
    ],
    tech: ['Python', 'MongoDB', 'Jupyter'],
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Github Profile Analyzer',
    bullets: [
      '20+ language metrics, MOG showdown mode (10-metric comparison, score out of 100), recruiter mode for 5+ roles'
    ],
    tech: ['JS', 'HTML', 'CSS', 'React', 'Vite', 'Node', 'Groq'],
    featured: true
  }
];

// ── Skills ───────────────────────────────────────────────────────
export const SKILLS: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Node.js', 'pandas', 'NumPy', 'Tailwind CSS'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Figma', 'Linux'],
  },
  {
    category: 'Mathematics & CS',
    skills: ['Linear Algebra', 'Calculus', 'Probability', 'Algorithm Design', 'Data Structures', 'Dynamic Programming'],
  },
  {
    category: 'Artificial Intelligence',
    skills: ['Claude', 'Antigravity', 'Claude Code', 'Cursor', 'Gemini'],
  },
];

// ── Contact ──────────────────────────────────────────────────────
export const CONTACT: ContactLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Med-NCoding',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/medhansh-negi-22204a367/',
    icon: 'linkedin',
  },
];
