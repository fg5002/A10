<script>
  import L from 'leaflet';
  import {getContext, setContext, onMount} from 'svelte';
  import 'leaflet.markercluster/dist/leaflet.markercluster.js';
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
  import 'Leaflet.Deflate/dist/L.Deflate.js';

	let {
    fillcolor = 'yellowgreen', 
    color = 'black',
    children
  } = $props();

  let deflate = $state();
  let deflateContainer = $state();

  const map = getContext('map');
  const markerCluster = L.markerClusterGroup();

  setContext('deflate', ()=> deflate);

  onMount(()=> {

    deflate = map() && L.deflate({
      minSize: 80,
      markerType: L.circleMarker,
      markerOptions: {     
        fillColor: fillcolor,
        radius: 7,
        color: color,
        weight: 1,
        opacity: 1.0,
        fillOpacity: 0.5  
      }, 
      markerLayer: markerCluster
    }).addTo(map());

    return ()=> {
      deflate?.remove();
      deflate = undefined;
    };
  });

</script>

<div bind:this={deflateContainer}>
  {#if deflate}
    {@render children?.()}
  {/if}
</div>