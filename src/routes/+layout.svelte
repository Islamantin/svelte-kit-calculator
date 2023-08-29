<script>
	import '../styles.css';
	import { page } from '$app/stores';

	console.log($page.url.pathname);
</script>

<nav id="navbar">
	<a href="/actions" class:active={$page.url.pathname.includes('/actions')}>Actions</a>
	<a href="/history" class:active={$page.url.pathname.includes('/history')}>History</a>
</nav>
<main id="main-container">
	<slot />
</main>

<style>
	#navbar a {
		width: 225px;
		font-size: 20px;
		padding: 20px;
		border: 1px solid;
		border-radius: 10px;
		text-decoration: none;
		display: inline-block;
		color:darkslategray;
	}

	#navbar a.active {
		background-color: darkslategray;
		color: white;
	}

	#navbar {
		text-align: center;
		background-color:honeydew;
		padding: 10px;
		border: 1px 1px 1px 0;
	}

	#main-container {
		width: 500px;
		padding: 20px;
		margin: auto;
		margin-top: 10px;
		margin-bottom: 10px;
		background-color:beige;
		border-radius: 10px;
	}
</style>
