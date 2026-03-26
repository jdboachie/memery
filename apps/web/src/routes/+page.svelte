<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '@memery/backend/convex/_generated/api.js';
	import { Button } from '$lib/components/ui/button';
	import { XIcon, Search, EllipsisIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import { Kbd } from '$lib/components/ui/kbd';

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

<main class="mx-auto mt-15 flex max-w-3xl flex-col gap-12 p-5">
	<div class="relative">
		<Search class="absolute top-3 left-3.5 size-4 text-muted-foreground/75" />
		<Input placeholder="Search memeries..." class="pl-10 shadow-xs" />
		<Kbd class="absolute top-2.5 right-3">F</Kbd>
	</div>
	{#if query.isLoading}
		Loading...
	{:else if query.error}
		failed to load: {query.error.toString()}
	{:else}
		<ul class="flex flex-col gap-2">
			{#each query.data as m}
				<li class="group relative overflow-hidden">
					<div class="flex flex-col gap-2 rounded-lg border bg-background px-4 py-3 shadow-xs">
						<div class="mb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
							<a href={m.url} target="_blank" title={m.title} class="hover:text-blue-500"
								>{m.title}</a
							>
							<span>{formatDate(m._creationTime)}</span>
						</div>
						<div class="text-sm">
							{(m.text ?? '').length > 501 ? (m.text ?? '').slice(0, 501) + '...' : (m.text ?? '')}
						</div>
					</div>
					<div
						class="absolute right-0 bottom-0 flex w-1/3 translate-y-16 justify-end p-4 group-hover:translate-y-0"
					>
						<Button size="sm" variant="outline" class="h-7! text-xs"><EllipsisIcon /></Button>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</main>
