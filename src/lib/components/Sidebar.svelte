<script lang="ts">
	import type { SlideConfig } from "$lib/slides";

	let {
		slides,
		currentSlide,
		onNavigate,
	}: {
		slides: SlideConfig[];
		currentSlide: string;
		onNavigate: (id: string) => void;
	} = $props();
</script>

<nav class="fixed left-0 top-0 h-full w-60 bg-surface-dim flex flex-col py-12 px-8 justify-between z-50">
	<div class="space-y-12">
		<!-- Name -->
		<div>
			<h1 class="text-xl font-bold tracking-tighter text-primary font-headline uppercase leading-none">
				Your Name
			</h1>
			<span class="text-[10px] text-ghost mt-2 block tracking-widest">
				RESUME // 2026
			</span>
		</div>

		<!-- Navigation -->
		<ul class="flex flex-col space-y-5">
			{#each slides as slide}
				<li>
					<button
						class="text-xs tracking-[0.15em] transition-all duration-150 pl-4 text-left w-full
							{slide.id === currentSlide
								? 'text-primary font-bold border-l border-primary'
								: 'text-muted hover:text-secondary border-l border-transparent'}"
						onclick={() => onNavigate(slide.id)}
					>
						{slide.label}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</nav>
