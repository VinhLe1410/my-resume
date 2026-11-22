<script lang="ts">
  import { layoutRail, rail, registerBar, updateRail } from '$lib/section-rail.svelte';
  import { onMount } from 'svelte';

  let bar: HTMLDivElement;
  let title: HTMLSpanElement;

  onMount(() => {
    const unregister = registerBar(bar, title);
    void document.fonts.ready.then(layoutRail);
    return unregister;
  });
</script>

<svelte:window onscroll={updateRail} onresize={layoutRail} />

<div
  bind:this={bar}
  class="section-bar"
  class:visible={rail.pinned !== null}
  style:--progress={rail.pinned?.progress ?? 0}
  style:--handover={rail.pinned?.handover ?? 1}
  aria-hidden="true"
>
  <span bind:this={title} class="bar-title">{rail.pinned?.title ?? ''}</span>
  <span class="bar-track"></span>
</div>

<style>
  .section-bar {
    position: sticky;
    top: var(--resume-header-height);
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    height: var(--section-bar-height);
    margin-bottom: calc(-1 * var(--section-bar-height));
    /* Paints edge to edge, so nothing in the page margin shows through. The outset never adds scroll. */
    border-image: linear-gradient(var(--color-base) 0 0) fill 0 / 0 / 0 100vmax;
    opacity: 0;
    pointer-events: none;
  }

  .section-bar.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .section-bar::after {
    content: '';
    position: absolute;
    inset: 100% 0 auto;
    height: 1.5rem;
    border-image: linear-gradient(var(--color-base), transparent) fill 0 / 0 / 0 100vmax;
    pointer-events: none;
  }

  /* Matches a fully collapsed section heading, so the handover between them is invisible. */
  .bar-title,
  .bar-track {
    opacity: var(--handover);
  }

  .bar-title {
    flex: none;
    color: var(--color-primary);
    font: 700 2rem/1 var(--font-mono);
    letter-spacing: -0.04em;
  }

  .bar-track {
    flex: 1;
    height: 2px;
    background: linear-gradient(
      to right,
      var(--color-primary) calc(var(--progress) * 100%),
      var(--color-outline-subtle) 0
    );
  }

  @media (max-width: 760px) {
    .bar-title {
      font-size: 1.375rem;
    }
  }
</style>
