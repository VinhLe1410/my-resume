<script lang="ts">
	import type { SlideConfig } from "$lib/slides";

	let { slide }: { slide: SlideConfig } = $props();

	const Component = $derived(slide.component);
</script>

<main class="ml-60 h-screen bg-surface">
	<Component {...slide.props} />
</main>
