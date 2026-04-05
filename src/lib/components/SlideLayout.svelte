<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    body,
    vertical = false,
  }: { title: string; body: Snippet; vertical?: boolean } = $props();
</script>

<div class="h-screen flex">
  {#if vertical}
    <!-- Vertical rotated title — narrow pillar -->
    <div class="w-16 shrink-0 flex justify-center items-start pt-24 pl-12">
      <h2
        class="font-headline text-5xl font-bold text-primary/50 tracking-tighter uppercase leading-none select-none vertical-title"
      >
        {title}
      </h2>
    </div>
  {:else}
    <!-- Standard horizontal title — left column -->
    <div class="w-72 shrink-0 flex items-start pt-24 pl-16 pr-8">
      <h2
        class="font-headline text-3xl font-bold text-primary tracking-tighter uppercase leading-none"
      >
        {title}
      </h2>
    </div>
  {/if}

  <!-- Body — right column -->
  <div class="flex-1 py-24 pr-24 overflow-y-auto {vertical ? 'pl-12' : ''}">
    {@render body()}
  </div>
</div>

<style>
  .vertical-title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
</style>
