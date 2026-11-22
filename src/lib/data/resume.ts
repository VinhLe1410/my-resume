// ── Types ──────────────────────────────────────────────

// Text wrapped in **double asterisks** renders bold; see `$lib/emphasis`.

export type AboutContactRow =
  { kind: 'email'; label: string; address: string } | { kind: 'link'; label: string; href: string; text?: string };

export interface FocusItem {
  title: string;
  context: string;
  text: string;
}

export interface About {
  name: string;
  role: string;
  location: string;
  headline: string;
  intro: string;
  now: string;
  /** Page description for search results and link previews. */
  summary: string;
  focus: FocusItem[];
  contact: AboutContactRow[];
}

export interface ExperienceGroup {
  label?: string;
  bullets: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  groups: ExperienceGroup[];
}

export interface Project {
  name: string;
  status: string;
  period: string;
  summary: string;
  why: string;
  tags: string[];
}

export interface Capstone {
  name: string;
  summary: string;
  href: string;
}

export interface SkillCategory {
  label: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  mode?: string;
  status?: string;
  description: string;
  capstone?: Capstone;
}

export interface Resume {
  about: About;
  experience: ExperienceEntry[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education[];
}

// ── Data ───────────────────────────────────────────────

export const resume: Resume = {
  about: {
    name: 'Vinh Le',
    role: 'Full-stack / Software Developer',
    location: 'Hawthorn, VIC, Australia',
    headline: 'Build stuff, ship products, make life a little easier.',
    intro:
      "I studied Computer Science, then realised halfway through that I'd rather build products than prove theorems. Now I build applications, browser extensions, and automation for teams buried in manual work, and lately I build them alongside a small crew of AI agents.",
    now: 'Full-stack developer at Evolit and Master of IT student at Swinburne. Open to Full-stack Developer, Software Developer, and AI Product Engineer roles.',
    summary:
      'Full-stack and software developer in Melbourne building applications, automation, and AI-assisted products with TypeScript, React, and AWS.',
    focus: [
      {
        title: 'ReviewerBox',
        context: 'Personal · agentic development',
        text: 'AI coding agents that review pull requests in disposable sandboxes, with a person approving every review before it posts.',
      },
      {
        title: 'Client products',
        context: 'Evolit',
        text: 'Internal products for two clients in education and legal services, used by their staff every day.',
      },
    ],
    contact: [
      { kind: 'email', label: 'Email', address: 'lpvinh2k4@gmail.com' },
      { kind: 'link', label: 'GitHub', href: 'https://github.com/VinhLe1410' },
      { kind: 'link', label: 'LinkedIn', href: 'https://linkedin.com/in/vinhle1410' },
    ],
  },

  experience: [
    {
      role: 'Junior Full-stack Developer',
      company: 'Evolit Pty Ltd',
      location: 'Onsite / Remote',
      period: 'Feb 2025 – Present',
      summary:
        'Turn client requirements into shipped products: web apps, browser extensions, automation, and the AWS infrastructure under them.',
      groups: [
        {
          label: 'AI-driven engineering',
          bullets: [
            '**Tripled** my weekly delivery (from approx. **6 to 18 merged PRs**) by building an AI-agent workflow: spec-first planning, agent code review, and a 13-skill toolkit shared across 3 coding agents.',
            "Wrote **78%** of the team's feature specs (105 of 135) in a spec-driven AI workflow, with 220+ agent review passes catching issues before human review; reviewed **240+** teammates' PRs across 2 organisations.",
          ],
        },
        {
          label: 'Legal-claims automation (law-firm client)',
          bullets: [
            'Built a Chrome extension that cut claim filing from approx. **20 to 5 minutes (75% faster)** by auto-checking claimant data and uploading every evidence file in one click, saving **2,000+ staff-hours** across a 35,000+ claim portfolio.',
            'Built an automated exporter that pulled **80,000+ claim records** from a government claims portal, avoiding approx. **4,000 hours** of manual data fetching.',
            'Automated claim-readiness checks and settlement valuation for the full claim portfolio, replacing over **6,000 hours** of manual review per pass, backed by **700+ automated tests**.',
            'Cut failed CI runs from **27% to under 1%** in one week, and rolled out secret scanning, automated dependency updates, and security linting across 2 production apps.',
          ],
        },
        {
          label: 'Classloom: tutoring-operations platform',
          bullets: [
            "Top contributor (approx. **50% of the codebase, 250+ PRs**) to a platform that runs an education group's daily operations; shipped **15 feature areas** across 50+ screens.",
            'Replaced paper, spreadsheets, and chat apps with attendance, student import, marking, and auto-scored tests.',
            'Made the test suite **57% faster** and CI failures **60% less frequent** for a 5-developer team; improved the CI pipeline to run **60% more efficiently** through better GitHub Actions workflows and technology migrations.',
          ],
        },
      ],
    },
    {
      role: 'Tech Lead / Full-stack Developer',
      company: 'Learning Portal for EdBright Tutoring',
      location: 'Remote',
      period: 'Aug 2025 – Feb 2026',
      summary: 'Led architecture and full-stack development of a multi-role learning platform for a tutoring business.',
      groups: [
        {
          bullets: [
            'Led and built a learning platform from scratch (classes, lesson videos, materials, homework, announcements, and student and tutor portals), authoring **70% of the codebase** and handing it over to the client in production.',
            'Shipped AI-assisted essay marking (rubric scores, feedback, corrections), cutting tutor marking from **20 to 5 minutes** per essay (**75% improvement**).',
          ],
        },
      ],
    },
  ],

  projects: [
    {
      name: 'ReviewerBox',
      status: 'In progress',
      period: 'Nov 2026 – Now',
      summary:
        'A self-hosted place where coding agents review pull requests inside throwaway sandboxes, and a person decides what gets posted.',
      why: 'Agents now write code faster than people can review it. ReviewerBox tests whether an agent can take the first review pass safely, so human reviewers start from findings instead of a blank diff.',
      tags: ['TanStack Start', 'React', 'SQLite', 'Drizzle', 'Podman'],
    },
  ],

  skills: [
    {
      label: 'AI & Agents',
      items: ['Claude Code', 'Amp', 'Codex', 'Pi Agent', 'Spec-driven development', 'Agent skills'],
    },
    {
      label: 'Web Development',
      items: [
        'React',
        'Svelte / SvelteKit',
        'TanStack Query',
        'Tailwind CSS',
        'shadcn/ui',
        'Hono',
        'Zod',
        'WXT',
        'Node.js',
        'Bun',
      ],
    },
    {
      label: 'AWS & Infrastructure',
      items: [
        'AWS CDK',
        'Terraform',
        'Lambda',
        'S3',
        'SQS',
        'Cognito',
        'API Gateway',
        'Secrets Manager',
        'CloudWatch',
        'CloudFormation',
        'Docker',
      ],
    },
    {
      label: 'Testing & CI/CD',
      items: ['Vitest', 'Playwright', 'GitHub Actions', 'Nx Monorepo', 'pnpm'],
    },
    {
      label: 'Languages & Databases',
      items: ['TypeScript', 'JavaScript', 'SQL', 'PostgreSQL', 'SQLite', 'Drizzle'],
    },
    {
      label: 'Project Management',
      items: ['Jira', 'GitHub Projects', 'Linear'],
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
    },
    {
      institution: 'Swinburne University of Technology',
      degree: 'Bachelor of Computer Science — Data Science',
      period: 'Mar 2023 — Dec 2025',
      mode: 'Full-time',
      description:
        'HDs in the Final Project, Cloud Computing Architecture, and the Technology Innovation and Design Projects.',
      capstone: {
        name: 'ProofVault.Tech',
        summary:
          'Industry-sponsored capstone: a phone app that records audio and flags risks for elderly people and children, on self-hosted infrastructure. I built the mobile recorder, the file storage, and the first automated tests. Delivered to the sponsor and shown at Swinburne CAPEX25.',
        href: 'https://www.swinburne.edu.au/events/2025/11/capstone-project-expo-2025/#computer',
      },
    },
  ],
};
