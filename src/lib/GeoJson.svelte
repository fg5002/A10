<script>
  import L from 'leaflet';
  import {getContext, hasContext, setContext, onMount, mount} from 'svelte';
  import {mapState} from '$lib/store';
  import '$lib/leaflet.contextmenu.css';
  import '$lib/leaflet.contextmenu.js';
	import GeoJsonPopup from './GeoJsonPopup.svelte';

  
  let {
    data = [],
    name = '',
    fillcolor = 'yellowgreen', 
    color = 'black',
    children
  } = $props();
  
  let geojson = $state();
  let geojsonContainer = $state();

  const map = getContext('map');
  const subGroup = getContext('subgroup');
  const grouped = hasContext('subgroup');

  const showCoordinates = (e) => {
    console.log(e.relatedTarget.feature.geometry.coordinates)
  }

  setContext('layer', ()=> geojson);

  $effect(()=> { 
    geojson && subGroup().removeLayer(geojson);
    geojson && geojson.clearLayers().addData(data);
    geojson && subGroup().addLayer(geojson);
  })

  onMount(()=> {
    geojson = map() && L.geoJSON(data, {
      
      onEachFeature: (feature, layer)=> {
        const popupElement = document.createElement('div');
        if (GeoJsonPopup) {
          mount(GeoJsonPopup, {
            target: popupElement,
            props: {data: feature.properties.data}
          });
        } else {
          popupElement.innerHTML = '<div>No Popup Provided</div>';
        }
        layer.bindPopup(popupElement, { closeButton: false, offset: [0, -5] });
      },

      pointToLayer: (feature, latlng)=> {
        return feature.geometry.radius ? 
          L.circle(latlng, feature.geometry.radius) : 
          L.circleMarker(latlng);
      },
      style: {      
        fillColor: fillcolor,
        radius: 8,
        color: color,
        weight: 1,
        opacity: 1.0,
        fillOpacity: 0.5
      }
    });
    
    if(grouped){
      geojson.addTo(subGroup());
      if($mapState.overlays.includes(name)){
        subGroup().addTo(map());    
      }
    }else{
      geojson.addTo(map());
    }

    return ()=> {
      geojson?.remove();
      geojson = undefined;
    };

  });
  
</script>

<div bind:this={geojsonContainer}>
  {#if geojson}  
    {@render children?.()}
  {/if}
</div>