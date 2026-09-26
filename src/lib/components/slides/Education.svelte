<script lang="ts">
  import SlideLayout from '$lib/components/SlideLayout.svelte';
  import type { Education } from '$lib/data/resume';
  import { anchor } from '$lib/search';

  let { data }: { data: Education[] } = $props();
</script>

<SlideLayout id="education" title="Education">
  {#snippet body()}
    <div class="education-list">
      {#each data as entry, degree (entry.degree)}
        <article class={['education-grid', { 'without-grades': entry.achievements.length === 0 }]}>
          <div class="degree">
            <p class="period">
              {entry.period}
              {#if entry.mode}
                / {entry.mode}{/if}
              {#if entry.status}
                / {entry.status}{/if}
            </p>
            <h3 id={anchor.degree(degree)}>{entry.degree}</h3>
            <p class="institution">{entry.institution}</p>
            <p class="description" id={anchor.degreeSummary(degree)}>{entry.description}</p>
          </div>
          {#if entry.achievements.length > 0}
            <div class="achievements">
              <h4>Notable grades</h4>
              <ul>
                {#each entry.achievements as achievement, line (achievement)}
                  <li id={anchor.grade(degree, line)}>{achievement}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </article>
      {/each}
    </div>
  {/snippet}
</SlideLayout>

<style>
  .education-list {
    display: grid;
    gap: clamp(3rem, 6vw, 5rem);
  }

  .education-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(3rem, 8vw, 8rem);
  }

  .education-grid + .education-grid {
    padding-top: clamp(3rem, 6vw, 5rem);
    border-top: 1px solid var(--color-outline-subtle);
  }

  .without-grades {
    grid-template-columns: 1fr;
  }

  .without-grades .degree {
    max-width: 65ch;
  }

  .period,
  .institution,
  h4 {
    color: var(--color-muted);
    font: 400 0.75rem/1.5 var(--font-mono);
    letter-spacing: 0.07em;
  }

  h3 {
    margin-top: 1.25rem;
    color: var(--color-primary);
    font: 700 clamp(1.7rem, 3vw, 2.75rem)/1.15 var(--font-headline);
    letter-spacing: -0.04em;
  }

  .institution {
    margin-top: 0.8rem;
  }

  .description {
    margin-top: 2rem;
    color: var(--color-secondary);
    font: 400 1rem/1.65 var(--font-headline);
  }

  h4 {
    margin-bottom: 1.25rem;
    color: var(--color-primary);
    text-transform: uppercase;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0.75rem 0;
    border-top: 1px solid var(--color-outline-subtle);
    color: var(--color-secondary);
    font: 400 0.95rem/1.5 var(--font-headline);
  }

  @media (max-width: 760px) {
    .education-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
