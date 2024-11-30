<script>
  import L from 'leaflet';
  import {getContext, hasContext, setContext, onMount} from 'svelte';
  import 'Leaflet.Deflate/dist/L.Deflate.js';

	let {children} = $props();

  let deflate = $state();
  let deflateContainer = $state();

  const map = getContext('map');
  const markerCluster = getContext('markercluster');
  const clustered = hasContext('markercluster');

  setContext('deflate', ()=> deflate);

  onMount(()=> {

    deflate = map() && L.deflate({
      minSize: 80,
      markerType: L.circleMarker,
      markerOptions: {     
        fillColor: 'yellowgreen',
        radius: 7,
        color: 'black',
        weight: 1,
        opacity: 1.0,
        fillOpacity: 1.0  
      }  
      //markerLayer: markerCluster()
    }).addTo(clustered ? markerCluster() : map());

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