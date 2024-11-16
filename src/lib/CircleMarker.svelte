<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, getContext, setContext } from 'svelte';
  import {mapState} from '$lib/store';

  let { 
    position = $mapState.center,
    fillcolor = 'red',
    color = 'black',
    children
  } = $props();

  let circlemarkerContainer = $state();
	let circlemarker = $state();

  const map = getContext('map');

  setContext('layer', {getLayer: ()=> circlemarker});

  onMount(()=> {
    circlemarker = map() && L.circleMarker(position, {
      fillColor: fillcolor,
      radius: 7,
      color: color,
      weight: 1,
      opacity: 1.0,
      fillOpacity: 1.0
    })
    .addTo(map());
    
    return ()=> {
      circlemarker?.remove();
      circlemarker = undefined;
    };
	});
  
</script>

<div bind:this={circlemarkerContainer}>
  {#if circlemarker}
    {@render children?.()}
  {/if}
</div>