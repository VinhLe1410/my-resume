import type { Component } from "svelte";
import { resume } from "./data/resume";
import About from "./components/slides/About.svelte";
import Experience from "./components/slides/Experience.svelte";
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
    component: About,
    props: { data: resume.about },
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    component: Experience,
    props: { data: resume.experience },
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
