<script lang="ts">
  import About from '$lib/components/slides/About.svelte';
  import Education from '$lib/components/slides/Education.svelte';
  import Experience from '$lib/components/slides/Experience.svelte';
  import Skills from '$lib/components/slides/Skills.svelte';
  import { resume } from '$lib/data/resume';
  import type { SlideId } from '$lib/slides';

  let {
    active,
    onNavigate,
  }: {
    active: SlideId;
    onNavigate: (event: MouseEvent, id: SlideId) => void;
  } = $props();
</script>

<div hidden={active !== 'about'} class="chapter"><About data={resume.about} {onNavigate} /></div>
<div hidden={active !== 'experience'} class="chapter"><Experience data={resume.experience} /></div>
<div hidden={active !== 'skills'} class="chapter"><Skills data={resume.skills} /></div>
<div hidden={active !== 'education'} class="chapter"><Education data={resume.education} /></div>

<style>
  .chapter[hidden] {
    display: none;
  }
</style>
