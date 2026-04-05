<script lang="ts">
	import SlideLayout from "../SlideLayout.svelte";
	import type { About } from "$lib/data/resume";

	let { data }: { data: About } = $props();
</script>

<SlideLayout title="ABOUT">
	{#snippet body()}
		<div class="space-y-12 max-w-2xl">
			<!-- Summary -->
			<p class="text-lg leading-relaxed text-secondary font-light">
				{data.summary}
			</p>

			<!-- Key facts -->
			<dl class="space-y-4">
				<div class="flex justify-between border-b border-outline-subtle/20 py-3">
					<dt class="text-[10px] text-muted tracking-[0.2em] uppercase">Location</dt>
					<dd class="text-primary text-sm">{data.location}</dd>
				</div>
				<div class="flex justify-between border-b border-outline-subtle/20 py-3">
					<dt class="text-[10px] text-muted tracking-[0.2em] uppercase">Email</dt>
					<dd>
						<a href="mailto:{data.email}" class="text-primary text-sm hover:underline">
							{data.email.toUpperCase()}
						</a>
					</dd>
				</div>
				<div class="flex justify-between border-b border-outline-subtle/20 py-3">
					<dt class="text-[10px] text-muted tracking-[0.2em] uppercase">Phone</dt>
					<dd class="text-primary text-sm">{data.phone}</dd>
				</div>
				<div class="flex justify-between border-b border-outline-subtle/20 py-3">
					<dt class="text-[10px] text-muted tracking-[0.2em] uppercase">GitHub</dt>
					<dd>
						<a
							href={data.github}
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary text-sm hover:underline"
						>
							{data.github.replace("https://", "")}
						</a>
					</dd>
				</div>
			</dl>
		</div>
	{/snippet}
</SlideLayout>
