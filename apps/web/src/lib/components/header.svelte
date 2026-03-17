<script>
	import { Button } from './ui/button';
	import { ChevronsUpDownIcon } from '@lucide/svelte';
</script>

<header class="flex items-center justify-between p-4 px-5 text-sm">
	<p>Memery</p>

	<Button size="sm" variant="ghost" class="rounded-full px-3!">
		<div class="bg-linear-to-br from-sky-500 to-purple-600 size-4 rounded-full"></div>
		Chris <ChevronsUpDownIcon class="text-muted-foreground" />
	</Button>
</header>
