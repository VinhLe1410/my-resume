<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<div class="h-screen flex items-center justify-center">
	<h2 class="font-headline text-5xl font-bold text-primary tracking-tighter uppercase">
		{title}
	</h2>
</div>
