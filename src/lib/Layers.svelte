<script>
  import L from 'leaflet';
  import {getContext, setContext, onMount} from 'svelte';

  let {
    position = 'topright',
    children
  } = $props();

  let controlLayers = $state();
  
  const map = getContext('map');

  setContext('controllayers', ()=> controlLayers);

  onMount(()=> {
    controlLayers = map() && L.control.layers({}, {}, {collapsed: true});
    controlLayers.setPosition(position);
    controlLayers.addTo(map());

    return ()=> {
      controlLayers?.remove();
      controlLayers = undefined;
    };

  });

</script>

{#if controlLayers }
    {@render children?.()}
{/if}