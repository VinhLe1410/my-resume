import type { Attachment } from 'svelte/attachments';

export const GLYPHS = '!<>-_\\/[]{}=+*^?#%$';
const DURATION_MS = 420;

// On hover or focus, letters flicker through random glyphs and settle left to right.
// Only letters and digits change, so arrows and spaces stay put. Use on monospace text, so the width never jumps.
export const scramble: Attachment<HTMLElement> = (element) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const node = [...element.childNodes].find(
    (child): child is Text => child instanceof Text && child.data.trim() !== '',
  );
  if (!node) return;

  const original = node.data;
  let frame = 0;

  function run() {
    cancelAnimationFrame(frame);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = (now - start) / DURATION_MS;
      if (progress >= 1) {
        node!.data = original;
        return;
      }
      node!.data = [...original]
        .map((char, index) =>
          /[a-z0-9]/i.test(char) && index / original.length > progress
            ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            : char,
        )
        .join('');
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  element.addEventListener('pointerenter', run);
  element.addEventListener('focus', run);
  return () => {
    cancelAnimationFrame(frame);
    node.data = original;
    element.removeEventListener('pointerenter', run);
    element.removeEventListener('focus', run);
  };
};
