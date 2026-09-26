<script lang="ts">
  import { brandIcons } from '$lib/brand-icons';
  import type { About, ExperienceEntry } from '$lib/data/resume';
  import { anchor } from '$lib/search';
  import { onMount } from 'svelte';

  let { data, experience }: { data: About; experience: ExperienceEntry[] } = $props();

  const profiles = $derived(
    data.contact.flatMap((row) => {
      if (row.kind !== 'link') return [];
      const icon = brandIcons[row.label];
      if (!icon) throw new Error(`No icon for the ${row.label} profile link`);
      return [{ label: row.label, href: row.href, icon }];
    }),
  );

  // Victoria observes AEST/AEDT; rendered after mount so the prerendered page carries no build-time clock.
  let localTime: string | null = $state(null);

  onMount(() => {
    const format = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Melbourne',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    const tick = () => (localTime = format.format(new Date()));
    tick();
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  });
</script>

<section class="intro" aria-label="About">
  <div class="layout">
    <div class="identity">
      <!-- The profile links follow the name like a footnote marker, outside the heading's text. -->
      <div class="name-line">
        <h1 tabindex="-1">{data.name}</h1>
        <ul class="profiles" aria-label="Profiles">
          {#each profiles as profile (profile.label)}
            <li>
              <a href={profile.href} title={profile.label} target="_blank" rel="noopener noreferrer external">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d={profile.icon} /></svg>
                <span class="sr-only">{profile.label}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <p class="details">
        <span class="role">{data.role}</span>
        <span>{data.location}</span>
        <span class="clock">{localTime ? `${localTime} local time` : ''}</span>
      </p>
    </div>

    <div class="essay">
      <p class="headline">{data.headline}</p>
      <p class="summary">{data.intro}</p>
    </div>

    <div class="work">
      <p class="work-label" id="about-experience">Experience</p>
      <ul aria-labelledby="about-experience">
        {#each experience as entry, role (entry.company)}
          <li>
            <a class="job" href="#{anchor.roleTitle(role)}">
              <span class="job-title">{entry.role}</span>
              <span class="job-meta"><span>{entry.company}</span><span class="period">{entry.period}</span></span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  .intro {
    container: intro / inline-size;
    display: grid;
    align-content: center;
    min-height: 100%;
    padding-block: clamp(2rem, 4vw, 4.5rem);
  }

  /* Identity top left, essay top right, jobs across both columns underneath. */
  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'identity' 'essay' 'work';
    row-gap: 3rem;
  }

  @container intro (min-width: 42rem) {
    .layout {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas:
        'identity essay'
        'work work';
      column-gap: clamp(2.5rem, 6cqi, 6rem);
      row-gap: clamp(3rem, 7dvh, 5rem);
    }
  }

  .identity {
    grid-area: identity;
    width: fit-content;
    max-width: 100%;
  }

  /* Carries the name's size so the markers can be measured in em of the name. */
  .name-line {
    margin-left: -0.04em;
    font: 700 clamp(3.5rem, 20cqi, 7rem)/0.85 var(--font-headline);
  }

  @container intro (min-width: 42rem) {
    .name-line {
      font-size: clamp(3.5rem, min(12cqi, 16dvh), 8.5rem);
    }
  }

  h1 {
    display: inline;
    color: var(--color-primary);
    font: inherit;
    letter-spacing: -0.075em;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 1.75rem;
    color: var(--color-muted);
    font: 400 0.78rem/1.5 var(--font-mono);
    letter-spacing: 0.03em;
  }

  .role {
    color: var(--color-primary);
  }

  .clock {
    min-height: 1.5em;
    font-variant-numeric: tabular-nums;
  }

  /*
   * Starts 0.12em past the visible edge of the last letter, with the box tops level with the flat
   * top of the capitals. The name's text box ends about 0.23em past the ink of its final "e",
   * which the negative margin takes back.
   */
  .profiles {
    --box: clamp(20px, 0.18em, 24px);
    --gap: clamp(4px, 0.045em, 6px);
    display: inline-flex;
    gap: var(--gap);
    margin: 0.07em 0 0 calc(0.12em - 0.23em);
    padding: 0;
    vertical-align: top;
    list-style: none;
  }

  .profiles a {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--box);
    height: var(--box);
    border: 1px solid var(--color-outline-subtle);
    color: var(--color-secondary);
    transition:
      border-color 120ms ease,
      color 120ms ease;
  }

  /* About 30×44px of touch area; neighbouring areas meet in the gap without overlapping. */
  .profiles a::after {
    content: '';
    position: absolute;
    inset: -11px calc(var(--gap) / -2);
  }

  .profiles a:hover,
  .profiles a:focus-visible {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .profiles svg {
    width: clamp(12px, 0.1em, 14px);
    height: clamp(12px, 0.1em, 14px);
    fill: currentColor;
  }

  .essay {
    grid-area: essay;
    align-self: start;
  }

  .headline {
    color: var(--color-primary);
    font: 500 clamp(1.6rem, 2.4vw, 2.4rem)/1.15 var(--font-headline);
    letter-spacing: -0.035em;
    text-wrap: pretty;
  }

  .summary {
    margin-top: 1.5rem;
    color: var(--color-secondary);
    font: 400 1rem/1.65 var(--font-headline);
  }

  .work {
    grid-area: work;
  }

  .work-label {
    margin-bottom: 1rem;
    color: var(--color-muted);
    font: 400 0.68rem/1.5 var(--font-mono);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .work ul {
    display: grid;
    gap: 1.5rem;
    padding: 0;
    list-style: none;
  }

  /* Same columns and gap as the row above, so each job sits under one of them. */
  @container intro (min-width: 42rem) {
    .work ul {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: clamp(2.5rem, 6cqi, 6rem);
    }
  }

  /* Same top rule as the highlights in the Experience section. */
  .job {
    display: grid;
    gap: 0.35rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-outline);
  }

  .job-title {
    color: var(--color-primary);
    font: 500 1.05rem/1.35 var(--font-headline);
    letter-spacing: -0.015em;
  }

  /* Company and period wrap as whole pieces, never mid-period. */
  .job-meta {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1.25rem;
    color: var(--color-muted);
    font: 400 0.72rem/1.5 var(--font-mono);
    letter-spacing: 0.02em;
  }

  .period {
    white-space: nowrap;
  }

  .job:hover .job-title {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }

  @media (max-width: 760px) {
    .intro {
      padding-top: 2.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .profiles a {
      transition: none;
    }
  }
</style>
