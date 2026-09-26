<script lang="ts">
  import { rail, registerSection, restingMorph } from '$lib/section-rail.svelte';
  import type { SlideId } from '$lib/slides';
  import { onMount, type Snippet } from 'svelte';

  let { id, title, body }: { id: SlideId; title: string; body: Snippet } = $props();

  let section: HTMLElement;
  let row: HTMLDivElement;
  let heading: HTMLHeadingElement;

  const morph = $derived(rail.morphs[id] ?? restingMorph);

  onMount(() => registerSection({ id, title, section, row, heading }));
</script>

<section bind:this={section} aria-label={title}>
  <div
    bind:this={row}
    class="section-heading"
    class:collapsed={morph.collapse >= 1}
    style:--collapse={morph.collapse}
    style:--progress={morph.progress}
    style:--title-scale={morph.titleScale}
    style:--title-y="{morph.titleY}px"
    style:--rule-shift="{morph.ruleShift}px"
    style:--rule-y="{morph.ruleY}px"
    style:--band="{morph.band}px"
  >
    <h2 bind:this={heading} tabindex="-1">{title}</h2>
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
    position: sticky;
    top: var(--resume-header-height);
    z-index: 6;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
    pointer-events: none;
  }

  /* The shared section bar takes over once the heading has fully shrunk. */
  .section-heading.collapsed {
    opacity: 0;
  }

  .section-heading::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    z-index: -1;
    height: var(--band);
    background: var(--color-base);
  }

  .section-heading::after {
    content: '';
    position: absolute;
    top: var(--band);
    right: 0;
    left: 0;
    height: 1.5rem;
    background: linear-gradient(var(--color-base), transparent);
    opacity: var(--collapse);
  }

  h2 {
    flex: none;
    color: var(--color-primary);
    font: 700 clamp(2.5rem, 5vw, 5rem)/1 var(--font-headline);
    letter-spacing: -0.055em;
    transform-origin: 0 0;
    translate: 0 var(--title-y);
    scale: var(--title-scale);
  }

  /*
   * Moved with margin and a relative offset: a translated 1px line inside the sticky row
   * leaves a stray white line in Chrome. The progress fill is a gradient for the same reason.
   */
  .rule {
    position: relative;
    top: var(--rule-y);
    flex: 1;
    /* The resting hairline thickens to match the pinned bar's 2px progress line. */
    height: calc(1px + var(--collapse) * 1px);
    margin-left: var(--rule-shift);
    background: linear-gradient(
      to right,
      var(--color-primary) calc(var(--progress) * 100%),
      var(--color-outline-subtle) 0
    );
  }

  @media (max-width: 760px) {
    .section-heading {
      gap: 1.25rem;
    }
  }
</style>
