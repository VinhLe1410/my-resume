import About from '$lib/components/slides/About.svelte';
import Education from '$lib/components/slides/Education.svelte';
import Experience from '$lib/components/slides/Experience.svelte';
import Skills from '$lib/components/slides/Skills.svelte';
import {
  resume,
  type About as AboutData,
  type Education as EducationData,
  type ExperienceEntry,
  type SkillCategory,
} from '$lib/data/resume';
import type { Component } from 'svelte';

export type SlideData = AboutData | ExperienceEntry[] | SkillCategory[] | EducationData;
export type SlideId = 'about' | 'experience' | 'skills' | 'education';

export interface SlideConfig {
  id: SlideId;
  label: string;
  component: Component<{ data: SlideData }>;
  props: { data: SlideData };
}

export const slides: SlideConfig[] = [
  {
    id: 'about',
    label: 'ABOUT',
    component: About as Component<{ data: SlideData }>,
    props: { data: resume.about },
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    component: Experience as Component<{ data: SlideData }>,
    props: { data: resume.experience },
  },
  {
    id: 'skills',
    label: 'SKILLS',
    component: Skills as Component<{ data: SlideData }>,
    props: { data: resume.skills },
  },
  {
    id: 'education',
    label: 'EDUCATION',
    component: Education as Component<{ data: SlideData }>,
    props: { data: resume.education },
  },
];
