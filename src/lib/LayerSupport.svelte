<script>
  import L from 'leaflet';
  import 'leaflet.markercluster.layersupport';
  import {getContext, setContext, hasContext, onMount} from 'svelte';
  import {mapState} from './store';

  let {name, children} = $props();
  
  let layersupport = $state();
  
  const controlLayers = getContext('controllayers');
  const map = getContext('map');

  setContext('layersupport', ()=> layersupport);

  onMount(()=> {
    layersupport = L.markerClusterGroup.layerSupport();

    controlLayers().addOverlay(layersupport, name)

    if($mapState.overlays.includes(name)){
      layersupport.addTo(map());
    }
    
    return () => {
      controlLayers().removeLayer(layersupport);
      layersupport?.remove;
    }
  });

</script>

{#if layersupport }
  {@render children?.()}
{/if}