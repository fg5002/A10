<script>
  import L from 'leaflet';
  import "leaflet.featuregroup.subgroup";
  import {getContext, setContext, onMount} from 'svelte';

  let {name, children} = $props();
  
  let subgroup = $state();
  
  const controlLayers = getContext('controllayers');
  const markerCluster = getContext('markercluster');
  const map = getContext('map');

  setContext('subgroup', ()=> subgroup);

  onMount(()=> {
    subgroup = L.featureGroup.subGroup(markerCluster ? markerCluster() : map());
    controlLayers().addOverlay(subgroup, name);

    return ()=> {
      subgroup?.remove();
      subgroup = undefined;
    };

  });


</script>

{#if subgroup }
  {@render children?.()}
{/if}