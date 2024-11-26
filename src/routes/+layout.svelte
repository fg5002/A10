<script>
	import '../app.css';
	let { children } = $props();
	import Navbar from '$lib/Navbar.svelte';

  if ("virtualKeyboard" in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
  }

</script>


<div class="grid w-screen min-h-screen grid-rows-[auto_1fr] bg-slate-300">
	<Navbar/>
	{@render children()}
</div>