import { resume, type AboutContactRow } from '$lib/data/resume';
import { slides, type SlideId } from '$lib/slides';

// Element ids that search results scroll to. Components render the same ids.
export const anchor = {
  roleTitle: (role: number) => `role-${role}`,
  roleSummary: (role: number) => `role-${role}-summary`,
  highlight: (role: number, line: number) => `role-${role}-highlight-${line}`,
  contribution: (role: number, line: number) => `role-${role}-contribution-${line}`,
  skillGroup: (group: number) => `skills-${group}`,
  skill: (group: number, item: number) => `skills-${group}-${item}`,
  degree: 'degree',
  degreeSummary: 'degree-summary',
  grade: (line: number) => `grade-${line}`,
};

export type SearchAction =
  | { kind: 'section'; id: SlideId }
  | { kind: 'reveal'; id: string; block: ScrollLogicalPosition }
  | { kind: 'copy'; value: string }
  | { kind: 'open'; href: string };

type SearchGroup = 'Sections' | 'Experience' | 'Skills' | 'Education' | 'Contact';

export interface SearchEntry {
  key: string;
  group: SearchGroup;
  title: string;
  detail: string;
  action: SearchAction;
  haystack: string;
}

export interface TextPart {
  text: string;
  match: boolean;
}

export interface SearchResult {
  entry: SearchEntry;
  index: number;
  title: TextPart[];
}

export interface ResultGroup {
  name: SearchGroup;
  results: SearchResult[];
}

const MAX_RESULTS = 40;

const skillCount = resume.skills.reduce((total, group) => total + group.items.length, 0);

const sectionDetails: Record<SlideId, string> = {
  about: 'Summary and contact details',
  experience: `${resume.experience.length} roles`,
  skills: `${resume.skills.length} groups, ${skillCount} skills`,
  education: resume.education.institution,
};

function reveal(id: string, block: ScrollLogicalPosition): SearchAction {
  return { kind: 'reveal', id, block };
}

function draft(
  group: SearchGroup,
  title: string,
  detail: string,
  action: SearchAction,
  keywords = '',
): Omit<SearchEntry, 'key'> {
  return { group, title, detail, action, haystack: `${title} ${keywords}`.toLowerCase() };
}

function displayUrl(href: string): string {
  const url = new URL(href);
  return `${url.host.replace(/^www\./, '')}${url.pathname}`;
}

function contactDrafts(row: AboutContactRow): Omit<SearchEntry, 'key'>[] {
  switch (row.kind) {
    case 'email':
      return [
        draft(
          'Contact',
          'Copy email address',
          row.address,
          { kind: 'copy', value: row.address },
          `email ${row.address}`,
        ),
        draft('Contact', 'Write an email', row.address, { kind: 'open', href: `mailto:${row.address}` }, 'email mail'),
      ];
    case 'link':
      return [draft('Contact', `Open ${row.label}`, displayUrl(row.href), { kind: 'open', href: row.href }, 'profile')];
    case 'text':
      return [
        draft('Contact', `Copy ${row.label.toLowerCase()}`, row.value, { kind: 'copy', value: row.value }, row.value),
      ];
  }
}

const { education } = resume;

// Email and profile links are the likely actions, so they list before plain text rows.
const contactOrder: Record<AboutContactRow['kind'], number> = { email: 0, link: 1, text: 2 };
const contactRows = resume.about.contact.toSorted((a, b) => contactOrder[a.kind] - contactOrder[b.kind]);

export const searchEntries: SearchEntry[] = [
  ...slides.map((slide) => draft('Sections', slide.label, sectionDetails[slide.id], { kind: 'section', id: slide.id })),
  ...resume.experience.flatMap((role, r) => {
    const keywords = `${role.company} ${role.role}`;
    return [
      draft(
        'Experience',
        role.role,
        `${role.company} · ${role.period}`,
        reveal(anchor.roleTitle(r), 'start'),
        `${role.company} ${role.location} ${role.period}`,
      ),
      draft('Experience', role.summary, role.company, reveal(anchor.roleSummary(r), 'center'), keywords),
      ...role.highlights.map((text, line) =>
        draft('Experience', text, role.company, reveal(anchor.highlight(r, line), 'center'), keywords),
      ),
      ...role.bullets.map((text, line) =>
        draft(
          'Experience',
          text,
          `${role.company} · more contributions`,
          reveal(anchor.contribution(r, line), 'center'),
          keywords,
        ),
      ),
    ];
  }),
  ...resume.skills.flatMap((group, g) => [
    draft('Skills', group.label, `${group.items.length} skills`, reveal(anchor.skillGroup(g), 'center')),
    ...group.items.map((item, i) =>
      draft(
        'Skills',
        item.name,
        item.pinned ? `${group.label} · used in the last six months` : group.label,
        reveal(anchor.skill(g, i), 'center'),
        group.label,
      ),
    ),
  ]),
  draft(
    'Education',
    education.degree,
    `${education.institution} · ${education.period}`,
    reveal(anchor.degree, 'center'),
    education.institution,
  ),
  draft(
    'Education',
    education.description,
    education.institution,
    reveal(anchor.degreeSummary, 'center'),
    education.institution,
  ),
  ...education.achievements.map((text, line) =>
    draft('Education', text, 'Notable grade', reveal(anchor.grade(line), 'center'), 'grade grades'),
  ),
  ...contactRows.flatMap(contactDrafts),
].map((entry, index) => ({ ...entry, key: `entry-${index}` }));

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function score(entry: SearchEntry, tokens: string[], query: string): number {
  if (!tokens.every((token) => entry.haystack.includes(token))) return 0;
  const title = entry.title.toLowerCase();
  let total = title === query ? 10 : 0;
  for (const token of tokens) {
    if (title.startsWith(token)) total += 4;
    else if (new RegExp(`(^|[^a-z0-9])${escapeRegExp(token)}`).test(title)) total += 3;
    else if (title.includes(token)) total += 2;
    else total += 1;
  }
  // Shorter titles win ties, so a skill ranks above a long sentence that mentions it.
  return total - title.length / 1000;
}

// Long sentences start near the first match so the matched words stay in the two visible lines.
function excerpt(text: string, tokens: string[]): string {
  if (text.length <= 90) return text;
  const lower = text.toLowerCase();
  const first = Math.min(...tokens.map((token) => lower.indexOf(token)).filter((at) => at !== -1));
  if (!Number.isFinite(first) || first < 48) return text;
  return `…${text.slice(text.lastIndexOf(' ', first - 24) + 1)}`;
}

function highlight(text: string, tokens: string[]): TextPart[] {
  const lower = text.toLowerCase();
  const marked = new Array<boolean>(text.length).fill(false);
  for (const token of tokens) {
    for (let at = lower.indexOf(token); at !== -1; at = lower.indexOf(token, at + token.length)) {
      marked.fill(true, at, at + token.length);
    }
  }
  const parts: TextPart[] = [];
  for (let i = 0; i < text.length; i++) {
    const last = parts.at(-1);
    if (last && last.match === marked[i]) last.text += text[i];
    else parts.push({ text: text[i], match: marked[i] });
  }
  return parts;
}

export function searchResume(rawQuery: string): ResultGroup[] {
  const query = rawQuery.trim().toLowerCase();
  const tokens = query.split(/\s+/).filter(Boolean);
  const matches =
    tokens.length === 0
      ? searchEntries.filter((entry) => entry.group === 'Sections' || entry.group === 'Contact')
      : searchEntries
          .map((entry) => ({ entry, score: score(entry, tokens, query) }))
          .filter((match) => match.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_RESULTS)
          .map((match) => match.entry);

  // Groups appear in the order of their best match. Indexes follow the displayed order.
  const groups: ResultGroup[] = [];
  let index = 0;
  for (const group of new Set(matches.map((entry) => entry.group))) {
    const results = matches
      .filter((entry) => entry.group === group)
      .map((entry) => ({ entry, index: 0, title: highlight(excerpt(entry.title, tokens), tokens) }));
    groups.push({ name: group, results });
  }
  for (const result of groups.flatMap((group) => group.results)) result.index = index++;
  return groups;
}
