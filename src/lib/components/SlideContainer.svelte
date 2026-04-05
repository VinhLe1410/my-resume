<script lang="ts">
  import type { SlideConfig } from '$lib/slides';
  import { fly } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';

  let { slide, direction, animate }: { slide: SlideConfig; direction: number; animate: boolean } = $props();

  const Component = $derived(slide.component);
</script>

<main class="ml-60 flex-1 h-screen bg-surface slide-stack overflow-hidden">
  {#if animate}
    {#key slide.id}
      <div
        class="h-screen"
        in:fly={{ y: direction * 40, duration: 150, easing: cubicOut }}
        out:fly={{ y: direction * -40, duration: 100, easing: cubicIn }}
      >
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
  }
  .slide-stack > :global(*) {
    grid-row: 1;
    grid-column: 1;
  }
</style>
