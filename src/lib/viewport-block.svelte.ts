export const VIEWPORT_BLOCK_MAX_WIDTH = 900;
export const VIEWPORT_BLOCK_MAX_HEIGHT = 700;

// Keep this rule in sync with the CSS fallback in `src/routes/+page.svelte`.
export function isViewportBlocked(width: number, height: number): boolean {
  return width <= VIEWPORT_BLOCK_MAX_WIDTH || height <= VIEWPORT_BLOCK_MAX_HEIGHT;
}

export const viewportBlock = $state({ active: false });
