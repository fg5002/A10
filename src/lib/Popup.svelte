<script>
  import {getContext, onMount, onDestroy} from 'svelte';
  import L from 'leaflet';

  let {
    children
  } = $props();

  const layer = getContext('layer');

  let popup;
  let popupElement;

  let options = {
    closeButton: false
  }

  onMount(()=>{
    popup = L.popup(options);
    if (layer){
      layer().bindPopup(popup, options);
      layer().on('popupopen', ()=> {open=true});
      layer().on('popupclose', ()=> {open=false});
    }
  })

  onDestroy(() => {
    layer()?.off('popupopen', 'popupclose');
    layer()?.unbindPopup();
    popup?.remove();
    popup = undefined;  
  });

</script>

<div style="display: none;">
  <div bind:this={popupElement} class="p-4 border-2 bg-lime-400">
    {@render children?.()}
  </div>
</div>