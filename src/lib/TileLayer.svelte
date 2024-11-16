<script>
  import L from 'leaflet';
  import {onMount, getContext} from 'svelte';

  let {
    name,
    url,
    options,
    selected = false
  } = $props();

  let tileLayer = $state();

  const map = getContext('map');
  const controlLayers = getContext('controllayers');
  
  onMount(()=> {
    tileLayer = map() && L.tileLayer(url, options);
    controlLayers().addBaseLayer(tileLayer, name);
    selected && tileLayer.addTo(map());
  
    return ()=> {
      tileLayer.remove();
      tileLayer = undefined;
    }
  });

</script>