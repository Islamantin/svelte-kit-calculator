<script>
	import Button from '../../components/Button.svelte';
    // generating numbers range
	let numbers = Array.from({ length: 10 }, (_, i) => i.toString());
    // put 0 at the end
	numbers = numbers.slice(0, 1).concat(numbers.slice(1, numbers.length));
	const operators = ['/', '=', '*', '-', '+'];

	/**
	 * @type {string[]}
	 */
	const actions = [];
    // arranging actions the way how they sequentely placed on real calculators
	for (let i = 0; i < numbers.length; i += 3) {
		const chunk = numbers.slice(i, i + 3);
		const operator = operators.pop();
		const op = operator ? operator : '';
		actions.push(...chunk, op);
	}
	actions.push(...operators);
</script>

<div id="output">output</div>
<div id="actions">
	{#each actions as a}
		<Button sign={a} />
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
