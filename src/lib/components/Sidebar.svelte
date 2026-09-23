<script lang="ts">
  import { resume } from '$lib/data/resume';
  import { slides, type SlideId } from '$lib/slides';

  let {
    active,
    onNavigate,
  }: {
    active: SlideId;
    onNavigate: (event: MouseEvent, id: SlideId) => void;
  } = $props();
</script>

<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="#about" aria-label="Vinh Le, About section" onclick={(event) => onNavigate(event, 'about')}
      >{resume.about.name}</a
    >
    <nav aria-label="Resume sections">
      {#each slides as slide (slide.id)}
        <a
          href="#{slide.id}"
          aria-current={slide.id === active ? 'page' : undefined}
          onclick={(event) => onNavigate(event, slide.id)}>{slide.label}</a
        >
      {/each}
    </nav>
    <a class="header-contact" href="mailto:lpvinh2k4@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgb(8 8 8 / 0.94);
    border-bottom: 1px solid var(--color-outline-subtle);
    backdrop-filter: blur(16px);
  }

  .header-inner {
    max-width: 90rem;
    min-height: 4.75rem;
    margin: auto;
    padding: 0 clamp(1.25rem, 4.5vw, 5rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .brand {
    color: var(--color-primary);
    font: 700 1.4rem/1 var(--font-headline);
    letter-spacing: -0.05em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  nav {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 2.5vw, 2.75rem);
  }

  nav a,
  .header-contact {
    color: var(--color-secondary);
    font: 400 0.7rem/1.3 var(--font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
    transition: color 180ms ease;
  }

  nav a {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 4.75rem;
  }

  nav a[aria-current='page'] {
    color: var(--color-primary);
  }

  nav a[aria-current='page']::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    background: var(--color-primary);
  }

  nav a:hover,
  .header-contact:hover {
    color: var(--color-primary);
  }

  .header-contact {
    color: var(--color-primary);
    border-bottom: 1px solid var(--color-primary);
    padding-bottom: 0.35rem;
  }

  .header-contact span {
    margin-left: 0.3rem;
  }

  @media (max-width: 760px) {
    .header-inner {
      min-height: 0;
      padding-top: 1rem;
      padding-bottom: 0;
      flex-wrap: wrap;
      gap: 0.85rem;
    }

    .brand {
      font-size: 1.2rem;
    }

    .header-contact {
      order: 1;
      margin-left: auto;
    }

    nav {
      order: 2;
      width: 100%;
      justify-content: space-between;
      gap: 0.5rem;
      padding-top: 0.25rem;
    }

    nav a {
      min-height: 2.75rem;
      font-size: 0.63rem;
      letter-spacing: 0.04em;
    }
  }

  @media (max-width: 360px) {
    nav a {
      font-size: 0.58rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    nav a,
    .header-contact {
      transition: none;
    }
  }
</style>
