<script lang="ts">
	import SlideLayout from "./SlideLayout.svelte";

	let { title }: { title: string } = $props();
</script>

<SlideLayout {title}>
	{#snippet body()}
		<p class="text-muted text-sm tracking-widest uppercase">Content coming soon.</p>
	{/snippet}
</SlideLayout>
