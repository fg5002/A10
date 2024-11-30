<script>
  import L from 'leaflet';
  import {getContext, hasContext, onMount} from 'svelte';
  import {mapState} from '$lib/store';
  
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
  const deflate = getContext('deflate');
  const deflated = hasContext('deflate')
  const clustered = hasContext('markercluster')

  $effect(()=> { 
    clustered && geojson && subGroup().removeLayer(geojson);
    geojson && geojson.clearLayers().addData(data);
    clustered && geojson && subGroup().addLayer(geojson);
  })

  const popupContent = (data)=> {
    return  `<div class="flex flex-col justify-center p-2 bg-yellow-200">
              <div class="font-bold whitespace-nowrap">${data}</div>
            </div>`
  }

  onMount(()=> {
    geojson = map() && L.geoJSON(data, {
      onEachFeature: (feature, layer)=> {
        layer.bindPopup(
          popupContent(feature.properties.data), 
          {closeButton: false, offset: [0,-5]}
        )      
      },
      pointToLayer: (feature, latlng)=> L.circleMarker(latlng),
      style: {      
        fillColor: fillcolor,
        radius: 7,
        color: color,
        weight: 1,
        opacity: 1.0,
        fillOpacity: 1.0  
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