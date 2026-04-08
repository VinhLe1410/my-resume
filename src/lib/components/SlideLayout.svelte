<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { device } from '$lib/device.svelte';

  let { title, body, vertical = true }: { title: string; body: Snippet; vertical?: boolean } = $props();

  type TitleMode = 'pillar' | 'banner';
  const titleMode = $derived<TitleMode>(
    !device.useMobileLayout && !device.useCompactTitles && vertical ? 'pillar' : 'banner',
  );

  // Gate transitions so the title doesn't animate from a default state on first paint.
  let ready = $state(false);
  onMount(() => {
    requestAnimationFrame(() => (ready = true));
  });
</script>

<div class="relative h-screen overflow-hidden">
  <div
    class="morphing-body absolute inset-0 overflow-y-auto"
    class:is-pillar={titleMode === 'pillar'}
    class:is-banner={titleMode === 'banner'}
    class:is-mobile={device.useMobileLayout}
    class:no-transition={!ready}
  >
    {@render body()}
  </div>

  <div
    class="morphing-backdrop"
    class:is-pillar={titleMode === 'pillar'}
    class:is-banner={titleMode === 'banner'}
    class:no-transition={!ready}
    aria-hidden="true"
  ></div>

  <h2
    class="morphing-title font-headline font-bold tracking-tighter uppercase leading-none select-none"
    class:is-pillar={titleMode === 'pillar'}
    class:is-banner={titleMode === 'banner'}
    class:no-transition={!ready}
  >
    {title}
  </h2>
</div>

<style>
  .morphing-title {
    position: absolute;
    transform-origin: top left;
    transition:
      top 300ms ease,
      left 300ms ease,
      transform 300ms ease,
      font-size 300ms ease,
      color 300ms ease;
    z-index: 2;
    /* Prevent the rotated box from forcing a line break at narrow containers. */
    white-space: nowrap;
  }

  .morphing-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5rem;
    z-index: 1; /* above body, below title */
    pointer-events: none;
    background-color: rgb(from var(--color-surface) r g b / 0.6);
    backdrop-filter: blur(12px) saturate(140%);
    -webkit-backdrop-filter: blur(12px) saturate(140%);
    border-bottom: 1px solid rgb(from var(--color-outline-subtle) r g b / 0.5);
    /* Soft fade at the bottom edge so the cutoff isn't a hard line. */
    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
    transition:
      opacity 300ms ease,
      transform 300ms ease;
  }

  .morphing-backdrop.is-pillar {
    opacity: 0;
    transform: translateY(-100%);
  }

  .morphing-backdrop.is-banner {
    opacity: 1;
    transform: translateY(0);
  }

  .morphing-title.is-pillar {
    top: 6rem; /* matches previous pt-24 */
    /* Previous layout: w-16 (64px) container with pl-12 (48px) justify-center
       centered a 48px-wide rotated h2 at x=56, giving visual X range [32, 80].
       `left: 2rem` (32px) reproduces that pillar position. */
    left: 2rem;
    font-size: 3rem; /* text-5xl */
    color: rgb(from var(--color-primary) r g b / 0.5);
    /* Rotate around the top-left, then translate -100% in the pre-rotation
       frame so the element's visual box sits at [top, top+textWidth] instead
       of above `top`. Produces bottom-to-top reading text matching the old
       `writing-mode: vertical-rl; rotate(180deg)` combination. */
    transform: rotate(-90deg) translateX(-100%);
  }

  .morphing-title.is-banner {
    top: 1.5rem; /* matches previous pt-6 */
    left: 1.5rem; /* matches previous px-6 */
    font-size: 1.5rem; /* text-2xl */
    color: var(--color-primary);
    transform: rotate(0deg) translateX(0);
  }

  .morphing-body {
    transition: padding 300ms ease;
  }

  .morphing-body.is-pillar {
    padding: 6rem 6rem 6rem 7rem; /* py-24 pr-24 pl-28 */
  }

  .morphing-body.is-banner {
    padding: 5rem 2rem 3rem 2rem;
  }

  .morphing-body.is-mobile {
    padding: 5rem 1rem 5rem 1rem;
  }

  .no-transition {
    transition: none !important;
  }
</style>
