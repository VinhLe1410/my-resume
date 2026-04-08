<script lang="ts">
  import type { SlideConfig } from '$lib/slides';
  import { X } from '@lucide/svelte';

  let {
    slides,
    currentSlide,
    onNavigate,
  }: {
    slides: SlideConfig[];
    currentSlide: string;
    onNavigate: (id: string) => void;
  } = $props();

  let expanded = $state(false);

  const currentSlideConfig = $derived(slides.find((s) => s.id === currentSlide));

  function toggle() {
    expanded = !expanded;
  }

  function handleNavigate(id: string) {
    onNavigate(id);
    expanded = false;
  }

  function handleBackdropClick() {
    expanded = false;
  }
</script>

<!-- Backdrop (always in DOM, opacity controlled) -->
<button
  class="fixed inset-0 z-40 transition-all duration-200
    {expanded ? 'bg-base/60 backdrop-blur-sm pointer-events-auto' : 'bg-transparent pointer-events-none'}"
  onclick={handleBackdropClick}
  aria-label="Close navigation"
  tabindex={expanded ? 0 : -1}
></button>

<!-- FAB Container (mobile only) -->
<div class="fixed bottom-6 right-6 z-50 md:hidden">
  <!-- Morphing container -->
  <div
    class="fab-container bg-surface border border-outline-subtle/50 flex flex-col overflow-hidden transition-all duration-200 ease-out"
    style="
      width: 170px;
      height: {expanded ? `${47 + slides.length * 52}px` : '48px'};
      border-radius: 1rem;
      padding: {expanded ? '0.5rem' : '0'};
      gap: {expanded ? '0.25rem' : '0'};
    "
  >
    <!-- Close / Current icon button -->
    <button
      class="shrink-0 flex items-center text-primary transition-all duration-200
        {expanded ? 'hover:text-muted' : ''}"
      style="
        width: 100%;
        height: {expanded ? '44px' : '48px'};
        padding: 0 0.75rem;
        gap: 0.75rem;
      "
      onclick={toggle}
      aria-label={expanded ? 'Close navigation' : 'Open navigation'}
      aria-expanded={expanded}
    >
      <div class="relative w-5 h-5 shrink-0">
        <!-- X icon (visible when expanded) -->
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
          style="opacity: {expanded ? 1 : 0}"
        >
          <X size={20} strokeWidth={1.5} />
        </div>
        <!-- Current section icon (visible when collapsed) -->
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
          style="opacity: {expanded ? 0 : 1}"
        >
          {#if currentSlideConfig}
            <currentSlideConfig.icon size={20} strokeWidth={1.5} />
          {/if}
        </div>
      </div>
      <!-- Label: shows current section when collapsed, "Close" when expanded -->
      <span class="text-sm flex-1 text-right">{expanded ? 'Close' : currentSlideConfig?.label}</span>
    </button>

    <!-- Nav items (always rendered, controlled by opacity/pointer-events) -->
    {#each slides as slide, i (slide.id)}
      <button
        class="nav-item shrink-0 h-11 px-3 gap-3 flex items-center rounded-xl transition-all duration-150
          {slide.id === currentSlide ? 'bg-primary text-base' : 'text-muted hover:text-primary hover:bg-surface-high'}"
        style="
          opacity: {expanded ? 1 : 0};
          pointer-events: {expanded ? 'auto' : 'none'};
          transition-delay: {expanded ? i * 30 : 0}ms;
        "
        onclick={() => handleNavigate(slide.id)}
        aria-current={slide.id === currentSlide ? 'page' : undefined}
        aria-label={slide.label}
        tabindex={expanded ? 0 : -1}
      >
        <slide.icon size={20} strokeWidth={slide.id === currentSlide ? 2 : 1.5} class="shrink-0" />
        <span class="text-sm flex-1 text-right">{slide.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .fab-container {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
</style>
