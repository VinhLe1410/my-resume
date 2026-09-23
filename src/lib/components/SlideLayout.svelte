<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, body }: { title: string; body: Snippet } = $props();
</script>

<section id={title.toLowerCase()} aria-label={title}>
  <div class="section-heading">
    <h2>{title}</h2>
    <span class="rule" aria-hidden="true"></span>
  </div>
  <div class="section-body">
    {@render body()}
  </div>
</section>

<style>
  section {
    padding-block: clamp(4.5rem, 8vw, 8.5rem);
    border-top: 1px solid var(--color-outline-subtle);
    scroll-margin-top: 4.75rem;
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
    section {
      scroll-margin-top: 6.5rem;
    }

    .section-heading {
      gap: 1.25rem;
    }
  }
</style>
