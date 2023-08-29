<script>
	import { scale } from 'svelte/transition';
	import Button from '../../lib/Button.svelte';
	// generating the numbers range
	let numbers = Array.from({ length: 10 }, (_, i) => i.toString());
	// put 0 at the end
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
	 * firstNegative: boolean;
	 * first: string | null;
	 * second: string | null;
	 * operator: string | null;
	 * result: string | null;}} */
	let curCalc = {
		firstNegative: false,
		first: null,
		second: null,
		operator: null,
		result: null
	};
	// reactive statement for output
	$: output = (() => {
		let result = '';
		const { firstNegative, first, second, operator } = curCalc;
		if (first) {
			result += firstNegative ? '-' + first : first;
		} else if (firstNegative) {
			result = '-';
		} else result = '0';
		if (operator) result += operator;
		if (second) result += second;
		return result;
	})();

	const handleAction = (/** @type {{ detail: string; }} */ e) => {
		const { first, second, operator } = curCalc;
		const sign = e.detail;
		const num = Number.parseInt(sign);
		// when number entered
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
					// limit to 6 digit
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
				// limit to 6 digit
				else if (second.length < 6) curCalc.second += sign;
			}
			// when operation entered
		} else if (first) {
			// before second value
			if (!second) {
				if (sign !== '=') curCalc.operator = sign;
				// after second value
			} else if (operator) {
				// calculate result and save
				const firstValue = Number.parseInt(first);
				const secondValue = Number.parseInt(second);
				const calculate = (/** @type {string} */ op) => {
					switch (op) {
						case '-':
							return firstValue - secondValue;
						case '*':
							return firstValue * secondValue;
						case '/':
							return Math.floor(firstValue / secondValue);
						// plus operation
						default:
							return firstValue + secondValue;
					}
				};
				let result = 0;
				result = calculate(operator);
				curCalc.result = result.toString();
				console.log({ ...curCalc });
				// updating values for the next calculation
				if (result === 0) {
                    curCalc.first = '0';
					curCalc.result = null;
				} else curCalc.first = curCalc.result;
				if (result < 0) curCalc.firstNegative = true;
				if (sign !== '=') {
					curCalc.operator = sign;
				} else curCalc.operator = null;
				curCalc.second = null;
			}
			// before the first value entered
		} else if (sign === '-') curCalc.firstNegative = true;
	};

	const clear = () => {
		curCalc = {
			firstNegative: false,
			first: null,
			second: null,
			operator: null,
			result: null
		};
	};
</script>

<div id="output">
	{#if curCalc.first || curCalc.firstNegative}
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
