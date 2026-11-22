<script lang="ts">
  import SlideLayout from '$lib/components/SlideLayout.svelte';
  import type { Education } from '$lib/data/resume';
  import { anchor } from '$lib/search';

  let { data }: { data: Education[] } = $props();
</script>

<SlideLayout id="education" title="Education">
  {#snippet body()}
    {#each data as entry, degree (entry.degree)}
      <!-- Same columns as an Experience role, so every section shares one left edge. -->
      <article class="degree-entry">
        <div class="meta">
          <span class="period">{entry.period}</span>
          {#if entry.mode}<span>{entry.mode}</span>{/if}
          {#if entry.status}<span>{entry.status}</span>{/if}
        </div>

        <div class="content">
          <h3 id={anchor.degree(degree)}>{entry.degree}</h3>
          <p class="institution">{entry.institution}</p>
          <p class="description" id={anchor.degreeSummary(degree)}>{entry.description}</p>

          {#if entry.capstone}
            <div class="capstone" id={anchor.capstone(degree)}>
              <h4>Capstone project</h4>
              <div class="capstone-body">
                <a class="capstone-name" href={entry.capstone.href} target="_blank" rel="noopener noreferrer external"
                  >{entry.capstone.name} <span aria-hidden="true">↗</span></a
                >
                <p>{entry.capstone.summary}</p>
              </div>
            </div>
          {/if}
        </div>
      </article>
    {/each}
  {/snippet}
</SlideLayout>

<style>
  .degree-entry {
    display: grid;
    grid-template-columns: minmax(10rem, 0.3fr) minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 7rem);
    padding: 2.5rem 0 4.5rem;
    border-top: 1px solid var(--color-outline-subtle);
  }

  .degree-entry:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .degree-entry:last-child {
    padding-bottom: 0;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.4rem;
    color: var(--color-muted);
    font: 400 0.75rem/1.5 var(--font-mono);
    letter-spacing: 0.03em;
  }

  .period {
    color: var(--color-primary);
  }

  .content {
    container: degree / inline-size;
  }

  h3 {
    color: var(--color-primary);
    font: 700 clamp(1.6rem, 3.2vw, 2.8rem)/1.13 var(--font-headline);
    letter-spacing: -0.045em;
  }

  .institution {
    margin-top: 0.75rem;
    color: var(--color-muted);
    font: 400 0.75rem/1.5 var(--font-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .description {
    max-width: 65ch;
    margin-top: 1.75rem;
    color: var(--color-secondary);
    font: 400 1.05rem/1.6 var(--font-headline);
  }

  .capstone {
    margin-top: 2.25rem;
  }

  h4 {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-outline);
    color: var(--color-primary);
    font: 400 0.72rem/1.5 var(--font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* Name on the left, story on the right, like the Why / How split in Side Projects. */
  .capstone-body {
    display: grid;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  @container degree (min-width: 44rem) {
    .capstone-body {
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      column-gap: clamp(2rem, 5cqi, 4.5rem);
    }
  }

  .capstone-name {
    width: fit-content;
    height: fit-content;
    color: var(--color-primary);
    font: 700 clamp(1.3rem, 2vw, 1.6rem)/1.2 var(--font-headline);
    letter-spacing: -0.03em;
  }

  .capstone-name:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }

  .capstone-name span {
    color: var(--color-muted);
    font-size: 0.75em;
  }

  .capstone-body p {
    color: var(--color-secondary);
    font: 400 1rem/1.65 var(--font-headline);
  }

  @media (max-width: 760px) {
    .degree-entry {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding-bottom: 3.5rem;
    }

    .meta {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem 1.25rem;
    }
  }
</style>
