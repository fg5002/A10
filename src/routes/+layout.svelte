<script>
	import '../app.css';
	let { children } = $props();
	import { base } from '$app/paths';
  import Calendar from "$lib//Calendar.svelte";
	import {currDate} from "$lib/store";

	$effect(()=> {	// Csak ezzel működik a 'keyboard-safe': 'calc(env(keyboard-inset-height, 0px) + 48px)'
		const handleGeometryChange = ()=>{};
		if ("virtualKeyboard" in navigator) {
			navigator.virtualKeyboard.addEventListener("geometrychange", handleGeometryChange);
		}
		return ()=> navigator.virtualKeyboard.removeEventListener("geometrychange", handleGeometryChange);
	});

</script>

<div class="w-screen h-screen md:w-1/2 md:mx-auto xl:w-2/3">
	{@render children()}
</div>