<script lang="ts">
  import { replaceState } from '$app/navigation';
  import SectionBar from '$lib/components/SectionBar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import SlideContainer from '$lib/components/SlideContainer.svelte';
  import { goToSection } from '$lib/navigation';
  import { slides, type SlideId } from '$lib/slides';
  import { onMount } from 'svelte';

  let active: SlideId = $state('about');
  const activeIndex = $derived(slides.findIndex((slide) => slide.id === active));
  const previous = $derived(slides[activeIndex - 1]);
  const next = $derived(slides[activeIndex + 1]);

  // During a smooth scroll `active` still names the section being left.
  // Rapid arrow presses count from the section the page is heading to.
  let pendingId: SlideId | null = null;

  function syncActive() {
    const midpoint = window.innerHeight / 2;
    const slide = slides.find(({ id }) => {
      const rect = document.getElementById(id)?.getBoundingClientRect();
      return rect && rect.top <= midpoint && rect.bottom > midpoint;
    });
    if (!slide) return;
    if (slide.id === pendingId) pendingId = null;
    if (slide.id === active) return;
    active = slide.id;
    if (location.hash !== `#${slide.id}`) {
      // A fragment keeps the current pathname and query string.
      // eslint-disable-next-line svelte/no-navigation-without-resolve
      replaceState(`#${slide.id}`, {});
    }
  }

  function cancelPending() {
    pendingId = null;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      cancelPending();
      return;
    }
    if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    if (window.getSelection()?.toString()) return;
    if (!(event.target instanceof HTMLElement)) return;
    if (
      event.repeat ||
      event.target.closest('a, button, summary, input, textarea, select, [contenteditable], [role="textbox"]')
    )
      return;

    const fromIndex = pendingId ? slides.findIndex(({ id }) => id === pendingId) : activeIndex;
    const target = slides[fromIndex + (event.key === 'ArrowRight' ? 1 : -1)];
    if (!target) return;
    event.preventDefault();
    pendingId = target.id;
    goToSection(target.id);
  }

  onMount(syncActive);
</script>

<svelte:window
  onkeydown={handleKeydown}
  onscroll={syncActive}
  onresize={syncActive}
  onhashchange={syncActive}
  onwheel={cancelPending}
  ontouchstart={cancelPending}
/>

<div class="resume-shell">
  <Sidebar {active} />
  <main class="reading-pane" aria-label="Resume sections"><SectionBar /><SlideContainer /></main>
  <footer class="controls" aria-label="Section navigation">
    <div class="controls-inner">
      {#if previous}
        <a class="control previous" href="#{previous.id}">
          <span class="control-caption">Previous</span>
          <span class="control-name">← {previous.label}</span>
        </a>
      {:else}
        <span></span>
      {/if}
      <div class="progress">
        <span class="position" aria-label="Section {activeIndex + 1} of {slides.length}"
          >0{activeIndex + 1} / 0{slides.length}</span
        >
        <span class="keyboard-hint" aria-label="Use the left and right arrow keys to change sections"
          >← / → to switch</span
        >
      </div>
      {#if next}
        <a class="control next" href="#{next.id}">
          <span class="control-caption">Next</span>
          <span class="control-name">{next.label} →</span>
        </a>
      {:else}
        <span></span>
      {/if}
    </div>
  </footer>
</div>

<style>
  :global(html) {
    --resume-header-height: 4.75rem;
    --section-bar-height: 3rem;
    scroll-padding-top: var(--resume-header-height);
    scroll-padding-bottom: 4.75rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    :global(html) {
      scroll-behavior: smooth;
    }
  }

  .resume-shell {
    min-height: 100dvh;
    padding-bottom: 4.75rem;
  }

  .reading-pane {
    width: 100%;
    max-width: 90rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4.5vw, 5rem);
  }

  .controls {
    position: fixed;
    z-index: 10;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 4.75rem;
    border-top: 1px solid var(--color-outline-subtle);
    background: var(--color-base);
  }

  .controls-inner {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    max-width: 90rem;
    min-height: 4.75rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4.5vw, 5rem);
  }

  .control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    width: fit-content;
    min-height: 3.5rem;
    color: var(--color-primary);
    font: 400 0.75rem/1.3 var(--font-mono);
  }

  .control:hover .control-name {
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }

  .control.next {
    justify-self: end;
    text-align: right;
  }

  .progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .control-caption,
  .position,
  .keyboard-hint {
    color: var(--color-muted);
    font: 400 0.67rem/1.3 var(--font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .position {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .keyboard-hint {
    font-size: 0.6rem;
    text-transform: none;
  }

  @media (max-width: 760px) {
    :global(html) {
      --resume-header-height: 6.25rem;
      --section-bar-height: 2.75rem;
    }
  }

  @media (max-width: 760px), (max-height: 700px) {
    .keyboard-hint {
      display: none;
    }
  }

  @media (max-width: 360px) {
    .control {
      font-size: 0.68rem;
    }
  }
</style>
