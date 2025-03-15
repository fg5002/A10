<script>
  import { onMount, setContext, mount } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import "leaflet.markercluster/dist/leaflet.markercluster.js";
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
  import 'leaflet.markercluster.layersupport';
  import "leaflet.featuregroup.subgroup";
  import 'Leaflet.Deflate/dist/L.Deflate.js';
  import '$lib/l.ellipse.min';
  import GeoJsonPopup from './GeoJsonPopup.svelte';
  import {mapState, dailyData, normalFruits, tropicalFruits, passionFruit} from '$lib/store';

	let {children} = $props();

	let mapContainer = $state();
	let map = $state();

  const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
    { minZoom: 7, maxZoom: 19, attribution: '&copy; OpenstreetMap', crossOrigin : true});
  const gog = L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga', 
    { minZoom: 7, maxZoom: 21, attribution: '&copy; Google Maps', crossOrigin : true});
  const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
  { minZoom: 7, maxZoom: 19, attribution: '&copy; ESRI', crossOrigin : true});
  const topo = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', 
    { minZoom: 7, maxZoom: 17, attribution: '&copy; Google Maps', crossOrigin : true});  
  const tuh = L.tileLayer('http://{s}.map.turistautak.hu/tiles/turistautak/{z}/{x}/{y}.png', 
    { minZoom: 7, maxZoom: 18, attribution: '&copy; Túristautak.hu', crossOrigin : true});
    
  const baseLayers = {
    "OSM": osm,
    "Google": gog,
    "ESRI": esri,
    "Topo": topo,
    "Turistautak": tuh
  };

  const geoJsonOption = {

    onEachFeature: (feature, layer)=> {
      const popupElement = document.createElement('div');
        if (GeoJsonPopup) {
          mount(GeoJsonPopup, {
            target: popupElement,
            props: {disp: feature.properties.disp}
          });
        } else {
          popupElement.innerHTML = '<div>No Popup Provided</div>';
        }
        layer.bindPopup(popupElement, { closeButton: false, offset: [0, -5] });
    },

    pointToLayer: (feature, latlng)=> {
      return feature.geometry.param ?
        L.ellipse(latlng, [feature.geometry.param[0],feature.geometry.param[1]],feature.geometry.param[2]) :
        L.circleMarker(latlng);
    },

    style: (feature)=>{
      return {
        fillColor: 'yellowgreen',
        radius: 7,
        color: 'black',
        weight: 1,
        opacity: 1.0,
        fillOpacity: 0.5
      }; 
    }
  }

  const dailydata = L.geoJSON($dailyData, geoJsonOption);
  const normalfruits = L.geoJSON($normalFruits, geoJsonOption);
  const tropicalfruits = L.geoJSON($tropicalFruits, geoJsonOption);
  const passionfruit = L.geoJSON($passionFruit, geoJsonOption);

  $effect(()=> dailydata.clearLayers().addData($dailyData.features));
  $effect(()=> normalfruits.clearLayers().addData($normalFruits.features));
  $effect(()=> tropicalfruits.clearLayers().addData($tropicalFruits.features));
  $effect(()=> passionfruit.clearLayers().addData($passionFruit.features));

  const overlayMaps = {
    "Daily data": dailydata,
    "Normalfruits": normalfruits,
    "Tropicalfruits": tropicalfruits,
    "Passionfruit": passionfruit
  };

  setContext('map', ()=> map);

  const latLngToLatLngArray = (a)=> [a.lat, a.lng].map(c=>parseFloat(c.toFixed(6)));

  onMount(()=> {

    map = L.map(mapContainer, {
      center: $mapState.center, 
      zoom: $mapState.zoom,
      layers: [baseLayers[$mapState.baselayer]]
    })
    .on('dragend', ()=> {
      $mapState.center = latLngToLatLngArray(map.getCenter());
    })
    .on('zoomend', ()=> {
      $mapState.zoom = map.getZoom();
      $mapState.center = latLngToLatLngArray(map.getCenter());
    })
    .on('baselayerchange', (e)=> {
      $mapState.baselayer= e.name;
      console.log($mapState.baselayer);
    })
    .on('overlayadd', (e)=> {0
      if($mapState.overlays.includes(e.name)) return;
      $mapState.overlays = [...$mapState.overlays, e.name];
    })
    .on('overlayremove', (e)=> {
      $mapState.overlays = $mapState.overlays.filter(d=> d!=e.name);
    });

    let mcg = L.markerClusterGroup.layerSupport();
    mcg.addTo(map);
    //mcg.checkIn([overlayMaps['Normalfruits'], overlayMaps['Passionfruit']]);*/
    mcg.checkIn([dailyData, normalfruits, passionfruit,tropicalfruits])
  
    const deflates = L.deflate({
      minSize: 80,
      markerType: L.circleMarker,
      markerOptions: {     
        fillColor: 'yellowgreen',
        radius: 7,
        color: 'black',
        weight: 1,
        opacity: 1.0,
        fillOpacity: 1.0  
      }, 
      markerLayer: mcg
    });
    deflates.addTo(map);


    const overlayGroup = L.layerGroup([normalfruits, deflates]);

    const supportGroup = L.markerClusterGroup.layerSupport();
    supportGroup.addLayer(overlayGroup);
    map.addLayer(supportGroup);


    const featureGroup = L.featureGroup([normalfruits, deflates]);
    
    //normalfruits.addTo(deflates);
    //passionfruit.addTo(deflates);
    
    
    L.control.layers(baseLayers,{}).setPosition('topright').addTo(map);
    
    L.control.layers({}, { "GeoJSON Data": featureGroup }, {collapsed: false}).addTo(map);


    //$mapState.overlays.forEach(d=> map.addLayer(overlayMaps[d]));

    return ()=> {
      map?.remove();
      map = undefined;
    };
	});

  
</script>

<div class="w-full h-full z-1000" bind:this={mapContainer}>
  {#if map}  
    {@render children?.()}
  {/if}
</div>

<style>
  :global(.leaflet-popup-content-wrapper) {   
    padding: 0px;
  }
  :global(.leaflet-popup-content) {
    padding: 0px;
    margin: 0px;
  }
  :global(.leaflet-popup-tip) {
    background-color: rgb(254 240 138);
  }
</style>