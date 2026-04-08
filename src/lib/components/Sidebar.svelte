<script lang="ts">
  import type { SlideConfig } from '$lib/slides';
  import { resume } from '$lib/data/resume';

  let {
    slides,
    currentSlide,
    onNavigate,
  }: {
    slides: SlideConfig[];
    currentSlide: string;
    onNavigate: (id: string) => void;
  } = $props();

  const ITEM_HEIGHT = 30;
  const ITEM_GAP = 2;

  const activeIndex = $derived(slides.findIndex((s) => s.id === currentSlide));
  const highlightY = $derived(activeIndex * (ITEM_HEIGHT + ITEM_GAP));
</script>

<nav
  class="fixed left-0 top-0 h-full w-(--sidebar-w) bg-surface-dim flex-col py-12 px-(--sidebar-px) items-center justify-between z-50 hidden md:flex"
>
  <div class="space-y-12 text-center">
    <!-- Name -->
    <div>
      <h1 class="text-3xl font-bold tracking-tighter text-primary font-headline uppercase leading-none">
        {resume.about.name}
      </h1>
      <span class="text-[11px] text-ghost mt-2 block tracking-widest"> RESUME // 04042026 </span>
    </div>

    <!-- Navigation -->
    <div class="relative">
      <!-- Sliding highlight box -->
      <div
        class="highlight absolute border border-primary pointer-events-none"
        style="left: var(--sidebar-highlight-inset); right: var(--sidebar-highlight-inset); height: {ITEM_HEIGHT}px; transform: translateY({highlightY}px);"
      ></div>

      <ul class="flex flex-col" style="gap: {ITEM_GAP}px;">
        {#each slides as slide (slide.id)}
          <li>
            <button
              aria-current={slide.id === currentSlide ? 'page' : undefined}
              class="text-xs tracking-[0.15em] transition-colors duration-150 w-full flex items-center justify-center
                {slide.id === currentSlide ? 'text-primary font-bold' : 'text-muted hover:text-secondary'}"
              style="height: {ITEM_HEIGHT}px;"
              onclick={() => onNavigate(slide.id)}
            >
              {slide.label}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Keyboard hint -->
  <div class="flex items-center gap-2">
    <kbd class="text-[11px] text-muted border border-outline-subtle/50 px-1.5 py-0.5 font-mono">↑</kbd>
    <kbd class="text-[11px] text-muted border border-outline-subtle/50 px-1.5 py-0.5 font-mono">↓</kbd>
    <span class="text-[11px] text-ghost tracking-[0.15em] uppercase">Navigate</span>
  </div>
</nav>

<style>
  nav {
    transition:
      width 300ms ease,
      padding 300ms ease;
  }
  .highlight {
    transition: transform 200ms ease-out;
  }
</style>
