import type { SlideId } from '$lib/slides';

const FOUND_DURATION_MS = 2000;
let foundTimer: ReturnType<typeof setTimeout> | undefined;

export function goToSection(id: SlideId): void {
  const section = document.getElementById(id);
  if (!section) throw new Error(`Section #${id} is missing`);
  // Assigning the current hash again does not scroll, so scroll directly in that case.
  if (location.hash === `#${id}`) section.scrollIntoView({ block: 'start' });
  else location.hash = id;
  section.querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true });
}

export function revealTarget(id: string, block: ScrollLogicalPosition): void {
  const target = document.getElementById(id);
  if (!target) throw new Error(`Search target #${id} is missing`);
  const details = target.closest('details');
  if (details) details.open = true;
  target.scrollIntoView({ block });
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  target.focus({ preventScroll: true });

  clearTimeout(foundTimer);
  document.querySelector<HTMLElement>('[data-found]')?.removeAttribute('data-found');
  // Reading layout restarts the highlight animation when the same target is found twice in a row.
  void target.offsetWidth;
  target.dataset.found = '';
  foundTimer = setTimeout(() => target.removeAttribute('data-found'), FOUND_DURATION_MS);
}
