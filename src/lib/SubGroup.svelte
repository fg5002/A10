<script>
  import L from 'leaflet';
  import "leaflet.featuregroup.subgroup";
  import {getContext, setContext, hasContext, onMount} from 'svelte';
  import {mapState} from './store';

  let {name, children} = $props();
  
  let subgroup = $state();
  
  const controlLayers = getContext('controllayers');
  const markerCluster = getContext('markercluster');
  const clustered = hasContext('markercluster');
  const map = getContext('map');

  setContext('subgroup', ()=> subgroup);

  onMount(()=> {
    subgroup = L.featureGroup.subGroup(clustered && markerCluster());
    if($mapState.overlays.includes(name)){
      subgroup.addTo(map());
    }
    controlLayers().addOverlay(subgroup, name)
    
    return () => {
      controlLayers()?.removeLayer(subgroup)
    }
  });

</script>

{#if subgroup }
  {@render children?.()}
{/if}