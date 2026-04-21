<script lang="ts">
  import SlideLayout from '$lib/components/SlideLayout.svelte';
  import type { About } from '$lib/data/resume';

  let { data }: { data: About } = $props();

  function linkAnchorText(href: string, text?: string) {
    return text ?? href.replace(/^https?:\/\//, '');
  }
</script>

<SlideLayout title="ABOUT" vertical>
  {#snippet body()}
    <div class="grid grid-cols-1 2xl:grid-cols-2 gap-12 2xl:gap-16 items-start">
      <!-- Summary -->
      <div>
        <p class="text-lg leading-relaxed text-secondary font-light">
          {data.summary}
        </p>
      </div>

      <!-- Key facts -->
      <dl class="space-y-4">
        {#each data.contact as row, i (`${row.kind}-${row.label}-${i}`)}
          <div class="flex justify-between border-b border-outline-subtle/20 py-3">
            <dt class="text-[11px] text-muted tracking-[0.2em] uppercase self-center">
              {row.label}
            </dt>
            <dd class="text-primary text-sm">
              {#if row.kind === 'text'}
                {row.value}
              {:else if row.kind === 'email'}
                <a href="mailto:{row.address}" class="hover:underline">
                  {row.address.toUpperCase()}
                </a>
              {:else}
                <a href={row.href} target="_blank" rel="noopener noreferrer external" class="hover:underline">
                  {linkAnchorText(row.href, row.text)}
                </a>
              {/if}
            </dd>
          </div>
        {/each}
      </dl>
    </div>
  {/snippet}
</SlideLayout>
