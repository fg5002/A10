<script>
  import L from 'leaflet';
  import {getContext, setContext, onMount} from 'svelte';
  import 'leaflet.markercluster/dist/leaflet.markercluster.js';
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

  let markerCluster;
  let markerClusterContainer;

  const map = getContext('map');

  setContext('markercluster', ()=> markerCluster);

  onMount(()=> {

    markerCluster = map() && L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true
    }).addTo(map());

    return ()=> {
      markerCluster?.remove();
      markerCluster = undefined;
    };
  });

</script>

<div bind:this={markerClusterContainer}>
  {#if markerCluster}
    <slot/>
  {/if}
</div>