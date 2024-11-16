<script>
  import L from 'leaflet';
  import { onMount, getContext, setContext } from 'svelte';

  let { 
    children
  } = $props();

  let popupContainer = $state();
	let popup = $state();

  let open = $state(false);

  const { getLayer } = getContext('layer');
	const layer = getLayer();

  onMount(()=> {
    popup = L.popup({
      closeButton : false,
      autoPanPadding: [80,80],
      offset: [0,-5]
    }).setContent(popupContainer);

    if(layer){
      layer.bindPopup(popup);
      layer.on('popupopen', ()=> {open = true});
      layer.on('popupclose', ()=> {open = false});
    }
    
    return ()=> {
      layer?.unbindPopup();
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