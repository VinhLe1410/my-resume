<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, body, vertical = false }: { title: string; body: Snippet; vertical?: boolean } = $props();
</script>

<div class="h-screen flex flex-col md:flex-row">
  <!-- Mobile horizontal title -->
  <div class="md:hidden shrink-0 px-6 pt-6 pb-4">
    <h2 class="font-headline text-2xl font-bold text-primary tracking-tighter uppercase leading-none">
      {title}
    </h2>
  </div>

  {#if vertical}
    <!-- Vertical rotated title — narrow pillar (desktop only) -->
    <div class="hidden md:flex w-16 shrink-0 justify-center items-start pt-24 pl-12">
      <h2
        class="font-headline text-5xl font-bold text-primary/50 tracking-tighter uppercase leading-none select-none vertical-title"
      >
        {title}
      </h2>
    </div>
  {:else}
    <!-- Standard horizontal title — left column (desktop only) -->
    <div class="hidden md:flex w-72 shrink-0 items-start pt-24 pl-16 pr-8">
      <h2 class="font-headline text-3xl font-bold text-primary tracking-tighter uppercase leading-none">
        {title}
      </h2>
    </div>
  {/if}

  <!-- Body -->
  <div class="flex-1 px-4 pb-20 md:py-24 md:pr-24 md:px-0 overflow-y-auto {vertical ? 'md:pl-12' : ''}">
    {@render body()}
  </div>
</div>

<style>
  .vertical-title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
</style>
