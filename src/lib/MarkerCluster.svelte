<script>
  import L from 'leaflet';
  import {getContext, setContext, onMount} from 'svelte';
  import 'leaflet.markercluster/dist/leaflet.markercluster.js';
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

	let {children} = $props();

  let markercluster = $state();
  let markerclusterContainer = $state();

  const map = getContext('map');

  setContext('markercluster', ()=> markercluster);

  onMount(()=> {

    markercluster = map() && L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true
    }).addTo(map());

    return ()=> {
      markercluster?.remove();
      markercluster = undefined;
    };
  });

</script>

<div bind:this={markerclusterContainer}>
  {#if markercluster}
    {@render children?.()}
  {/if}
</div>