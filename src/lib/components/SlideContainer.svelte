<script lang="ts">
  import type { SlideConfig } from '$lib/slides';
  import { fly } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';
  import { device } from '$lib/device.svelte.ts';

  let { slide, direction, animate }: { slide: SlideConfig; direction: number; animate: boolean } = $props();

  const Component = $derived(slide.component);

  // Transition config based on layout mode
  const transitionIn = $derived(
    device.useMobileLayout
      ? { x: direction * 40, duration: 150, easing: cubicOut }
      : { y: direction * 40, duration: 150, easing: cubicOut },
  );

  const transitionOut = $derived(
    device.useMobileLayout
      ? { x: direction * -40, duration: 100, easing: cubicIn }
      : { y: direction * -40, duration: 100, easing: cubicIn },
  );
</script>

<main
  class="flex-1 h-screen bg-surface slide-stack overflow-hidden"
  class:ml-0={device.useMobileLayout}
  style={device.useMobileLayout ? '' : 'margin-left: var(--sidebar-w)'}
>
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
