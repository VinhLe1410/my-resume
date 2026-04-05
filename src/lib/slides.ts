import type { Component } from 'svelte';
import About from './components/slides/About.svelte';
import Education from './components/slides/Education.svelte';
import Experience from './components/slides/Experience.svelte';
import Skills from './components/slides/Skills.svelte';
import { resume } from './data/resume';

export interface SlideConfig {
  id: string;
  label: string;
  component: Component<any>;
  props: Record<string, any>;
}

export const slides: SlideConfig[] = [
  {
    id: 'about',
    label: 'ABOUT',
    component: About,
    props: { data: resume.about },
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    component: Experience,
    props: { data: resume.experience },
  },
  {
    id: 'skills',
    label: 'SKILLS',
    component: Skills,
    props: { data: resume.skills },
  },
  {
    id: 'education',
    label: 'EDUCATION',
    component: Education,
    props: { data: resume.education },
  },
];
