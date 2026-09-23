<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, body }: { title: string; body: Snippet } = $props();
</script>

<section aria-label={title}>
  <div class="section-heading">
    <h2 tabindex="-1">{title}</h2>
    <span class="rule" aria-hidden="true"></span>
  </div>
  <div class="section-body">
    {@render body()}
  </div>
</section>

<style>
  section {
    padding-top: clamp(2.5rem, 4vw, 5rem);
    padding-bottom: clamp(4.5rem, 8vw, 8.5rem);
  }

  .section-heading {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
  }

  h2 {
    flex: none;
    color: var(--color-primary);
    font: 700 clamp(2.5rem, 5vw, 5rem)/1 var(--font-headline);
    letter-spacing: -0.055em;
  }

  .rule {
    flex: 1;
    height: 1px;
    background: var(--color-outline-subtle);
  }

  @media (max-width: 760px) {
    .section-heading {
      gap: 1.25rem;
    }
  }
</style>
