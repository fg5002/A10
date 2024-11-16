<script>
  import L from 'leaflet';
  import {getContext, onMount} from 'svelte';
  import {mapState} from './store';
  
  let {
    name,
    data = [],
    fillcolor = 'yellowgreen', 
    color = 'black', 
    children
  } = $props();
  
  let geojson = $state();
  let geojsonContainer = $state();

  const map = getContext('map');
  const subGroup = getContext('subgroup');
  const markerCluster = getContext('markercluster');

  $effect(()=> {
    geojson && geojson.clearLayers().addData(data);
    if( geojson && subGroup){
      subGroup().removeLayer(geojson);
      subGroup().addLayer(geojson);
    }
    if(geojson && subGroup && markerCluster){
      markerCluster().removeLayer(subGroup());
      markerCluster().addLayer(subGroup());
    }
    if(geojson && markerCluster){
      markerCluster().removeLayer(subGroup());
      markerCluster().addLayer(geojson);
    }
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

    if(subGroup){
      geojson.addTo(subGroup());
      if($mapState.overlays.includes(name)){
        subGroup().addTo(map());    
      }
      if(markerCluster){
        markerCluster().addLayer(geojson);
        subGroup().addTo(map())
      }
      if(subGroup && markerCluster){
        markerCluster().addLayer(subGroup());
        //subGroup().addTo(markerCluster())
      }
    }else{
      geojson.addTo(map());
    }

    return ()=> {
      markerCluster && markerCluster().remove();
      subGroup && subGroup().remove();
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