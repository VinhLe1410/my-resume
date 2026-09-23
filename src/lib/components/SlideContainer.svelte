<script lang="ts">
  import About from '$lib/components/slides/About.svelte';
  import Education from '$lib/components/slides/Education.svelte';
  import Experience from '$lib/components/slides/Experience.svelte';
  import Skills from '$lib/components/slides/Skills.svelte';
  import { resume } from '$lib/data/resume';
</script>

<main>
  <About data={resume.about} />
  <Experience data={resume.experience} />
  <Skills data={resume.skills} />
  <Education data={resume.education} />
</main>

<footer class="site-footer">
  <span>{resume.about.name} / Resume</span>
  <a href="#about">Back to top ↑</a>
</footer>

<style>
  main,
  .site-footer {
    max-width: 90rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4.5vw, 5rem);
  }

  .site-footer {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding-block: 2rem;
    border-top: 1px solid var(--color-outline-subtle);
    color: var(--color-muted);
    font: 400 0.7rem var(--font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .site-footer a {
    color: var(--color-primary);
  }
</style>
