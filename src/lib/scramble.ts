import type { Attachment } from 'svelte/attachments';

export const GLYPHS = '!<>-_\\/[]{}=+*^?#%$';

// Letters flicker through random glyphs and settle left to right. Only letters and digits change,
// so arrows and spaces stay put. Use on monospace text, so the width never jumps.
// Returns null when there is nothing to animate or reduced motion is on.
function scrambler(element: HTMLElement, durationMs: number) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const node = [...element.childNodes].find(
    (child): child is Text => child instanceof Text && child.data.trim() !== '',
  );
  if (!node) return null;

  const original = node.data;
  let frame = 0;

  return {
    run() {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const tick = (now: number) => {
        const progress = (now - start) / durationMs;
        if (progress >= 1) {
          node.data = original;
          return;
        }
        node.data = [...original]
          .map((char, index) =>
            /[a-z0-9]/i.test(char) && index / original.length > progress
              ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              : char,
          )
          .join('');
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(frame);
      node.data = original;
    },
  };
}

// Scrambles on hover or focus.
export const scramble: Attachment<HTMLElement> = (element) => {
  const effect = scrambler(element, 420);
  if (!effect) return;
  element.addEventListener('pointerenter', effect.run);
  element.addEventListener('focus', effect.run);
  return () => {
    effect.stop();
    element.removeEventListener('pointerenter', effect.run);
    element.removeEventListener('focus', effect.run);
  };
};

// Decodes each time the element scrolls into view, so every section arrival gets the same beat.
// The real text stays in aria-label, so screen readers never hear the glyphs.
export const decodeOnView: Attachment<HTMLElement> = (element) => {
  const effect = scrambler(element, 700);
  if (!effect) return;
  element.setAttribute('aria-label', element.textContent ?? '');
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) effect.run();
    },
    { rootMargin: '0px 0px -20% 0px' },
  );
  observer.observe(element);
  return () => {
    effect.stop();
    observer.disconnect();
    element.removeAttribute('aria-label');
  };
};
