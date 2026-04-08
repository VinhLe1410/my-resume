<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import SlideContainer from '$lib/components/SlideContainer.svelte';
  import MobileNav from '$lib/components/MobileNav.svelte';
  import { slides } from '$lib/slides';
  import { activeSlide } from '$lib/active-slide.svelte';

  const SWIPE_THRESHOLD = 50;

  function getInitialSlide(): string {
    if (browser) {
      const hash = window.location.hash.slice(1);
      if (hash && slides.some((s) => s.id === hash)) return hash;
    }
    return 'about';
  }

  let currentSlide = $state(getInitialSlide());
  let direction = $state(1);
  let ready = $state(false);
  let animate = $state(false);

  const currentSlideConfig = $derived(slides.find((s) => s.id === currentSlide)!);

  function navigate(id: string) {
    if (id === currentSlide) return;
    const currentIndex = slides.findIndex((s) => s.id === currentSlide);
    const nextIndex = slides.findIndex((s) => s.id === id);
    direction = nextIndex > currentIndex ? 1 : -1;
    currentSlide = id;
    history.replaceState(null, '', `#${id}`);
  }

  function handleKeydown(e: KeyboardEvent) {
    const currentIndex = slides.findIndex((s) => s.id === currentSlide);

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (currentIndex < slides.length - 1) {
        e.preventDefault();
        navigate(slides[currentIndex + 1].id);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        e.preventDefault();
        navigate(slides[currentIndex - 1].id);
      }
    }
  }

  // Swipe gesture handling
  let touchStartX = 0;
  let touchStartY = 0;

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      const currentIndex = slides.findIndex((s) => s.id === currentSlide);

      if (deltaX < 0 && currentIndex < slides.length - 1) {
        // Swipe left -> next slide
        navigate(slides[currentIndex + 1].id);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right -> prev slide
        navigate(slides[currentIndex - 1].id);
      }
    }
  }

  $effect(() => {
    activeSlide.id = currentSlide;
  });

  onMount(() => {
    ready = true;
    // Enable transitions after first paint
    requestAnimationFrame(() => {
      animate = true;
    });
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex" class:opacity-0={!ready} ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
  <Sidebar {slides} {currentSlide} onNavigate={navigate} />
  <SlideContainer slide={currentSlideConfig} {direction} {animate} />
  <MobileNav {slides} {currentSlide} onNavigate={navigate} />
</div>
