import type { SlideId } from '$lib/slides';

// Each section heading sticks under the site header and shrinks into the shared section bar.
// Once a heading has fully shrunk it hides, and the shared bar shows its title and progress
// until the next heading slides over the bar and takes its place.

interface RailSection {
  id: SlideId;
  title: string;
  section: HTMLElement;
  row: HTMLElement;
  heading: HTMLElement;
}

interface SectionGeometry {
  paddingTop: number;
  titleSize: number;
  titleWidth: number;
  rowGap: number;
}

interface BarGeometry {
  stickTop: number;
  height: number;
  titleSize: number;
  gap: number;
}

export interface HeadingMorph {
  collapse: number;
  progress: number;
  titleScale: number;
  titleY: number;
  ruleShift: number;
  ruleY: number;
  band: number;
}

interface RailState {
  morphs: Partial<Record<SlideId, HeadingMorph>>;
  pinned: { title: string; progress: number; handover: number } | null;
}

export const restingMorph: HeadingMorph = {
  collapse: 0,
  progress: 0,
  titleScale: 1,
  titleY: 0,
  ruleShift: 0,
  ruleY: 0,
  band: 0,
};

export const rail: RailState = $state({ morphs: {}, pinned: null });

const sections: RailSection[] = [];
// Plain lookup: geometry changes only feed `rail`, which is the reactive state.
const geometry = new WeakMap<RailSection, SectionGeometry>();
let bar: { element: HTMLElement; title: HTMLElement } | null = null;
let barGeometry: BarGeometry | null = null;
let reducedMotion = false;
let observer: ResizeObserver | undefined;

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

export function layoutRail(): void {
  if (!bar) return;
  const barStyle = getComputedStyle(bar.element);
  barGeometry = {
    stickTop: parseFloat(barStyle.top),
    height: bar.element.offsetHeight,
    titleSize: parseFloat(getComputedStyle(bar.title).fontSize),
    gap: parseFloat(barStyle.columnGap),
  };
  reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  for (const entry of sections) {
    geometry.set(entry, {
      paddingTop: parseFloat(getComputedStyle(entry.section).paddingTop),
      titleSize: parseFloat(getComputedStyle(entry.heading).fontSize),
      titleWidth: entry.heading.offsetWidth,
      rowGap: parseFloat(getComputedStyle(entry.row).columnGap),
    });
  }
  updateRail();
}

export function updateRail(): void {
  if (!barGeometry) return;
  const { stickTop, height: barHeight, titleSize: barTitleSize, gap: barGap } = barGeometry;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const measured = sections.map((entry) => {
    const sizes = geometry.get(entry);
    if (!sizes) throw new Error(`Section rail has no geometry for #${entry.id}`);
    // The heading row is sticky, so its resting position comes from the section box.
    return { entry, sizes, top: entry.section.getBoundingClientRect().top + sizes.paddingTop };
  });

  const morphs: RailState['morphs'] = {};
  let pinned: RailState['pinned'] = null;
  measured.forEach(({ entry, sizes, top }, index) => {
    const next = measured[index + 1];
    const travelled = stickTop - top;
    // Scroll distance from this heading sticking until the next heading reaches the bottom of the bar.
    const range = next ? next.top - top - barHeight : maxScroll - window.scrollY + travelled;
    const collapseDistance = Math.min(reducedMotion ? 1 : sizes.titleSize * 1.5, Math.max(range, 0));
    const collapse = collapseDistance > 0 ? clamp(travelled / collapseDistance) : 0;
    const progress = range > 0 ? clamp(travelled / range) : 0;

    const scale = barTitleSize / sizes.titleSize;
    const restingRuleStart = sizes.titleWidth + sizes.rowGap;
    morphs[entry.id] = {
      collapse,
      progress,
      titleScale: lerp(1, scale, collapse),
      titleY: (collapse * (barHeight - barTitleSize)) / 2,
      // Start of the rule moves left to sit after the shrunken title; it still ends at the row edge.
      ruleShift: collapse * (sizes.titleWidth * scale + barGap - restingRuleStart),
      ruleY: (collapse * (barHeight - sizes.titleSize)) / 2,
      band: lerp(sizes.titleSize, barHeight, collapse),
    };
    // Handover runs from 1 to 0 while the next heading slides up over the bar.
    const handover = next ? clamp((next.top - stickTop) / barHeight) : 1;
    if (collapse >= 1) pinned = { title: entry.title, progress, handover };
  });
  rail.morphs = morphs;
  rail.pinned = pinned;
}

function watch(element: HTMLElement): void {
  // Opening "More contributions" or loading fonts changes sizes without a scroll or resize event.
  observer ??= new ResizeObserver(() => layoutRail());
  observer.observe(element);
}

export function registerBar(element: HTMLElement, title: HTMLElement): () => void {
  bar = { element, title };
  watch(element);
  layoutRail();
  return () => {
    observer?.unobserve(element);
    bar = null;
    barGeometry = null;
  };
}

export function registerSection(entry: RailSection): () => void {
  sections.push(entry);
  sections.sort((a, b) => (a.section.compareDocumentPosition(b.section) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  watch(entry.section);
  layoutRail();
  return () => {
    sections.splice(sections.indexOf(entry), 1);
    geometry.delete(entry);
    observer?.unobserve(entry.section);
  };
}
