<script>
  import L from 'leaflet';
  import "leaflet.featuregroup.subgroup";
  import {getContext, setContext, hasContext, onMount, onDestroy} from 'svelte';

  let {children, name} = $props();
  
  let subgroup = $state();
  
  const map = getContext('map');
  const controlLayers = getContext('controllayers');
  const markerCluster = getContext('markercluster');
  const clustered = hasContext('markercluster')

  setContext('subgroup', ()=> subgroup);

  onMount(()=> {
    //subgroup = map() && L.featureGroup.subGroup(clustered ? markerCluster() : map());
    subgroup = map() && L.featureGroup.subGroup();
    controlLayers().addOverlay(subgroup, name);

    return ()=> {
      controlLayers().removeLayer(subgroup);
      //subgroup?.remove();
      subgroup = undefined;
    };

  });

</script>

{#if subgroup}
  {@render children?.()}
{/if}
