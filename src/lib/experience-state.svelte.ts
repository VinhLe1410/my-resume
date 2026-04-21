import { SvelteSet } from 'svelte/reactivity';

const expanded = new SvelteSet<number>();

export const experienceState = {
  get expanded() {
    return expanded;
  },

  isExpanded(index: number): boolean {
    return expanded.has(index);
  },

  toggle(index: number): void {
    if (expanded.has(index)) expanded.delete(index);
    else expanded.add(index);
  },

  toggleAll(totalCount: number): void {
    const wasAllExpanded = expanded.size === totalCount;
    expanded.clear();
    if (!wasAllExpanded) {
      for (let i = 0; i < totalCount; i++) expanded.add(i);
    }
  },

  isAllExpanded(totalCount: number): boolean {
    return expanded.size === totalCount;
  },
};
