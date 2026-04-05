<script lang="ts">
  import SlideLayout from "../SlideLayout.svelte";
  import type { SkillCategory } from "$lib/data/resume";

  let { data }: { data: SkillCategory[] } = $props();
</script>

<SlideLayout title="SKILLS" vertical>
  {#snippet body()}
    <div>
      <!-- Legend -->
      <div class="flex items-center gap-4 mb-10">
        <span class="inline-block w-2 h-2 border border-primary"></span>
        <span class="text-xs text-muted tracking-[0.15em] uppercase">Active in the past 6 months</span>
      </div>

      <!-- Category grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-16 gap-y-12">
        {#each data as category}
          <div>
            <h4 class="text-xs text-muted tracking-[0.15em] uppercase mb-5">
              {category.label}
            </h4>
            <div class="flex flex-wrap gap-2.5">
              {#each category.items as item}
                {#if item.pinned}
                  <span class="text-sm text-primary border border-primary/60 px-2.5 py-1">
                    {item.name}
                  </span>
                {:else}
                  <span class="text-sm text-muted px-2.5 py-1">
                    {item.name}
                  </span>
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/snippet}
</SlideLayout>
