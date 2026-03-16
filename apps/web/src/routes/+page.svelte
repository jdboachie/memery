<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '@memry/backend/convex/_generated/api.js';

	const query = useQuery(api.entries.get, {});

	function formatDate(iso: number) {
		const d = new Date(iso);
		return (
			d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
			' · ' +
			d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
		);
	}

	function getDomain(url: string) {
		try {
			return new URL(url).hostname.replace('www.', '');
		} catch {
			return url;
		}
	}
</script>

<main class="flex flex-col gap-12 mx-auto mt-12 max-w-3xl p-5">
	MEMERY APP
	{#if query.isLoading}
		Loading...
	{:else if query.error}
		failed to load: {query.error.toString()}
	{:else}
		<ul class="flex flex-col gap-2">
			{#each query.data as m}
				<li>
					<div class="rounded-lg border border-neutral-500/7 bg-neutral-100 p-2 px-4 flex flex-col gap-2 shadow-xs">
						<div class="text-sm">{m.text}</div>
						<div class="text-xs opacity-70 flex item-center gap-4">
							<a href={m.url} target="_blank" title={m.title}>{getDomain(m.url)}</a>
							<span>{formatDate(m._creationTime)}</span>
							<button class="delete-btn" data-id={m._id} title="Delete">✕</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</main>
