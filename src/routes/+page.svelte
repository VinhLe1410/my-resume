<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte";
	import SlideContainer from "$lib/components/SlideContainer.svelte";
	import { slides } from "$lib/slides";

	let currentSlide = $state("about");

	const currentSlideConfig = $derived(
		slides.find((s) => s.id === currentSlide)!,
	);

	function navigate(id: string) {
		currentSlide = id;
	}
</script>

<div class="flex">
	<Sidebar {slides} {currentSlide} onNavigate={navigate} />
	<SlideContainer slide={currentSlideConfig} />
</div>
