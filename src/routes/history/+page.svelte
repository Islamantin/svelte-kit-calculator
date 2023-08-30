<script>
	import { HistoryStore } from '../../stores';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div id="history-container">
	{#if $HistoryStore.length < 1}
		<p>History is empty.</p>
		<p>Perform calculations on Actions page to add new items.</p>
	{/if}
	{#each $HistoryStore as item}
		<div class="item">
			{item.first + item.operator + item.second + '=' + item.result}
		</div>
	{/each}
</div>

<style>
    #history-container p {
        font-size: 24px;
    }

	.item {
		background-color: white;
		padding: 20px;
		margin: 10px;
		font-size: 32px;
		border-radius: 10px;
		text-align: right;
		position: relative;
	}
</style>
