<script>
  import L, { divIcon } from 'leaflet';
  import { onMount, getContext } from 'svelte';

  let {
    //content,
    children
  } = $props();

	let popup = $state();
  let popupContainer = $state();

  let open = $state(false);

  const layer = getContext('layer');

  onMount(()=> {
    popup = L.popup({
      closeButton : false,
      autoPanPadding: [80,80],
      offset: [0,-5],
      //content: content
    });

      layer() && layer().bindPopup(popup)
      .on('popupopen', ()=> {open = true})
      .on('popupclose', ()=> {open = false});
    
    return ()=> {
      layer()?.unbindPopup();
      popup?.remove();
      popup = undefined;
    };
	});
  
</script>

<div class="flex justify-center p-0" bind:this={popupContainer}>
  {#if open}
    {@render children?.()}
  {/if}
</div>