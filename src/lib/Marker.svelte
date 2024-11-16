<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, getContext, setContext } from 'svelte';
  import {mapState} from '$lib/store';

  let { 
    markerPosition = $mapState.center,
    children
  } = $props();

  let markerContainer = $state();
	let marker = $state();

  const map = getContext('map');

  setContext('layer', {getLayer: ()=> marker});

  onMount(()=> {
    marker = L.marker(markerPosition)
    .addTo(map);
    
    return ()=> {
      marker?.remove();
      marker = undefined;
    };
	});
  
</script>

<div bind:this={markerContainer}>
  {#if marker}
    {@render children?.()}
  {/if}
</div>