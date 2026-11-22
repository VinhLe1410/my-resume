<script lang="ts">
  import { GLYPHS } from '$lib/scramble';

  // Shows ASCII noise shaped like `placeholder` while `text` is null, then resolves into `text` left to right.
  // Later changes re-scramble only the characters that changed. Use on monospace text, so the width never jumps.
  let { text, placeholder }: { text: string | null; placeholder: string } = $props();

  const FLICKER_MS = 70;
  const RESOLVE_MS = 900;
  // On first load the noise holds briefly, so it reads as loading even when the text is ready at once.
  const HOLD_MS = 700;
  const mountedAt = typeof performance === 'undefined' ? 0 : performance.now();
  const isGlyph = (char: string) => /[a-z0-9]/i.test(char);
  const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  const noise = (shape: string) => [...shape].map((char) => (isGlyph(char) ? randomGlyph() : char)).join('');

  // The prerendered page needs the same characters on server and client, so the first frame is not random.
  const seed = $derived(
    [...placeholder].map((char, index) => (isGlyph(char) ? GLYPHS[(index * 7) % GLYPHS.length] : char)).join(''),
  );
  let display: string | null = $state(null);
  let shown = '';

  $effect(() => {
    const target = text;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      display = target;
      return;
    }

    let frame = 0;
    let lastFlicker = 0;
    const from = shown;
    const start = Math.max(performance.now(), from === '' ? mountedAt + HOLD_MS : 0);

    const tick = (now: number) => {
      if (target === null || now < start) {
        if (now - lastFlicker > FLICKER_MS) {
          display = noise(target ?? placeholder);
          lastFlicker = now;
        }
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = (now - start) / RESOLVE_MS;
      if (progress >= 1) {
        display = shown = target;
        return;
      }
      display = [...target]
        .map((char, index) =>
          char === from[index] || !isGlyph(char) || index / target.length < progress ? char : randomGlyph(),
        )
        .join('');
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });
</script>

<span aria-hidden="true">{display ?? seed}</span><span class="sr-only">{text ?? ''}</span>
