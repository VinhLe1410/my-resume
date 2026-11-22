<script lang="ts">
  import { brandIcons } from '$lib/brand-icons';
  import ActivityHeatmap from '$lib/components/ActivityHeatmap.svelte';
  import DecodeText from '$lib/components/DecodeText.svelte';
  import ShaderCanvas from '$lib/components/ShaderCanvas.svelte';
  import { ascii } from '$lib/shaders';
  import type { About } from '$lib/data/resume';
  import { onMount } from 'svelte';

  let { data }: { data: About } = $props();

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
  <div class="backdrop"><ShaderCanvas fragment={ascii} /></div>
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
        <span class="clock"
          ><DecodeText
            text={localTime ? `${localTime} local time` : null}
            placeholder="00:00 pm AEST local time"
          /></span
        >
      </p>
    </div>

    <div class="essay">
      <!-- Each character appears in turn, like a terminal typing; screen readers get the whole line at once. -->
      <p class="headline">
        <span class="sr-only">{data.headline}</span>
        <span class="ghost" aria-hidden="true">{data.headline}</span>
        <span class="typed" aria-hidden="true"
          >{#each Array.from(data.headline) as char, index (index)}<span style:--i={index}>{char}</span>{/each}<span
            class="caret"
            style:--n={data.headline.length}
          ></span></span
        >
      </p>
      <p class="summary">{data.intro}</p>
      <p class="now"><span>Now</span>{data.now}</p>
    </div>

    <div class="activity">
      <p class="label">Activity</p>
      <ActivityHeatmap />
    </div>

    <div class="focus">
      <p class="label" id="about-focus">Currently working on</p>
      <ul aria-labelledby="about-focus">
        {#each data.focus as item (item.title)}
          <li>
            <p class="focus-title">{item.title} <span>{item.context}</span></p>
            <p class="focus-text">{item.text}</p>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  .intro {
    position: relative;
    container: intro / inline-size;
    display: grid;
    align-content: center;
    min-height: 100%;
    padding-block: clamp(2rem, 4vw, 4.5rem);
  }

  /* The glyph field fills the open space around the name and fades out before any paragraph. */
  .backdrop {
    position: absolute;
    inset: 0;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 90% 26% at 70% 12%, black 15%, transparent 70%);
  }

  @container intro (min-width: 42rem) {
    .backdrop {
      mask-image: radial-gradient(ellipse 34% 40% at 24% 42%, black 20%, transparent 72%);
    }
  }

  .layout {
    position: relative;
  }

  /* Identity top left, essay top right, activity and current work underneath. */
  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'identity' 'essay' 'activity' 'focus';
    row-gap: 3rem;
  }

  @container intro (min-width: 42rem) {
    .layout {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas:
        'identity essay'
        'activity focus';
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
    align-items: flex-start;
    gap: 0.2rem;
    margin-top: 1.75rem;
    color: var(--color-secondary);
    font: 400 0.78rem/1.5 var(--font-mono);
    letter-spacing: 0.03em;
  }

  /* Each line sits on a solid strip, like a selected terminal line, so it reads over the glyph field. */
  .details > span {
    margin-left: -0.45em;
    padding: 0.05em 0.45em;
    background: var(--color-base);
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

  /* The typed line sits on an invisible full copy, so the slide keeps its final height while it types. */
  .headline {
    display: grid;
  }

  .ghost,
  .typed {
    grid-area: 1 / 1;
  }

  .ghost {
    visibility: hidden;
  }

  .caret {
    display: inline-block;
    width: 0.45em;
    height: 0.85em;
    margin-left: 0.1em;
    vertical-align: -0.05em;
    background: currentColor;
  }

  @media (prefers-reduced-motion: no-preference) {
    .typed span {
      animation: type-in 0s calc(300ms + var(--i) * 30ms) both;
    }

    .typed .caret {
      animation: blink 1.1s steps(1) calc(300ms + var(--n) * 30ms) infinite;
    }
  }

  @keyframes type-in {
    from {
      display: none;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .summary {
    margin-top: 1.5rem;
    color: var(--color-secondary);
    font: 400 1rem/1.65 var(--font-headline);
  }

  .activity {
    grid-area: activity;
  }

  .focus {
    grid-area: focus;
  }

  .label {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-outline);
    color: var(--color-muted);
    font: 400 0.68rem/1.5 var(--font-mono);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .focus ul {
    display: grid;
    gap: 1rem;
    padding: 0;
    list-style: none;
  }

  .focus-title {
    color: var(--color-primary);
    font: 500 1rem/1.35 var(--font-headline);
    letter-spacing: -0.015em;
  }

  .focus-title span {
    margin-left: 0.5rem;
    color: var(--color-muted);
    font: 400 0.68rem/1.5 var(--font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .focus-text {
    margin-top: 0.25rem;
    color: var(--color-secondary);
    font: 400 0.9rem/1.5 var(--font-headline);
  }

  .now {
    display: flex;
    gap: 0.9rem;
    margin-top: 1.5rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-outline-subtle);
    color: var(--color-secondary);
    font: 400 0.78rem/1.55 var(--font-mono);
  }

  .now span {
    flex: none;
    color: var(--color-primary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
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
