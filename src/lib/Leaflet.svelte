<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, setContext } from 'svelte';
  import {mapState, dailyData, storedData} from '$lib/store';
  import {featureCollectionFromStoredData} from '$lib/editor.svelte.js';

  //TODO restore tilelayer
  //TODO Leaflet contextmenu https://github.com/aratcliffe/Leaflet.contextmenu/tree/master

	let {children} = $props();

	let mapContainer = $state();
	let map = $state();

  setContext('map', ()=> map);

  const latLngToArr = (e)=> [e.lat, e.lng].map(d=> parseFloat(d.toFixed(6)));

  onMount(()=> {
    map = L.map(mapContainer, {
      center: $mapState.center, 
      zoom: $mapState.zoom
    })
    .on('dragend', ()=> {
      $mapState.center = latLngToArr(map.getCenter());
    })
    .on('zoomend', ()=> {
      $mapState.zoom = map.getZoom();
      $mapState.center = latLngToArr(map.getCenter());
    })
    .on('baselayerchange', (e)=> {
      $mapState.baselayer= e.name;
      //console.log($mapState.baselayer);
    })
    .on('overlayadd', (e)=> {
      if($mapState.overlays.includes(e.name)) return;
      $mapState.overlays = [...$mapState.overlays, e.name];
      //console.log('added', $mapState.overlays);
    })
    .on('overlayremove', (e)=> {
      $mapState.overlays = $mapState.overlays.filter(d=> d!=e.name);
      //console.log('removed', $mapState.overlays);
    });

    return ()=> {
      map?.remove();
      map = undefined;
    };
	});

  /*$effect(()=> {
    $dailyData = featureCollectionFromStoredData($storedData)
  })*/
  
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

<div class="w-full h-full" bind:this={mapContainer}>
  {#if map}  
    {@render children?.()}
  {/if}
</div>