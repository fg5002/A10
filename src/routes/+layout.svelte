<script>
	import '../app.css';
	let { children } = $props();
	import { base } from '$app/paths';

  if ("virtualKeyboard" in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
  }

</script>


<div class="grid w-screen h-screen grid-rows-[auto_1fr] bg-slate-300">
	<nav class="flex items-center gap-4 p-2 m-0 text-xl font-bold bg-lime-400">
		<a href="{base}/">Home</a>
		<a href="{base}/map">Map</a>
	</nav>
	{@render children()}
</div>