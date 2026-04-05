<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { resume } from "$lib/data/resume";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{resume.about.name} — Resume</title>
	<meta name="description" content={resume.about.summary} />
	<meta property="og:title" content="{resume.about.name} — Resume" />
	<meta property="og:description" content={resume.about.summary} />
	<meta property="og:type" content="website" />
</svelte:head>
{@render children()}
