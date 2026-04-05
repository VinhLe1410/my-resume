import type { Component } from "svelte";
import SlidePlaceholder from "./components/SlidePlaceholder.svelte";

export interface SlideConfig {
  id: string;
  label: string;
  component: Component<any>;
  props: Record<string, any>;
}

export const slides: SlideConfig[] = [
  {
    id: "about",
    label: "ABOUT",
    component: SlidePlaceholder,
    props: { title: "ABOUT" },
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    component: SlidePlaceholder,
    props: { title: "EXPERIENCE" },
  },
  {
    id: "skills",
    label: "SKILLS",
    component: SlidePlaceholder,
    props: { title: "SKILLS" },
  },
  {
    id: "education",
    label: "EDUCATION",
    component: SlidePlaceholder,
    props: { title: "EDUCATION" },
  },
  {
    id: "contact",
    label: "CONTACT",
    component: SlidePlaceholder,
    props: { title: "CONTACT" },
  },
];
