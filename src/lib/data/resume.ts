// ── Types ──────────────────────────────────────────────

export type AboutContactRow =
  | { kind: 'text'; label: string; value: string }
  | { kind: 'email'; label: string; address: string }
  | { kind: 'link'; label: string; href: string; text?: string };

export interface About {
  name: string;
  role: string;
  location: string;
  headline: string;
  intro: string;
  /** Page description for search results and link previews. */
  summary: string;
  contact: AboutContactRow[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  bullets: string[];
}

export interface SkillItem {
  name: string;
  pinned?: boolean;
}

export interface SkillCategory {
  label: string;
  items: SkillItem[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  mode?: string;
  status?: string;
  description: string;
  achievements: string[];
}

export interface Resume {
  about: About;
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  education: Education[];
}

// ── Data ───────────────────────────────────────────────

export const resume: Resume = {
  about: {
    name: 'Vinh Le',
    role: 'Full-stack Developer',
    location: 'VIC, Australia',
    headline: 'Anything and everything coding',
    intro:
      'Computer Science graduate with a Data Science major, currently™ pursuing Master of IT in Software Development while working as a Full-stack developer at the same time. I build web apps, browser extensions, automation workflows through TypeScript, React, and setting up infrastructure on AWS that they rely on.',
    summary:
      'Full-stack developer in Victoria, Australia, working with TypeScript, React, and AWS on web apps, browser extensions, and automation.',
    contact: [
      { kind: 'email', label: 'Email', address: 'lpvinh2k4@gmail.com' },
      { kind: 'text', label: 'Phone', value: '+61 433 443 221' },
      { kind: 'link', label: 'GitHub', href: 'https://github.com/VinhLe1410' },
      { kind: 'link', label: 'LinkedIn', href: 'https://linkedin.com/in/vinhle1410' },
    ],
  },

  experience: [
    {
      role: 'Junior Full Stack Developer',
      company: 'Evolit Pty Ltd',
      location: 'Onsite - Remote',
      period: 'Feb 2025 - Present',
      summary:
        'Work with clients to turn requirements and feedback into development plans, then build web apps, browser extensions, and automation using TypeScript, React, and AWS',
      highlights: [
        "Built a Chrome extension that compares records against the client's CRM and downloads many files at once. It queues downloads, shows per-file status, retries failures, handles rate limits, and refreshes access tokens on AWS.",
        'Building a web portal for education providers in Vietnam to manage courses, teaching content, students, enrollments, feedback, and staff with more™ to come.',
      ],
      bullets: [
        'Set up infrastructure with AWS CDK and Terraform, and GitHub Actions workflows for builds, deployments, and release packaging.',
        'Set up and maintained Nx monorepos to share libraries between web applications and automation workflows.',
        'Delivered automation workflows for CRMs and cloud drives, React back-office apps, a CRM widget with voice calling, and a Chrome extension.',
        'Worked with clients to turn business requirements and product feedback into epics, milestones, and tickets in GitHub Projects or Jira.',
        'Developed both through hand-writing code (before) and now actively with coding agents such as Claude Code, Cursor, Codex, Amp.',
        'Maintain and refine agent workflows for the team to reduce unnecessary token use and make the tools easier to work with.',
      ],
    },
    {
      role: 'Tech Lead / Full Stack Developer',
      company: 'Learning Portal for EdBright Tutoring',
      location: 'Remote',
      period: 'Aug 2025 — Feb 2026',
      summary: 'Led architecture and full-stack development for a multi-role educational web application.',
      highlights: [
        'Designed and enforced front-end and back-end architecture, including folder structure, data flow, and API integration.',
        'Built responsive and accessible UIs using Tailwind CSS, focusing on child-friendly, interactive user experiences.',
      ],
      bullets: [
        'Tech Lead & primary Full-Stack Developer for a multi-role educational web application.',
        'Led major codebase refactors, adopting React Query for server-state management to improve performance, caching, and maintainability.',
        'Translated business and educational requirements into database schema design and back-end logic.',
        'Used AI-assisted tooling during refactors to plan, validate, and implement changes while preserving existing functionality and code standards.',
        'Supporting deployment and post-release technical issues, assisting stakeholders with configuration and troubleshooting.',
      ],
    },
  ],

  skills: [
    {
      label: 'AWS & Infrastructure',
      items: [
        { name: 'AWS CDK', pinned: true },
        { name: 'Terraform', pinned: true },
        { name: 'Lambda', pinned: true },
        { name: 'Route 53' },
        { name: 'CloudFormation', pinned: true },
        { name: 'AWS Amplify' },
        { name: 'DynamoDB' },
        { name: 'Cognito', pinned: true },
        { name: 'Secrets Manager', pinned: true },
        { name: 'CloudWatch', pinned: true },
        { name: 'SQS', pinned: true },
        { name: 'SNS' },
        { name: 'API Gateway', pinned: true },
        { name: 'S3', pinned: true },
        { name: 'EC2' },
      ],
    },
    {
      label: 'Web Development',
      items: [
        { name: 'Next.js' },
        { name: 'React', pinned: true },
        { name: 'Tailwind CSS', pinned: true },
        { name: 'TanStack Query', pinned: true },
        { name: 'Svelte / SvelteKit', pinned: true },
        { name: 'WXT', pinned: true },
        { name: 'shadcn/ui', pinned: true },
        { name: 'Zod', pinned: true },
        { name: 'Hono', pinned: true },
        { name: 'Nx Monorepo', pinned: true },
        { name: 'Node.js', pinned: true },
        { name: 'Bun', pinned: true },
        { name: 'Vue.js' },
        { name: 'Expo' },
        { name: 'tRPC' },
        { name: 'Turborepo' },
      ],
    },
    {
      label: 'Tools',
      items: [
        { name: 'Docker', pinned: true },
        { name: 'Claude Code', pinned: true },
        { name: 'Codex', pinned: true },
        { name: 'Pi Agent', pinned: true },
        { name: 'pnpm', pinned: true },
        { name: 'Excalidraw' },
        { name: 'Postman' },
        { name: 'OrbStack' },
        { name: 'Figma' },
        { name: 'Draw.io' },
      ],
    },
    {
      label: 'Languages',
      items: [
        { name: 'JavaScript', pinned: true },
        { name: 'TypeScript', pinned: true },
        { name: 'C++' },
        { name: 'Ruby' },
        { name: 'SQL', pinned: true },
        { name: 'HTML' },
        { name: 'PHP' },
        { name: 'CSS' },
      ],
    },
    {
      label: 'Databases & ORMs',
      items: [
        { name: 'MySQL' },
        { name: 'PostgreSQL', pinned: true },
        { name: 'SQLite', pinned: true },
        { name: 'Drizzle', pinned: true },
        { name: 'NoSQL' },
      ],
    },
    {
      label: 'Project Management',
      items: [{ name: 'Jira', pinned: true }],
    },
    {
      label: 'Testing & CI/CD',
      items: [
        { name: 'Vitest', pinned: true },
        { name: 'Playwright', pinned: true },
        { name: 'GitHub', pinned: true },
        { name: 'GitHub Actions', pinned: true },
        { name: 'GitLab' },
      ],
    },
    {
      label: 'IDEs',
      items: [{ name: 'VS Code' }, { name: 'Cursor' }, { name: 'Zed', pinned: true }, { name: 'NeoVim' }],
    },
  ],

  education: [
    {
      institution: 'Swinburne University of Technology',
      degree: 'Master of Information Technology (Professional Computing)',
      period: 'Mar 2026 – Present',
      status: 'In progress',
      description:
        'Specialising in Software Development while working as a full-stack developer. Expected to finish in December 2027.',
      achievements: [],
    },
    {
      institution: 'Swinburne University of Technology',
      degree: 'Bachelor of Computer Science — Data Science',
      period: 'Mar 2023 — Dec 2025',
      mode: 'Full-time',
      description:
        'Gained deep knowledge across Computer Science while discovering a passion for building applications and software solutions that meet user needs.',
      achievements: [
        'HD and Distinction in Part 1 and 2 of the Final Project',
        'HD in Computing Technology Innovation Project',
        'HD in Computing Technology Design Project',
        'HD in Cloud Computing Architecture',
        'Distinction in Software Deployment and Evolution',
        'Distinction in Computing Technology Inquiry Project',
      ],
    },
  ],
};
