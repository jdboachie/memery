<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setupConvex } from 'convex-svelte';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header />
{@render children()}
