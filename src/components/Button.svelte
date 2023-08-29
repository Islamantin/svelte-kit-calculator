<script>
	/**
	 * @type {string}
	 */
	export let sign;

    let additionalClass = "";
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
            case '=':
            additionalClass = "wide";
			break;
		}
	}
</script>

<button class={additionalClass}>
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