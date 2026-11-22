// Snapshots the last year of GitHub activity into src/lib/data/activity.json.
// Needs the GitHub CLI signed in as the site owner, so private contributions count.
// Run with `pnpm activity` before deploying.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const levels = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

function gh(...args) {
  return JSON.parse(execFileSync('gh', args, { encoding: 'utf8' }));
}

const { data } = gh(
  'api',
  'graphql',
  '-f',
  'query=query { viewer { login contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }',
);
const calendar = data.viewer.contributionsCollection.contributionCalendar;
const days = calendar.weeks.flatMap((week) => week.contributionDays);
const merged = gh('api', `search/issues?q=author:${data.viewer.login}+is:pr+is:merged&per_page=1`);

const activity = {
  start: days[0].date,
  total: calendar.totalContributions,
  mergedPullRequests: merged.total_count,
  days: days.map((day) => [day.contributionCount, levels[day.contributionLevel]]),
};

writeFileSync(new URL('../src/lib/data/activity.json', import.meta.url), `${JSON.stringify(activity)}\n`);
console.log(`${activity.total} contributions from ${activity.start}, ${activity.mergedPullRequests} merged PRs`);
