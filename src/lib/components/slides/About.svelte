<script lang="ts">
  import type { About } from '$lib/data/resume';
  import type { SlideId } from '$lib/slides';

  let {
    data,
    onNavigate,
  }: {
    data: About;
    onNavigate: (event: MouseEvent, id: SlideId) => void;
  } = $props();
</script>

<section id="about" class="intro" aria-label="About">
  <div class="intro-grid">
    <div class="identity">
      <p class="identity-label">Resume / VIC, Australia</p>
      <h1>{data.name}</h1>
      <p class="role">Full-stack developer</p>
    </div>
    <div class="intro-copy">
      <p class="lead">Building web applications, automation workflows, and cloud infrastructure.</p>
      <p class="summary">{data.summary}</p>
      <a class="work-link" href="#experience" onclick={(event) => onNavigate(event, 'experience')}
        >Explore my experience <span aria-hidden="true">↘</span></a
      >
    </div>
  </div>

  <div class="contact-row">
    {#each data.contact as row (row.label)}
      <div class="contact-item">
        <span class="contact-label">{row.label}</span>
        {#if row.kind === 'text'}
          <span>{row.value}</span>
        {:else if row.kind === 'email'}
          <a href="mailto:{row.address}">{row.address}</a>
        {:else}
          <a href={row.href} target="_blank" rel="noopener noreferrer external">{row.text ?? row.label} ↗</a>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  .intro {
    padding-top: clamp(4rem, 8vh, 7rem);
    scroll-margin-top: 4.75rem;
  }

  .intro-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.75fr);
    gap: clamp(3rem, 8vw, 8rem);
    align-items: end;
  }

  .identity-label,
  .contact-label {
    font: 400 0.7rem/1.5 var(--font-mono);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  h1 {
    margin: 1.25rem 0 0;
    color: var(--color-primary);
    font: 700 clamp(4.25rem, 9vw, 8.5rem)/0.9 var(--font-headline);
    letter-spacing: -0.075em;
  }

  .role {
    margin-top: 1.75rem;
    color: var(--color-secondary);
    font: 500 clamp(1.35rem, 2.2vw, 2.25rem)/1.2 var(--font-headline);
    letter-spacing: -0.035em;
  }

  .lead {
    color: var(--color-primary);
    font: 500 clamp(1.5rem, 2.3vw, 2.4rem)/1.24 var(--font-headline);
    letter-spacing: -0.035em;
    max-width: 25ch;
    text-wrap: balance;
  }

  .summary {
    margin-top: 1.5rem;
    max-width: 58ch;
    color: var(--color-secondary);
    font: 400 0.95rem/1.7 var(--font-headline);
  }

  .work-link {
    display: inline-flex;
    gap: 2rem;
    align-items: center;
    margin-top: 1.75rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid var(--color-primary);
    color: var(--color-primary);
    font: 400 0.72rem/1.5 var(--font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .work-link span {
    font-size: 1.3rem;
    transition: transform 180ms ease;
  }

  .work-link:hover span {
    transform: translate(3px, 3px);
  }

  .contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem 3rem;
    margin-top: clamp(3.5rem, 7vh, 6rem);
    padding-block: 1.5rem;
    border-top: 1px solid var(--color-outline-subtle);
  }

  .contact-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    color: var(--color-primary);
    font: 400 0.78rem/1.4 var(--font-mono);
    overflow-wrap: anywhere;
  }

  .contact-item a:hover {
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }

  @media (max-width: 900px) {
    .intro-grid {
      grid-template-columns: 1fr;
      gap: 3.5rem;
    }
  }

  @media (max-width: 760px) {
    .intro {
      padding-top: 3rem;
      scroll-margin-top: 6.5rem;
    }

    h1 {
      font-size: clamp(4.2rem, 17vw, 7rem);
    }

    .intro-grid {
      gap: 3rem;
    }

    .contact-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }
  }

  @media (max-width: 430px) {
    .contact-row {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .work-link span {
      transition: none;
    }
  }
</style>
