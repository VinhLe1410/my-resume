import type { SlideId } from '$lib/slides';

export function goToSection(id: SlideId): void {
  const section = document.getElementById(id);
  if (!section) throw new Error(`Section #${id} is missing`);
  // Assigning the current hash again does not scroll, so scroll directly in that case.
  if (location.hash === `#${id}`) section.scrollIntoView({ block: 'start' });
  else location.hash = id;
  section.querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true });
}
