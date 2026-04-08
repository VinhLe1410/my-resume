<script lang="ts">
  import { slide } from 'svelte/transition';
  import { SvelteSet } from 'svelte/reactivity';
  import SlideLayout from '../SlideLayout.svelte';
  import type { ExperienceEntry } from '$lib/data/resume';
  import { activeSlide } from '$lib/active-slide.svelte';

  let { data }: { data: ExperienceEntry[] } = $props();

  const expanded = new SvelteSet<number>();

  const allExpanded = $derived(expanded.size === data.length);

  function toggle(index: number) {
    if (expanded.has(index)) expanded.delete(index);
    else expanded.add(index);
  }

  function toggleAll() {
    const wasAllExpanded = allExpanded;
    expanded.clear();
    if (!wasAllExpanded) data.forEach((_, i) => expanded.add(i));
  }

  function handleKeydown(e: KeyboardEvent) {
    if (activeSlide.id !== 'experience') return;

    // Ignore if user is typing in an input/textarea
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.key === 'a' || e.key === 'A') {
      e.preventDefault();
      toggleAll();
      return;
    }

    const num = parseInt(e.key);
    if (num >= 1 && num <= data.length) {
      e.preventDefault();
      toggle(num - 1);
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<SlideLayout title="EXPERIENCE" vertical>
  {#snippet body()}
    <div class="relative">
      <!-- Toggle-all hint (desktop only) -->
      <button
        class="hidden md:flex items-center gap-3 cursor-pointer group mb-5 md:mb-10"
        onclick={toggleAll}
        aria-expanded={allExpanded}
      >
        <kbd class="text-[11px] text-muted border border-outline px-1.5 py-0.5 font-mono tracking-wider">A</kbd>
        <span class="text-[11px] text-muted tracking-[0.2em] uppercase group-hover:text-secondary transition-colors">
          {allExpanded ? 'COLLAPSE ALL' : 'EXPAND ALL'}
        </span>
      </button>

      <!-- Grid on large screens, stack on small -->
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6 md:gap-12 2xl:gap-16 items-start">
        {#each data as entry, i (entry.company)}
          <div class="group">
            <!-- Header — always visible, clickable -->
            <button class="w-full text-left cursor-pointer" onclick={() => toggle(i)} aria-expanded={expanded.has(i)}>
              <div class="flex items-baseline mb-1 gap-3">
                <kbd class="text-[11px] text-muted border border-outline px-1.5 py-0.5 font-mono shrink-0">{i + 1}</kbd>
                <h3 class="text-base md:text-lg font-bold text-primary tracking-tight">
                  {entry.role}
                </h3>
              </div>
              <!-- Desktop: inline row | Mobile: stacked -->
              <div class="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3 gap-1 md:gap-0">
                <span class="text-xs md:text-s text-muted tracking-[0.15em] uppercase">
                  {entry.company} // {entry.location}
                </span>
                <span class="text-xs text-muted tabular-nums">
                  {entry.period}
                </span>
              </div>
              <p class="text-sm text-secondary leading-relaxed">
                {entry.summary}
              </p>

              <!-- Expand indicator -->
              <div class="mt-4 flex items-center gap-2">
                <span class="text-[11px] text-ghost tracking-[0.2em] uppercase">
                  {expanded.has(i) ? 'COLLAPSE' : 'EXPAND'}
                </span>
                <span class="text-ghost text-xs transition-transform duration-200" class:rotate-90={expanded.has(i)}>
                  →
                </span>
              </div>
            </button>

            <!-- Expandable bullet list -->
            {#if expanded.has(i)}
              <ul class="mt-6 space-y-3 border-l border-outline-subtle/30 pl-6" transition:slide={{ duration: 200 }}>
                {#each entry.bullets as bullet, j (j)}
                  <li class="flex gap-3 text-sm text-secondary/80 leading-relaxed">
                    <span class="text-ghost shrink-0">_</span>
                    <span>{bullet}</span>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Mobile floating expand-all button -->
      <button
        class="md:hidden fixed bottom-6 left-6 z-40 bg-surface border border-outline-subtle/50 rounded-full px-4 py-2 flex items-center gap-2 text-xs text-muted tracking-[0.15em] uppercase hover:text-primary hover:bg-surface-high transition-all active:scale-95"
        onclick={toggleAll}
        aria-expanded={allExpanded}
      >
        {allExpanded ? 'COLLAPSE' : 'EXPAND'}
      </button>
    </div>
  {/snippet}
</SlideLayout>
