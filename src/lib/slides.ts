import { Briefcase, GraduationCap, User, Zap, type Icon } from '@lucide/svelte';
import type { Component } from 'svelte';
import About from './components/slides/About.svelte';
import Education from './components/slides/Education.svelte';
import Experience from './components/slides/Experience.svelte';
import Skills from './components/slides/Skills.svelte';
import { resume } from './data/resume';

export interface SlideConfig {
  id: string;
  label: string;
  icon: typeof Icon;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- heterogeneous component union
  component: Component<any>;
  props: Record<string, unknown>;
}

export const slides: SlideConfig[] = [
  {
    id: 'about',
    label: 'ABOUT',
    icon: User,
    component: About,
    props: { data: resume.about },
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    icon: Briefcase,
    component: Experience,
    props: { data: resume.experience },
  },
  {
    id: 'skills',
    label: 'SKILLS',
    icon: Zap,
    component: Skills,
    props: { data: resume.skills },
  },
  {
    id: 'education',
    label: 'EDUCATION',
    icon: GraduationCap,
    component: Education,
    props: { data: resume.education },
  },
];
