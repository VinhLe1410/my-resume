<script lang="ts">
	import { slide } from "svelte/transition";
	import SlideLayout from "../SlideLayout.svelte";
	import type { ExperienceEntry } from "$lib/data/resume";

	let { data }: { data: ExperienceEntry[] } = $props();

	let expandedIndex = $state<number | null>(null);

	function toggle(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}
</script>

<SlideLayout title="EXPERIENCE">
	{#snippet body()}
		<div class="space-y-12 max-w-2xl">
			{#each data as entry, i}
				<div class="group">
					<!-- Header — always visible, clickable -->
					<button
						class="w-full text-left cursor-pointer"
						onclick={() => toggle(i)}
					>
						<div class="flex justify-between items-baseline mb-2">
							<h3 class="text-lg font-bold text-primary tracking-tight">
								{entry.role}
							</h3>
							<span class="text-xs text-muted tabular-nums shrink-0 ml-4">
								{entry.period}
							</span>
						</div>
						<div class="text-xs text-muted tracking-[0.15em] uppercase mb-3">
							{entry.company} // {entry.location}
						</div>
						<p class="text-sm text-secondary leading-relaxed">
							{entry.summary}
						</p>

						<!-- Expand indicator -->
						<div class="mt-4 flex items-center gap-2">
							<span class="text-[10px] text-ghost tracking-[0.2em] uppercase">
								{expandedIndex === i ? "COLLAPSE" : "EXPAND"}
							</span>
							<span
								class="text-ghost text-xs transition-transform duration-200"
								class:rotate-90={expandedIndex === i}
							>
								→
							</span>
						</div>
					</button>

					<!-- Expandable bullet list -->
					{#if expandedIndex === i}
						<ul
							class="mt-6 space-y-3 border-l border-outline-subtle/30 pl-6"
							transition:slide={{ duration: 200 }}
						>
							{#each entry.bullets as bullet}
								<li class="flex gap-3 text-sm text-secondary/80 leading-relaxed">
									<span class="text-ghost shrink-0">_</span>
									<span>{bullet}</span>
								</li>
							{/each}
						</ul>
					{/if}

					<!-- Separator between entries -->
					{#if i < data.length - 1}
						<div class="mt-12 border-b border-outline-subtle/10"></div>
					{/if}
				</div>
			{/each}
		</div>
	{/snippet}
</SlideLayout>
