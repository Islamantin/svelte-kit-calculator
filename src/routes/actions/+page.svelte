<script>
	import Button from '../../Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
</script>

ACTIONS
<div id="output">output</div>
<div id="actions">
	{#each numbers as n}
		<Button>{n}</Button>
	{/each}
</div>
