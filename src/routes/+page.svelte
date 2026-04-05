<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import SlideContainer from "$lib/components/SlideContainer.svelte";
	import { slides } from "$lib/slides";

	function getInitialSlide(): string {
		if (browser) {
			const hash = window.location.hash.slice(1);
			if (hash && slides.some((s) => s.id === hash)) return hash;
		}
		return "about";
	}

	let currentSlide = $state(getInitialSlide());
	let direction = $state(1);
	let ready = $state(false);
	let animate = $state(false);

	const currentSlideConfig = $derived(
		slides.find((s) => s.id === currentSlide)!,
	);

	function navigate(id: string) {
		if (id === currentSlide) return;
		const currentIndex = slides.findIndex((s) => s.id === currentSlide);
		const nextIndex = slides.findIndex((s) => s.id === id);
		direction = nextIndex > currentIndex ? 1 : -1;
		currentSlide = id;
		history.replaceState(null, "", `#${id}`);
	}

	function handleKeydown(e: KeyboardEvent) {
		const currentIndex = slides.findIndex((s) => s.id === currentSlide);

		if (e.key === "ArrowDown" || e.key === "ArrowRight") {
			if (currentIndex < slides.length - 1) {
				e.preventDefault();
				navigate(slides[currentIndex + 1].id);
			}
		} else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
			if (currentIndex > 0) {
				e.preventDefault();
				navigate(slides[currentIndex - 1].id);
			}
		}
	}

	onMount(() => {
		ready = true;
		// Enable transitions after first paint
		requestAnimationFrame(() => {
			animate = true;
		});
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex" class:opacity-0={!ready}>
	<Sidebar {slides} {currentSlide} onNavigate={navigate} />
	<SlideContainer slide={currentSlideConfig} {direction} {animate} />
</div>
