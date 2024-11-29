<script>
  import L from 'leaflet';
  import {getContext, hasContext, onMount} from 'svelte';
  
  let {
    data = [],
    fillcolor = 'yellowgreen', 
    color = 'black', 
    children
  } = $props();
  
  let geojson = $state();
  let geojsonContainer = $state();

  const map = getContext('map');
  const subGroup = getContext('subgroup');
  const grouped = hasContext('subgroup');
  const markerCluster = getContext('markercluster');
  const clustered = hasContext('markercluster')

  $effect(()=> { 
    clustered && geojson && markerCluster().removeLayer(geojson);
    geojson && geojson.clearLayers().addData(data);
    clustered && geojson && markerCluster().addLayer(geojson);
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
    
    geojson.addTo(grouped ? subGroup() : clustered ? markerCluster() : map());

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