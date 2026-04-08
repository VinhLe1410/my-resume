<script lang="ts">
  import SlideLayout from '../SlideLayout.svelte';
  import type { About } from '$lib/data/resume';

  let { data }: { data: About } = $props();
</script>

<SlideLayout title="ABOUT" vertical>
  {#snippet body()}
    <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6 md:gap-12 2xl:gap-16 items-start">
      <!-- Summary -->
      <div>
        <p class="text-lg leading-relaxed text-secondary font-light">
          {data.summary}
        </p>
      </div>

      <!-- Key facts -->
      <dl class="space-y-2 md:space-y-4">
        <div class="flex justify-between border-b border-outline-subtle/20 py-2 md:py-3">
          <dt class="text-[11px] text-muted tracking-[0.2em] uppercase self-center">Location</dt>
          <dd class="text-primary text-sm">{data.location}</dd>
        </div>
        <div class="flex justify-between border-b border-outline-subtle/20 py-2 md:py-3">
          <dt class="text-[11px] text-muted tracking-[0.2em] uppercase self-center">Email</dt>
          <dd>
            <a href="mailto:{data.email}" class="text-primary text-sm hover:underline">
              {data.email.toUpperCase()}
            </a>
          </dd>
        </div>
        <div class="flex justify-between border-b border-outline-subtle/20 py-2 md:py-3">
          <dt class="text-[11px] text-muted tracking-[0.2em] uppercase self-center">Phone</dt>
          <dd class="text-primary text-sm">{data.phone}</dd>
        </div>
        <div class="flex justify-between border-b border-outline-subtle/20 py-2 md:py-3">
          <dt class="text-[11px] text-muted tracking-[0.2em] uppercase self-center">GitHub</dt>
          <dd>
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer external"
              class="text-primary text-sm hover:underline"
            >
              {data.github.replace('https://', '')}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  {/snippet}
</SlideLayout>
