<script lang="ts">
  import type { Snippet } from 'svelte';
  import { device } from '$lib/device.svelte.ts';

  let { title, body, vertical = false }: { title: string; body: Snippet; vertical?: boolean } = $props();

  // Stack title above body when: actual mobile layout OR compact desktop (480-768px)
  const stackTitle = $derived(device.useMobileLayout || device.useCompactTitles);
</script>

<div class="h-screen flex" class:flex-col={stackTitle} class:flex-row={!stackTitle}>
  {#if stackTitle}
    <!-- Stacked horizontal title (mobile or compact desktop) -->
    <div class="shrink-0 px-6 pt-6 pb-4">
      <h2 class="font-headline text-2xl font-bold text-primary tracking-tighter uppercase leading-none">
        {title}
      </h2>
    </div>
  {:else if vertical}
    <!-- Vertical rotated title — narrow pillar (wide desktop) -->
    <div class="flex w-16 shrink-0 justify-center items-start pt-24 pl-12">
      <h2
        class="font-headline text-5xl font-bold text-primary/50 tracking-tighter uppercase leading-none select-none vertical-title"
      >
        {title}
      </h2>
    </div>
  {:else}
    <!-- Standard horizontal title — left column (wide desktop) -->
    <div class="flex w-72 shrink-0 items-start pt-24 pl-16 pr-8">
      <h2 class="font-headline text-3xl font-bold text-primary tracking-tighter uppercase leading-none">
        {title}
      </h2>
    </div>
  {/if}

  <!-- Body -->
  <div
    class="flex-1 overflow-y-auto"
    class:px-4={device.useMobileLayout}
    class:pb-20={device.useMobileLayout}
    class:px-8={device.useCompactTitles && !device.useMobileLayout}
    class:pb-12={device.useCompactTitles && !device.useMobileLayout}
    class:py-24={!stackTitle}
    class:pr-24={!stackTitle}
    class:pl-12={!stackTitle && vertical}
  >
    {@render body()}
  </div>
</div>

<style>
  .vertical-title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
</style>
