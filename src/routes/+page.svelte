<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import SlideContainer from '$lib/components/SlideContainer.svelte';
  import { slides, type SlideId } from '$lib/slides';

  let active: SlideId = $state('about');
  let readingPane: HTMLElement;
  let navigation = 0;
  const positions: Partial<Record<SlideId, number>> = {};

  const activeIndex = $derived(slides.findIndex((slide) => slide.id === active));
  const previous = $derived(slides[activeIndex - 1]);
  const next = $derived(slides[activeIndex + 1]);

  function usesDocumentScroll() {
    return window.matchMedia('(max-width: 760px), (max-height: 700px)').matches;
  }

  async function activate(id: SlideId, focus = true) {
    if (id !== active) {
      positions[active] = usesDocumentScroll() ? window.scrollY : readingPane.scrollTop;
      active = id;
      const currentNavigation = ++navigation;
      await tick();
      if (currentNavigation !== navigation) return;
      const position = positions[id] ?? 0;
      if (usesDocumentScroll()) window.scrollTo(0, position);
      else readingPane.scrollTop = position;
    } else if (focus) {
      if (usesDocumentScroll()) window.scrollTo(0, 0);
      else readingPane.scrollTop = 0;
    }

    if (focus) readingPane.focus({ preventScroll: true });
  }

  function navigate(event: MouseEvent, id: SlideId) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey ||
      event.defaultPrevented
    )
      return;
    event.preventDefault();
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    void activate(id);
  }

  function syncWithUrl() {
    const id = slides.find((slide) => `#${slide.id}` === location.hash)?.id ?? (!location.hash ? 'about' : undefined);
    if (id && id !== active) void activate(id);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    if (window.getSelection()?.toString()) return;
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.closest('button, summary, input, textarea, select, [contenteditable], [role="textbox"]')) return;

    if (!usesDocumentScroll() && !readingPane.contains(event.target)) {
      let distance = 0;
      switch (event.key) {
        case 'ArrowDown':
          distance = 40;
          break;
        case 'ArrowUp':
          distance = -40;
          break;
        case 'PageDown':
        case ' ':
          distance = readingPane.clientHeight * 0.9;
          break;
        case 'PageUp':
          distance = -readingPane.clientHeight * 0.9;
          break;
      }
      if (distance) {
        event.preventDefault();
        readingPane.scrollBy(0, distance);
        return;
      }
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (event.repeat || event.target.closest('a')) return;

    const id = slides[activeIndex + (event.key === 'ArrowRight' ? 1 : -1)]?.id;
    if (!id) return;
    event.preventDefault();
    history.pushState(null, '', `#${id}`);
    void activate(id);
  }

  onMount(() => {
    const restoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const id = slides.find((slide) => `#${slide.id}` === location.hash)?.id;
    if (id) void activate(id, false);
    return () => {
      history.scrollRestoration = restoration;
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} onpopstate={syncWithUrl} onhashchange={syncWithUrl} />

<div class="resume-shell">
  <Sidebar {active} onNavigate={navigate} />
  <main class="reading-pane" bind:this={readingPane} tabindex="-1" aria-label="{slides[activeIndex].label} section">
    <SlideContainer {active} onNavigate={navigate} />
  </main>
  <footer class="controls" aria-label="Section navigation">
    <div class="controls-inner">
      {#if previous}
        <a class="control previous" href="#{previous.id}" onclick={(event) => navigate(event, previous.id)}>
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
        <a class="control next" href="#{next.id}" onclick={(event) => navigate(event, next.id)}>
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
  .resume-shell {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    padding-bottom: 4.75rem;
  }

  .reading-pane {
    width: 100%;
    max-width: 90rem;
    flex: 1;
    min-height: 0;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4.5vw, 5rem);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .reading-pane:focus {
    outline: none;
  }

  .reading-pane:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
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

  @media (max-width: 760px), (max-height: 700px) {
    .resume-shell {
      height: auto;
      min-height: 100dvh;
    }

    .reading-pane {
      flex: 1 0 auto;
      overflow: visible;
    }

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
