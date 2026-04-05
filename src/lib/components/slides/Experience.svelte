<script lang="ts">
	import { slide } from "svelte/transition";
	import SlideLayout from "../SlideLayout.svelte";
	import type { ExperienceEntry } from "$lib/data/resume";

	let { data }: { data: ExperienceEntry[] } = $props();

	let expanded = $state<Set<number>>(new Set());

	const allExpanded = $derived(expanded.size === data.length);

	function toggle(index: number) {
		const next = new Set(expanded);
		if (next.has(index)) next.delete(index);
		else next.add(index);
		expanded = next;
	}

	function toggleAll() {
		if (allExpanded) {
			expanded = new Set();
		} else {
			expanded = new Set(data.map((_, i) => i));
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		// Ignore if user is typing in an input/textarea
		const tag = (e.target as HTMLElement)?.tagName;
		if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

		if (e.key === "a" || e.key === "A") {
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

<SlideLayout title="EXPERIENCE">
	{#snippet body()}
		<div class="space-y-12 max-w-2xl">
			<!-- Toggle-all hint -->
			<button
				class="flex items-center gap-3 cursor-pointer group"
				onclick={toggleAll}
			>
				<kbd class="text-[10px] text-muted border border-outline px-1.5 py-0.5 font-mono tracking-wider">A</kbd>
				<span class="text-[10px] text-muted tracking-[0.2em] uppercase group-hover:text-secondary transition-colors">
					{allExpanded ? "COLLAPSE ALL" : "EXPAND ALL"}
				</span>
			</button>

			{#each data as entry, i}
				<div class="group">
					<!-- Header — always visible, clickable -->
					<button
						class="w-full text-left cursor-pointer"
						onclick={() => toggle(i)}
					>
						<div class="flex items-baseline mb-2 gap-3">
							<kbd class="text-[10px] text-muted border border-outline px-1.5 py-0.5 font-mono shrink-0">{i + 1}</kbd>
							<h3 class="text-lg font-bold text-primary tracking-tight flex-1 min-w-0">
								{entry.role}
							</h3>
							<span class="text-xs text-muted tabular-nums shrink-0 whitespace-nowrap">
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
								{expanded.has(i) ? "COLLAPSE" : "EXPAND"}
							</span>
							<span
								class="text-ghost text-xs transition-transform duration-200"
								class:rotate-90={expanded.has(i)}
							>
								→
							</span>
						</div>
					</button>

					<!-- Expandable bullet list -->
					{#if expanded.has(i)}
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
