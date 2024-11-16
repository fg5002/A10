<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, setContext } from 'svelte';
  import {mapState} from '$lib/store';

	let {children} = $props();

	let mapContainer = $state();
	let map = $state();

  setContext('map', ()=> map);

  const latLngToLatlngArray = (a)=> [a.lat, a.lng].map(c=>parseFloat(c.toFixed(6)));

  onMount(()=> {
    map = L.map(mapContainer, {
      center: $mapState.center, 
      zoom: $mapState.zoom
    })
    .on('dragend', ()=> {
      $mapState.center = latLngToLatlngArray(map.getCenter());
    })
    .on('zoomend', ()=> {
      $mapState.zoom = map.getZoom();
      $mapState.center = latLngToLatlngArray(map.getCenter());
    })
    .on('baselayerchange', (e)=> {
      $mapState.baselayer= e.name;
      console.log($mapState.baselayer);
    })
    .on('overlayadd', (e)=> {
      if($mapState.overlays.includes(e.name)) return;
      $mapState.overlays = [...$mapState.overlays, e.name];
      console.log($mapState.overlays);
    })
    .on('overlayremove', (e)=> {
      $mapState.overlays = $mapState.overlays.filter(d=> d!=e.name);
      console.log($mapState.overlays);
    });
    
    return ()=> {
      map?.remove();
      map = undefined;
    };
	});
  
</script>

<style>
  :global(.leaflet-popup-content-wrapper) {   
    padding: 0px;
  }
  :global(.leaflet-popup-content) {
    padding: 0px;
    margin: 0px;
  }
  :global(.leaflet-popup-tip) {
    background-color: rgb(254 240 138);
  }
</style>

<div class="w-full h-full z-1000" bind:this={mapContainer}>
  {#if map}
    {@render children?.()}
  {/if}
</div>