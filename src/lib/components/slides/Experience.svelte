<script lang="ts">
  import type { ExperienceEntry } from '$lib/data/resume';
  import SlideLayout from '$lib/components/SlideLayout.svelte';
  import { emphasis } from '$lib/emphasis';
  import { anchor } from '$lib/search';

  let { data }: { data: ExperienceEntry[] } = $props();
</script>

<SlideLayout id="experience" title="Experience">
  {#snippet body()}
    <div class="roles">
      {#each data as entry, role (entry.company)}
        <article class="role-entry">
          <div class="role-meta">
            <span class="period">{entry.period}</span>
            <span>{entry.location}</span>
          </div>
          <div class="role-content">
            <h3 id={anchor.roleTitle(role)}>{entry.role}</h3>
            <p class="company">{entry.company}</p>
            <p class="description" id={anchor.roleSummary(role)}>{entry.summary}</p>
            {#each entry.groups as group, g (group.label ?? g)}
              <div class="group">
                {#if group.label}<h4>{group.label}</h4>{/if}
                <ul>
                  {#each group.bullets as bullet, line (bullet)}
                    <li id={anchor.bullet(role, g, line)}>
                      {#each emphasis(bullet) as part, i (i)}{#if part.strong}<strong>{part.text}</strong
                          >{:else}{part.text}{/if}{/each}
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        </article>
      {/each}
    </div>
  {/snippet}
</SlideLayout>

<style>
  .role-entry {
    display: grid;
    grid-template-columns: minmax(10rem, 0.3fr) minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 7rem);
    padding: 2.5rem 0 4.5rem;
    border-top: 1px solid var(--color-outline-subtle);
  }

  .role-entry:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .role-entry:last-child {
    padding-bottom: 0;
  }

  .role-meta {
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

  h3 {
    scroll-margin-top: calc(var(--section-bar-height) + 2rem);
    color: var(--color-primary);
    font: 700 clamp(1.6rem, 3.2vw, 2.8rem)/1.13 var(--font-headline);
    letter-spacing: -0.045em;
  }

  .company {
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

  .group {
    max-width: 72ch;
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

  .group ul {
    display: grid;
    gap: 0.9rem;
    margin-top: 1.25rem;
    padding-left: 1.2rem;
    color: var(--color-secondary);
    font: 400 0.98rem/1.6 var(--font-headline);
    list-style: square;
  }

  .group li::marker {
    color: var(--color-muted);
  }

  .group:not(:has(h4)) ul {
    padding-top: 1.25rem;
    border-top: 1px solid var(--color-outline);
  }

  strong {
    color: var(--color-primary);
    font-weight: 700;
  }

  @media (max-width: 760px) {
    .role-entry {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding-bottom: 3.5rem;
    }

    .role-meta {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem 1.25rem;
    }

    h3 {
      scroll-margin-top: calc(var(--section-bar-height) + 4rem);
    }
  }
</style>
