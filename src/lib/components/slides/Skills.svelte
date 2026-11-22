<script lang="ts">
  import SlideLayout from '$lib/components/SlideLayout.svelte';
  import type { SkillCategory } from '$lib/data/resume';
  import { anchor } from '$lib/search';

  let { data }: { data: SkillCategory[] } = $props();
</script>

<SlideLayout id="skills" title="Skills">
  {#snippet body()}
    <div class="skill-grid">
      {#each data as category, group (category.label)}
        <div class="category" id={anchor.skillGroup(group)}>
          <h3>{category.label}</h3>
          <ul>
            {#each category.items as item, index (item)}
              <li id={anchor.skill(group, index)}>{item}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/snippet}
</SlideLayout>

<style>
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
    color: var(--color-primary);
    font: 400 0.84rem/1.6 var(--font-mono);
  }

  @media (max-width: 760px) {
    .skill-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }
</style>
