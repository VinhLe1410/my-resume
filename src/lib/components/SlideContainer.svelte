<script lang="ts">
  import About from '$lib/components/slides/About.svelte';
  import Education from '$lib/components/slides/Education.svelte';
  import Experience from '$lib/components/slides/Experience.svelte';
  import Projects from '$lib/components/slides/Projects.svelte';
  import Skills from '$lib/components/slides/Skills.svelte';
  import { resume } from '$lib/data/resume';
</script>

<div id="about" class="chapter about-chapter">
  <About data={resume.about} />
</div>
<div id="experience" class="chapter"><Experience data={resume.experience} /></div>
<div id="projects" class="chapter"><Projects data={resume.projects} /></div>
<div id="skills" class="chapter"><Skills data={resume.skills} /></div>
<div id="education" class="chapter"><Education data={resume.education} /></div>

<style>
  .chapter {
    /* Anchors land with the heading at its sticky spot, so the previous section's bar has already handed over. */
    scroll-margin-top: calc(var(--landing-gap) - var(--section-pad-top));
    min-height: calc(100dvh - var(--resume-header-height) - 4.75rem);
  }

  .about-chapter {
    display: grid;
  }
</style>
