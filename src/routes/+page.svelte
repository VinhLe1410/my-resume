<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { activeSlide } from '$lib/active-slide.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import SlideContainer from '$lib/components/SlideContainer.svelte';
  import { resume } from '$lib/data/resume';
  import { experienceState } from '$lib/experience-state.svelte';
  import { slides } from '$lib/slides';
  import { isViewportBlocked, viewportBlock } from '$lib/viewport-block.svelte';

  const BLOCKER_TITLE_ID = 'viewport-blocker-title';
  const BLOCKER_DESCRIPTION_ID = 'viewport-blocker-description';

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
  let viewportReady = $state(false);

  const currentSlideConfig = $derived(slides.find((s) => s.id === currentSlide) ?? slides[0]);

  function syncViewportBlock() {
    if (!browser) return;

    viewportBlock.active = isViewportBlocked(window.innerWidth, window.innerHeight);
    viewportReady = true;
  }

  function navigate(id: string) {
    if (viewportBlock.active || id === currentSlide) return;
    const currentIndex = slides.findIndex((s) => s.id === currentSlide);
    const nextIndex = slides.findIndex((s) => s.id === id);
    direction = nextIndex > currentIndex ? 1 : -1;
    currentSlide = id;
    history.replaceState(null, '', `#${id}`);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (viewportBlock.active) {
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
      }
      return;
    }

    // Ignore if user is typing in an input/textarea
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    const currentIndex = slides.findIndex((s) => s.id === currentSlide);

    // Navigation keys (all slides)
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (currentIndex < slides.length - 1) {
        e.preventDefault();
        navigate(slides[currentIndex + 1].id);
      }
      return;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        e.preventDefault();
        navigate(slides[currentIndex - 1].id);
      }
      return;
    }

    // Experience slide shortcuts
    if (currentSlide === 'experience') {
      const experienceCount = resume.experience.length;

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        experienceState.toggleAll(experienceCount);
        return;
      }

      const num = parseInt(e.key);
      if (num >= 1 && num <= experienceCount) {
        e.preventDefault();
        experienceState.toggle(num - 1);
      }
    }
  }

  $effect(() => {
    activeSlide.id = currentSlide;
  });

  onMount(() => {
    syncViewportBlock();
    ready = true;
    // Enable transitions after first paint
    requestAnimationFrame(() => {
      animate = true;
    });
  });
</script>

<svelte:window onkeydown={handleKeydown} onresize={syncViewportBlock} />

<div
  class="resume-shell"
  data-viewport-ready={viewportReady ? 'true' : 'false'}
  data-view-blocked={viewportBlock.active ? 'true' : 'false'}
>
  <div
    class="resume-deck flex"
    class:opacity-0={!ready}
    inert={viewportBlock.active}
    aria-hidden={viewportBlock.active ? 'true' : 'false'}
  >
    <Sidebar {slides} {currentSlide} onNavigate={navigate} />
    <SlideContainer slide={currentSlideConfig} {direction} {animate} />
  </div>

  <div
    class="viewport-blocker"
    role={viewportBlock.active ? 'dialog' : undefined}
    aria-modal={viewportBlock.active ? 'true' : undefined}
    aria-hidden={viewportBlock.active ? 'false' : 'true'}
    aria-labelledby={BLOCKER_TITLE_ID}
    aria-describedby={BLOCKER_DESCRIPTION_ID}
  >
    <div class="viewport-blocker__panel">
      <p class="viewport-blocker__eyebrow">Unsupported viewport</p>
      <p id={BLOCKER_TITLE_ID} class="viewport-blocker__message">
        I&apos;m sorry, but your screen size is not suitable for viewing my resume. I tried some extra navigation
        features, but my Lighthouse score dropped significantly.
      </p>
      <p id={BLOCKER_DESCRIPTION_ID} class="viewport-blocker__hint">Resize your window or use a larger screen.</p>
    </div>
  </div>
</div>

<style>
  .resume-shell {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }

  .resume-deck {
    transform-origin: center;
    transition:
      filter 220ms ease,
      opacity 220ms ease,
      transform 220ms ease;
  }

  .viewport-blocker {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    padding: 2rem;
    background: rgb(8 8 8 / 0.58);
    opacity: 0;
    pointer-events: none;
    transition: opacity 220ms ease;
  }

  .viewport-blocker__panel {
    width: min(34rem, 100%);
    border: 1px solid var(--color-outline-subtle);
    background: rgb(19 19 19 / 0.92);
    padding: clamp(1.5rem, 4vw, 2.5rem);
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 0.35);
  }

  .viewport-blocker__eyebrow {
    margin: 0 0 1rem;
    color: var(--color-muted);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .viewport-blocker__message {
    margin: 0;
    color: var(--color-primary);
    font-family: var(--font-headline);
    font-size: clamp(1.35rem, 2vw, 1.75rem);
    line-height: 1.3;
  }

  .viewport-blocker__hint {
    margin: 1rem 0 0;
    color: var(--color-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .resume-shell[data-view-blocked='true'] .resume-deck {
    filter: blur(18px);
    opacity: 0.18;
    pointer-events: none;
    transform: scale(0.985);
    user-select: none;
  }

  .resume-shell[data-view-blocked='true'] .viewport-blocker {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 900px), (max-height: 700px) {
    .resume-shell:not([data-viewport-ready='true']) .resume-deck {
      filter: blur(18px);
      opacity: 0.18;
      pointer-events: none;
      transform: scale(0.985);
      user-select: none;
    }

    .resume-shell:not([data-viewport-ready='true']) .viewport-blocker {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
