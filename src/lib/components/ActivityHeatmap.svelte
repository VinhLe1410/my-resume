<script lang="ts">
  import activity from '$lib/data/activity.json';

  const CELL = 10;
  const STEP = 13;
  const LABEL_HEIGHT = 18;
  const DAY_MS = 86_400_000;
  // One character per day, denser for busier days, like terminal output.
  const GLYPHS = ['·', ':', '+', '*', '#'];

  // Dates are calendar days in UTC, so the prerendered page matches every visitor's.
  const start = Date.parse(`${activity.start}T00:00:00Z`);
  const dayFormat = new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const monthFormat = new Intl.DateTimeFormat('en-AU', { month: 'short', timeZone: 'UTC' });

  // The calendar starts on a Sunday, so every 7 days is one column.
  const cells = activity.days.map(([count, level], index) => {
    const date = new Date(start + index * DAY_MS);
    return { x: Math.floor(index / 7) * STEP, y: LABEL_HEIGHT + (index % 7) * STEP, count, level, date };
  });

  // A month label sits over the first column whose Sunday falls in that month.
  const months = cells
    .filter((cell, index) => index % 7 === 0 && (index === 0 || cell.date.getUTCDate() <= 7))
    .map((cell) => ({ x: cell.x, label: monthFormat.format(cell.date) }))
    .slice(1);

  const width = Math.ceil(cells.length / 7) * STEP - (STEP - CELL);
  const height = LABEL_HEIGHT + 7 * STEP - (STEP - CELL);

  const roundDown = (value: number, step: number) => (Math.floor(value / step) * step).toLocaleString('en-AU');
  const total = roundDown(activity.total, 100);
  const merged = roundDown(activity.mergedPullRequests, 10);

  function describe(count: number, date: Date) {
    return `${count === 0 ? 'No' : count} contribution${count === 1 ? '' : 's'} on ${dayFormat.format(date)}`;
  }
</script>

<figure class="heatmap">
  <svg viewBox="0 0 {width} {height}" role="img" aria-label="{activity.total} GitHub contributions in the last year">
    {#each months as month (month.x)}
      <text class="month" x={month.x} y="11" aria-hidden="true">{month.label}</text>
    {/each}
    {#each cells as cell (cell.date.getTime())}
      <text class="day level-{cell.level}" x={cell.x + CELL / 2} y={cell.y + CELL - 1}
        >{GLYPHS[cell.level]}<title>{describe(cell.count, cell.date)}</title></text
      >
    {/each}
  </svg>
  <figcaption>
    <span><strong>{total}+</strong> contributions in the last year</span>
    <span
      ><strong>{merged}+</strong> merged pull requests across client platforms, an in-house product, and my own tools</span
    >
  </figcaption>
</figure>

<style>
  .heatmap {
    display: grid;
    gap: 1rem;
  }

  svg {
    width: 100%;
    height: auto;
  }

  .month {
    fill: var(--color-muted);
    font: 400 11px var(--font-mono);
  }

  .day {
    font: 700 12px var(--font-mono);
    text-anchor: middle;
    pointer-events: bounding-box;
  }

  .level-0 {
    fill: #3a3a3a;
  }

  .level-1 {
    fill: #6a6a6a;
  }

  .level-2 {
    fill: #9a9a9a;
  }

  .level-3 {
    fill: #b5b5b5;
  }

  .level-4 {
    fill: var(--color-primary);
  }

  figcaption {
    display: grid;
    gap: 0.25rem;
    color: var(--color-muted);
    font: 400 0.75rem/1.5 var(--font-mono);
  }

  strong {
    color: var(--color-primary);
    font-weight: 400;
  }
</style>
