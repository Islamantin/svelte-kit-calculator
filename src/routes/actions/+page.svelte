<script>
	import Button from '../../components/Button.svelte';
	const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
</script>

<div id="output">output</div>
<div id="actions">
		{#each numbers as n}
			<Button sign={n} />
		{/each}
</div>

<style>
	#actions {
        margin: 5px;
	}
	#output {
		background-color: white;
		padding: 20px;
        margin: 10px;
		font-size: 24px;
		border-radius: 10px;
		text-align: right;
	}
</style>
