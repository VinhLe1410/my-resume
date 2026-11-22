<script lang="ts">
  import SlideLayout from '$lib/components/SlideLayout.svelte';
  import type { Project } from '$lib/data/resume';
  import { anchor } from '$lib/search';

  let { data }: { data: Project[] } = $props();
</script>

<SlideLayout id="projects" title="Side Projects">
  {#snippet body()}
    <div class="projects">
      {#each data as project, index (project.name)}
        <!-- Same columns as an Experience role, so both sections share one left edge. -->
        <article class="row" id={anchor.project(index)}>
          <div class="meta">
            <span class="status">{project.status}</span>
            <span>{project.period}</span>
            <ul class="tags" aria-label="Built with">
              {#each project.tags as tag (tag)}
                <li>{tag}</li>
              {/each}
            </ul>
          </div>

          <div class="content">
            <div class="pitch">
              <div class="title-line">
                <h3>{project.name}</h3>
                <span class="aside">More to come soon™</span>
              </div>
              <p class="lead">{project.summary}</p>
            </div>
            <div class="why">
              <h4>Why</h4>
              <p>{project.why}</p>
            </div>
          </div>
        </article>
      {/each}
    </div>
  {/snippet}
</SlideLayout>

<style>
  .projects {
    display: grid;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(10rem, 0.3fr) minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 7rem);
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

  .status {
    color: var(--color-primary);
  }

  .tags {
    display: grid;
    gap: 0.35rem;
    margin-top: 1.25rem;
    padding: 1rem 0 0;
    border-top: 1px solid var(--color-outline-subtle);
    list-style: none;
  }

  /* Pitch and reason sit side by side and share a top edge; they stack when the column is narrow. */
  .content {
    display: grid;
    gap: 2.5rem;
  }

  @media (min-width: 1100px) {
    .content {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      column-gap: clamp(2rem, 5vw, 5rem);
    }
  }

  .title-line {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 1rem;
  }

  .aside {
    color: var(--color-muted);
    font: 400 0.75rem/1.5 var(--font-mono);
    letter-spacing: 0.03em;
  }

  h3 {
    color: var(--color-primary);
    font: 700 clamp(1.6rem, 3.2vw, 2.8rem)/1.13 var(--font-headline);
    letter-spacing: -0.045em;
  }

  .lead {
    max-width: 34ch;
    margin-top: 1.25rem;
    color: var(--color-primary);
    font: 500 clamp(1.15rem, 1.8vw, 1.5rem)/1.35 var(--font-headline);
    letter-spacing: -0.02em;
    text-wrap: pretty;
  }

  .why {
    padding-top: 0.4rem;
  }

  h4 {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-outline);
    color: var(--color-primary);
    font: 400 0.72rem/1.5 var(--font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .why p {
    margin-top: 1.25rem;
    color: var(--color-secondary);
    font: 400 1.05rem/1.65 var(--font-headline);
  }

  @media (max-width: 760px) {
    .row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .meta {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem 1.25rem;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem 1rem;
      width: 100%;
      margin-top: 0.25rem;
      padding-top: 0.75rem;
    }
  }
</style>
