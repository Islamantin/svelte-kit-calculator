<script>
	/**
	 * @type {string}
	 */
	export let sign;

	if (Number.parseInt(sign)) {
	} else {
		switch (sign) {
			case '+':
			break;
            case '-':
			break;
            case '*':
			break;
            case '/':
			break;
		}
	}
</script>

<button>
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

    button:hover {
        cursor: pointer;
    }
</style>