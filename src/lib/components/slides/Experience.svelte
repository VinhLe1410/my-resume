<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { ExperienceEntry } from '$lib/data/resume';
  import { experienceState } from '$lib/experience-state.svelte';
  import SlideLayout from '$lib/components/SlideLayout.svelte';

  let { data }: { data: ExperienceEntry[] } = $props();

  const allExpanded = $derived(experienceState.isAllExpanded(data.length));

  function toggle(index: number) {
    experienceState.toggle(index);
  }

  function toggleAll() {
    experienceState.toggleAll(data.length);
  }
</script>

<SlideLayout title="EXPERIENCE" vertical>
  {#snippet body()}
    <div>
      <!-- Toggle-all hint -->
      <button
        class="flex items-center gap-3 cursor-pointer group mb-10"
        onclick={toggleAll}
        aria-expanded={allExpanded}
      >
        <kbd class="text-[11px] text-muted border border-outline px-1.5 py-0.5 font-mono tracking-wider">A</kbd>
        <span class="text-[11px] text-muted tracking-[0.2em] uppercase group-hover:text-secondary transition-colors">
          {allExpanded ? 'COLLAPSE ALL' : 'EXPAND ALL'}
        </span>
      </button>

      <!-- Grid on large screens, stack on small -->
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-12 2xl:gap-16 items-start">
        {#each data as entry, i (entry.company)}
          <div class="group">
            <!-- Header — always visible, clickable -->
            <button
              class="w-full text-left cursor-pointer"
              onclick={() => toggle(i)}
              aria-expanded={experienceState.isExpanded(i)}
            >
              <div class="flex items-baseline mb-1 gap-3">
                <kbd class="text-[11px] text-muted border border-outline px-1.5 py-0.5 font-mono shrink-0">{i + 1}</kbd>
                <h3 class="text-lg font-bold text-primary tracking-tight">
                  {entry.role}
                </h3>
              </div>
              <div class="flex items-baseline justify-between mb-3">
                <span class="text-xs text-muted tracking-[0.15em] uppercase">
                  {entry.company} // {entry.location}
                </span>
                <span class="text-xs text-muted tabular-nums shrink-0 whitespace-nowrap">
                  {entry.period}
                </span>
              </div>
              <p class="text-sm text-secondary leading-relaxed">
                {entry.summary}
              </p>

              <!-- Expand indicator -->
              <div class="mt-4 flex items-center gap-2">
                <span class="text-[11px] text-ghost tracking-[0.2em] uppercase">
                  {experienceState.isExpanded(i) ? 'COLLAPSE' : 'EXPAND'}
                </span>
                <span
                  class="text-ghost text-xs transition-transform duration-200"
                  class:rotate-90={experienceState.isExpanded(i)}
                >
                  →
                </span>
              </div>
            </button>

            <!-- Expandable bullet list -->
            {#if experienceState.isExpanded(i)}
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
    </div>
  {/snippet}
</SlideLayout>
