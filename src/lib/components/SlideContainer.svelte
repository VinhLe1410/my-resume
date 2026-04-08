<script lang="ts">
  import { onMount } from 'svelte';
  import type { SlideConfig } from '$lib/slides';
  import { fly } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';

  let { slide, direction, animate }: { slide: SlideConfig; direction: number; animate: boolean } = $props();

  const Component = $derived(slide.component);

  // Detect mobile for horizontal vs vertical transitions
  let isMobile = $state(false);

  onMount(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    isMobile = mq.matches;

    const handler = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  // Transition config based on device
  const transitionIn = $derived(
    isMobile
      ? { x: direction * 40, duration: 150, easing: cubicOut }
      : { y: direction * 40, duration: 150, easing: cubicOut },
  );

  const transitionOut = $derived(
    isMobile
      ? { x: direction * -40, duration: 100, easing: cubicIn }
      : { y: direction * -40, duration: 100, easing: cubicIn },
  );
</script>

<main class="ml-(--sidebar-w) flex-1 h-screen bg-surface slide-stack overflow-hidden">
  {#if animate}
    {#key slide.id}
      <div class="h-screen" in:fly={transitionIn} out:fly={transitionOut}>
        <Component {...slide.props} />
      </div>
    {/key}
  {:else}
    <div class="h-screen">
      <Component {...slide.props} />
    </div>
  {/if}
</main>

<style>
  .slide-stack {
    display: grid;
    grid-template: 1fr / 1fr;
    transition: margin-left 300ms ease;
  }
  .slide-stack > :global(*) {
    grid-row: 1;
    grid-column: 1;
  }
</style>
