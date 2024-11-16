<script>
	import '../app.css';
	let { children } = $props();
	import Navbar from '$lib/Navbar.svelte';
</script>


<div class="flex flex-col justify-start w-screen h-screen">
	<Navbar/>
	{@render children()}
</div>