<script>
	import { createEventDispatcher } from 'svelte';
	/**
	 * @type {string}
	 */
	export let sign;

    const dispatcher = createEventDispatcher();

    const onClick = () => {
        dispatcher("action-pressed", sign);
    }

	let additionalClass = sign === '=' ? 'wide' : '';
</script>

<button on:click={onClick} class={additionalClass}>
	{sign}
</button>

<style>
	button {
		appearance: none;
		width: 100px;
		height: 100px;
		margin: 5px;
		font-size: 20px;
		padding: 10px;
		border-radius: 10px;
	}

	button.wide {
		width: 210px;
	}

	button:hover {
		cursor: pointer;
		background-color: #d8d8d8;
	}
</style>
