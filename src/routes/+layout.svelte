<script>
	import '../app.css';
	let { children } = $props();
	import { base } from '$app/paths';
  import Calendar from "$lib//Calendar.svelte";
	import {currDate} from "$lib/store";

	let showCalendar = $state(false);

  if ("virtualKeyboard" in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
  }

</script>

<div class="grid w-screen h-screen grid-rows-[auto_1fr] bg-slate-300">
	<div class="flex items-center justify-between text-xl border-2 shadow-2xl bg-lime-400 border-slate-400">
		<nav class="flex items-center gap-4 p-2 m-0 text-xl font-bold">
			<a href="{base}/">Home</a>
			<a href="{base}/map">Map</a>
		</nav>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="p-2 m-0 text-xl font-bold" onclick={()=>showCalendar = true}>{$currDate}</div>
	</div>
	<Calendar
		bind:showCalendar
		bind:calDate={$currDate}
	/>
	{@render children()}
</div>