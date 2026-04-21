// ── Types ──────────────────────────────────────────────

export type AboutContactRow =
  | { kind: 'text'; label: string; value: string }
  | { kind: 'email'; label: string; address: string }
  | { kind: 'link'; label: string; href: string; text?: string };

export interface About {
  name: string;
  summary: string;
  contact: AboutContactRow[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
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
    summary:
      'Computer Science graduate with a background in Data Science and hands-on experience in full-stack software development and cloud-based systems. Experienced in building and deploying web applications, automation workflows, and AWS infrastructure using modern frameworks and CI/CD practices. Strong interest in developing scalable, user-focused solutions.',
    contact: [
      { kind: 'text', label: 'Location', value: 'VIC, Australia' },
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
        'Client-facing full-stack role building production systems across Chrome extensions, internal web apps, and AWS cloud infrastructure.',
      bullets: [
        'Work in a client-facing role, translating business requirements and feature requests into technical solutions and demos.',
        'Conduct project walkthroughs and shoulder-tap demos for stakeholders to validate features and gather feedback.',
        'Develop and maintain multiple production projects, including Chrome extensions, internal back-office web applications, and automation tools.',
        'Built scheduled and event-driven AWS Lambda functions for document syncing, API data extraction, and file processing workflows.',
        'Design and deploy cloud infrastructure using AWS CDK (TypeScript), provisioning CloudFormation stacks.',
        'Implement cloud services including AWS Amplify, Lambda, S3, DynamoDB, Cognito, Route 53, API Gateway, and Secrets Manager for secure, scalable applications.',
        'Set up and maintain CI/CD pipelines with GitHub Actions, automating deployments across development, staging, and production environments, using Nx monorepos to manage and share code across multiple applications and services.',
        'Use Jira to track work (epics, spikes, and tickets), communicate progress, and collaborate effectively with the team.',
      ],
    },
    {
      role: 'Tech Lead / Full Stack Developer',
      company: 'Learning Portal for EdBright Tutoring',
      location: 'Remote',
      period: 'Aug 2025 — Feb 2026',
      summary: 'Led architecture and full-stack development for a multi-role educational web application.',
      bullets: [
        'Tech Lead & primary Full-Stack Developer for a multi-role educational web application.',
        'Designed and enforced front-end and back-end architecture, including folder structure, data flow, and API integration.',
        'Led major codebase refactors, adopting React Query for server-state management to improve performance, caching, and maintainability.',
        'Built responsive and accessible UIs using Tailwind CSS, focusing on child-friendly, interactive user experiences.',
        'Translated business and educational requirements into database schema design and back-end logic.',
        'Used AI-assisted tooling during refactors to plan, validate, and implement changes while preserving existing functionality and code standards.',
        'Supporting deployment and post-release technical issues, assisting stakeholders with configuration and troubleshooting.',
      ],
    },
  ],

  skills: [
    {
      label: 'AWS Services',
      items: [
        { name: 'Lambda', pinned: true },
        { name: 'Route 53', pinned: true },
        { name: 'CloudFormation', pinned: true },
        { name: 'AWS Amplify', pinned: true },
        { name: 'DynamoDB', pinned: true },
        { name: 'Cognito', pinned: true },
        { name: 'Secrets Manager', pinned: true },
        { name: 'CloudWatch', pinned: true },
        { name: 'SQS', pinned: true },
        { name: 'SNS', pinned: true },
        { name: 'API Gateway', pinned: true },
        { name: 'S3', pinned: true },
        { name: 'EC2' },
      ],
    },
    {
      label: 'Web Frameworks & Runtimes',
      items: [
        { name: 'Next.js', pinned: true },
        { name: 'React', pinned: true },
        { name: 'Tailwind CSS', pinned: true },
        { name: 'React Query', pinned: true },
        { name: 'SvelteKit', pinned: true },
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
        { name: 'Pi Agent', pinned: true },
        { name: 'Excalidraw', pinned: true },
        { name: 'Postman', pinned: true },
        { name: 'OrbStack', pinned: true },
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
        { name: 'SQL' },
        { name: 'HTML' },
        { name: 'PHP' },
        { name: 'CSS' },
        { name: 'Svelte' },
      ],
    },
    {
      label: 'Databases',
      items: [{ name: 'MySQL' }, { name: 'PostgreSQL' }, { name: 'SQLite' }, { name: 'NoSQL' }],
    },
    {
      label: 'Project Management',
      items: [{ name: 'Jira', pinned: true }],
    },
    {
      label: 'CI/CD',
      items: [{ name: 'GitHub', pinned: true }, { name: 'GitHub Actions', pinned: true }, { name: 'GitLab' }],
    },
    {
      label: 'IDEs',
      items: [
        { name: 'VS Code', pinned: true },
        { name: 'Cursor', pinned: true },
        { name: 'Zed', pinned: true },
        { name: 'NeoVim' },
      ],
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
