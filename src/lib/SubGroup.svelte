<script>
  import L from 'leaflet';
  import "leaflet.featuregroup.subgroup";
  import {getContext, setContext, hasContext, onMount} from 'svelte';

  let {children, name} = $props();
  
  let subgroup = $state();
  
  const map = getContext('map');
  const controlLayers = getContext('controllayers');
  const deflate = getContext('deflate');
  const deflated = hasContext('deflate');

  setContext('subgroup', ()=> subgroup);
  
  onMount(()=> {   
    subgroup = map() && L.featureGroup.subGroup(deflated && deflate());
    controlLayers().addOverlay(subgroup, name);
    
    return () => {
      controlLayers().removeLayer(subgroup);
      subgroup?.remove;
      subgroup = undefined;
    }

  });

</script>

{#if subgroup}
  {@render children?.()}
{/if}
