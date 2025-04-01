<script>
  import ModalNew from "$lib/Modal_new.svelte";
  import Map from "$lib/Map_new.svelte";
  import ImageViewer from "$lib/ImageViewer.svelte";
  import '../app.css';
	let { children } = $props();
  import Calendar from "$lib//Calendar.svelte";
  import {featureCollectionFromStoredData} from '$lib/editor.svelte.js';
  import {currDate, storedData, dailyData} from '$lib/store';

  $effect(()=> {
    $dailyData = $storedData && featureCollectionFromStoredData($storedData)
  });

</script>


<div class="h-full grid grid-rows-[auto_1fr]">

  <nav class="flex items-center gap-2 p-2 m-0 font-bold bg-lime-500">
    <button class="px-2 py-1" onclick={()=> map.showModal()}>Map</button>
    <button class="px-2 py-1" onclick={()=> image_viewer.showModal()}>Image viewer</button>
    <button class="px-2 py-1" onclick={()=> my_modal_1.showModal()}>Modal 1</button>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="right-0 px-2 py-1 font-bold" onclick={()=> dateCal.showModal()}>{$currDate}</div>
  </nav>
    <div class="flex flex-col items-center justify-center flex-grow-0 text-lg bg-lime-300">
      <h1 class="my-4 text-2xl">Welcome to FDC</h1>
      <div class="text-red-500 ">version 0.2.1</div> 
    </div>
</div>

<Map 
  modalID = "map"
/>

<ModalNew 
  modalID = "proba" 
  modalClasses = "p-0 h-full w-full"
>
  <h3 class="text-lg font-bold">Hello, this is proba!</h3>
</ModalNew>

<ModalNew
  modalID = "my_modal_1"
  modalClasses = "bg-yellow-300 md:w-2/3"
>
  <h3 class="text-lg font-bold">Hello!</h3>
  <p class="py-4">Press ESC key or click the button below to close</p>
  <button class="btn" onclick={()=>my_modal_2.showModal()}>Modal 2</button> 
</ModalNew>

<ModalNew
  modalID = "my_modal_2" 
  modalClasses = "bg-lime-300 md:w-2/3"
>
  <h3 class="text-lg font-bold">Hello!</h3>
  <p class="py-4">Press ESC key or click the button below to close</p>
</ModalNew>

<ImageViewer modalID = "image_viewer"/>

<Calendar
  modalID = "dateCal"
  bind:calDate={$currDate}
/>