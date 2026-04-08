<script lang="ts">
  import SlideLayout from '../SlideLayout.svelte';
  import type { Education } from '$lib/data/resume';

  let { data }: { data: Education } = $props();
</script>

<SlideLayout title="EDUCATION" vertical>
  {#snippet body()}
    <div class="max-w-2xl space-y-5 md:space-y-10">
      <!-- Degree info -->
      <div>
        <h3 class="text-lg font-bold text-primary tracking-tight mb-1">
          {data.degree}
        </h3>
        <div class="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3 gap-1 md:gap-0">
          <span class="text-xs text-muted tracking-[0.15em] uppercase">
            {data.institution} // {data.mode}
          </span>
          <span class="text-xs text-muted tabular-nums">
            {data.period}
          </span>
        </div>
        <p class="text-sm text-secondary leading-relaxed">
          {data.description}
        </p>
      </div>

      <!-- Achievements -->
      <div>
        <h4 class="text-xs text-muted tracking-[0.15em] uppercase mb-3 md:mb-5">Notable Grades</h4>
        <ul class="space-y-2 md:space-y-3 border-l border-outline-subtle/30 pl-4 md:pl-6">
          {#each data.achievements as achievement, i (i)}
            <li class="flex gap-3 text-sm text-secondary/80 leading-relaxed">
              <span class="text-ghost shrink-0">_</span>
              <span>{achievement}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/snippet}
</SlideLayout>
