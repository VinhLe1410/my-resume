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
  mode: string;
  description: string;
  achievements: string[];
}

export interface Resume {
  about: About;
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  education: Education;
}

// ── Data ───────────────────────────────────────────────

export const resume: Resume = {
  about: {
    name: 'Vinh Le',
    role: 'Full-stack developer',
    location: 'VIC, Australia',
    headline: 'I build web apps, the automation behind them, and the cloud they run on.',
    intro:
      'Computer Science graduate with a Data Science major. I build web apps and browser extensions with TypeScript and React, and work on the AWS workflows they use. I turn client feedback into technical plans and review changes made with coding agents.',
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
      period: 'Feb 2025 — Present',
      summary:
        'Build browser extensions, web apps, and backend workflows on AWS, and help shape features from client feedback.',
      highlights: [
        'Built multi-file document attachment in a React browser extension, with per-file status, retries, and recovery after service worker restarts.',
        'Implemented queued file preparation with AWS Lambda, SQS, and S3, including retry and rate-limit handling.',
      ],
      bullets: [
        'Worked with a small team on a tutoring platform, building attendance and class workflows across TypeScript APIs and responsive React interfaces.',
        'Consolidated shared React components in an Nx library and refactored extension state to separate workflow logic from the UI.',
        'Contributed infrastructure changes in AWS CDK and Terraform, and updated GitHub Actions workflows for builds, checks, and release packaging.',
        'Added focused Vitest tests and used Playwright to check browser behaviour during refactors and failure recovery.',
        'Improved local development so data requests can run locally while file preparation uses cloud services.',
        'Turned client feedback into workflow rules and scoped implementation tasks, and prepared demos, guides, and walkthroughs for review.',
        'Split larger changes into tasks for coding agents, reviewed their output, and checked the combined behaviour.',
        'Improved client-scoped PostgreSQL queries and reduced repeated database setup in tests.',
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

  education: {
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
};
