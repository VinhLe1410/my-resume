<script lang="ts">
	import type { Snippet } from "svelte";

	let { title, body }: { title: string; body: Snippet } = $props();
</script>

<div class="h-screen flex">
	<!-- Section header — left column -->
	<div class="w-72 shrink-0 flex items-start pt-24 pl-16 pr-8">
		<h2
			class="font-headline text-3xl font-bold text-primary tracking-tighter uppercase leading-none"
		>
			{title}
		</h2>
	</div>

	<!-- Body — right column -->
	<div class="flex-1 py-24 pr-24 overflow-y-auto">
		{@render body()}
	</div>
</div>
