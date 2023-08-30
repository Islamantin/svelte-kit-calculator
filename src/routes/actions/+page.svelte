<script>
	import { scale } from 'svelte/transition';
	import Button from '$lib/Button.svelte'
	import { HistoryStore } from '../../stores';
	// generating the numbers range
	let numbers = Array.from({ length: 10 }, (_, i) => i.toString());
	// move 0 to the end
	numbers = numbers.slice(1, numbers.length).concat(numbers.slice(0, 1));
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

	// current calculation state object
	/** @type {{
	 * first: string | null;
	 * second: string | null;
	 * operator: string | null;
	 * result: string | null;}} */
	let curCalc = {
		first: null,
		second: null,
		operator: null,
		result: null
	};
	// reactive statement for output
	$: output = (() => {
		let result = '';
		const { first, second, operator } = curCalc;
		if (first) {
			result += first;
		} else result = '0';
		if (operator) result += operator;
		if (second) result += second;
		return result;
	})();

	const handleAction = (/** @type {{ detail: string; }} */ e) => {
		const { first, second, operator } = curCalc;
		const sign = e.detail;
		const num = Number.parseInt(sign);
		// when it is number
		if (num || num === 0) {
			// so far there was no single digit
			if (!first) {
				if (num !== 0) curCalc.first = sign;
				// operator not yet chosen
			} else if (!operator) {
				// if the first value is result of previous calculation
				if (curCalc.result) {
					curCalc.first = sign;
					curCalc.result = null;
					// limit imput to 6 digit
				} else if (first.length < 6) {
					curCalc.first += sign;
				}
				// second value yet not entered
			} else if (!second) {
				// division by 0
				if (operator === '/' && num === 0) return;
				curCalc.second = sign;
			} else {
				if (curCalc.second === '0') curCalc.second = sign;
				// 6 digit limit
				else if (second.length < 6) curCalc.second += sign;
			}
			// when it's minus before first value
		} else if (!first && sign === '-') {
			curCalc.first = sign;
			// when it's minus before second value
		} else if (!second && operator && sign === '-') {
			if (['*', '/'].includes(operator)) curCalc.second = sign;
			else curCalc.operator = sign;
			// any operation
		} else if (first) {
			// before second value
			if (!second) {
				if (sign !== '=') curCalc.operator = sign;
				// after second value
			} else if (operator) {
				// calculate result
				const firstValue = Number.parseFloat(first);
				const secondValue = Number.parseFloat(second);
				let result = 0;
				switch (operator) {
					case '-':
						result = firstValue - secondValue;
						break;
					case '*':
						result = firstValue * secondValue;
						break;
					case '/':
						result = firstValue / secondValue;
						break;
					// plus operation
					default:
						result = firstValue + secondValue;
						break;
				}
				const stringResult = result.toString();
				curCalc.result = stringResult;
				// save calculation
				HistoryStore.update((current) => [
					{
						first,
						second,
						operator,
						result: stringResult
					},
					...current
				]);
				// updating values for the next calculation
				if (result === 0) {
					curCalc.first = '0';
					curCalc.result = null;
				} else curCalc.first = curCalc.result;
				if (sign !== '=') {
					curCalc.operator = sign;
				} else curCalc.operator = null;
				curCalc.second = null;
			}
		}
	};

	const clear = () => {
		curCalc = {
			first: null,
			second: null,
			operator: null,
			result: null
		};
	};
</script>

<div id="output">
	{#if curCalc.first}
		<button in:scale on:click={clear}>✕</button>
	{/if}
	{output}
</div>
<div id="actions">
	{#each actions as a}
		<Button sign={a} on:action-pressed={handleAction} />
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
		font-size: 32px;
		border-radius: 10px;
		text-align: right;
		position: relative;
	}
	#output button {
		appearance: none;
		font-size: 17px;
		color: gray;
		position: absolute;
		left: 20px;
		top: 28px;
		cursor: pointer;
		border-radius: 50%;
	}
</style>
