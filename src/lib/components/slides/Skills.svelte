<script lang="ts">
  import SlideLayout from '$lib/components/SlideLayout.svelte';
  import type { SkillCategory } from '$lib/data/resume';
  import { anchor } from '$lib/search';

  let { data }: { data: SkillCategory[] } = $props();
</script>

<SlideLayout id="skills" title="Skills">
  {#snippet body()}
    <p class="legend"><span aria-hidden="true"></span> Brighter skills have been active in the past six months</p>
    <div class="skill-grid">
      {#each data as category, group (category.label)}
        <div class="category" id={anchor.skillGroup(group)}>
          <h3>{category.label}</h3>
          <ul>
            {#each category.items as item, index (item.name)}
              <li id={anchor.skill(group, index)} class:active={item.pinned}>{item.name}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/snippet}
</SlideLayout>

<style>
  .legend {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 2.5rem;
    color: var(--color-muted);
    font: 400 0.7rem/1.5 var(--font-mono);
    letter-spacing: 0.05em;
  }

  .legend span {
    width: 0.65rem;
    height: 0.65rem;
    background: var(--color-primary);
    flex: none;
  }

  .skill-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem 5rem;
  }

  .category {
    padding-top: 1rem;
    border-top: 1px solid var(--color-outline-subtle);
  }

  h3 {
    margin-bottom: 1.25rem;
    color: var(--color-primary);
    font: 500 1.25rem/1.3 var(--font-headline);
    letter-spacing: -0.03em;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem 1.25rem;
    padding: 0 0.75rem 0 0;
    list-style: none;
  }

  li {
    color: var(--color-muted);
    font: 400 0.84rem/1.6 var(--font-mono);
  }

  li.active {
    color: var(--color-primary);
  }

  @media (max-width: 760px) {
    .skill-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }
</style>
