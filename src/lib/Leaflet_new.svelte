<script>

  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import {mapState, dailyData, normalFruits, tropicalFruits, passionFruit} from '$lib/store';
  import 'leaflet.markercluster/dist/leaflet.markercluster.js';
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
  import 'Leaflet.Deflate/dist/L.Deflate.js';
  import "leaflet.featuregroup.subgroup";
  import "leaflet-spline";
  import GeoJsonPopup from './GeoJsonPopup.svelte';
  import {mount, setContext} from 'svelte';
  import {addPopup} from '$lib/editor.svelte.js'

  let {
    children,
    onLloadFieldData,
    openTaxonEditor
  } = $props();

  let map = $state();
  let drawing = false;
  let tempLine = null;
  let currentPolygon = [];
    
  setContext('map', ()=> map);

  $effect(()=> onLloadFieldData($dailyData, fieldDataLayer));

  let fieldDataLayer = L.featureGroup();
  let settlementLayer = L.geoJSON();
  let archiveFieldDataLayer = L.geoJSON();

  let options = {
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true
  }

  const initLeaflet = (node)=> {

    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
      { minZoom: 7, maxZoom: 19, attribution: '&copy; OpenstreetMap', crossOrigin : true});
    const gog = L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga', 
      { minZoom: 7, maxZoom: 21, attribution: '&copy; Google Maps', crossOrigin : true});
    const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
      { minZoom: 7, maxZoom: 19, attribution: '&copy; ESRI', crossOrigin : true});
    const topo = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', 
      { minZoom: 7, maxZoom: 15, attribution: '&copy; Google Maps', crossOrigin : true});  
    const tuh = L.tileLayer('http://{s}.map.turistautak.hu/tiles/turistautak/{z}/{x}/{y}.png', 
      { minZoom: 7, maxZoom: 18, attribution: '&copy; Túristautak.hu', crossOrigin : true});

    map = L.map(node, {
      center: $mapState.center, 
      zoom: $mapState.zoom,
      layers: [osm]
    });
  
    const markerCluster = L.markerClusterGroup(options);

    const deflates = L.deflate({
      minSize: 80, //20
      markerType: L.circleMarker,
      markerOptions: {     
        fillColor: 'yellow',
        radius: 7,
        color: 'black',
        weight: 1,
        opacity: 1.0,
        fillOpacity: 0.5,
        interactive: true
      }, 
      markerLayer: markerCluster
    });
    deflates.addTo(map);

    fieldDataLayer = L.featureGroup.subGroup(deflates).addTo(map);
    settlementLayer = L.featureGroup.subGroup(deflates).addTo(map);
    archiveFieldDataLayer = L.featureGroup.subGroup(deflates, archiveFieldDataLayer);

    L.geoJSON($normalFruits, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(addPopup(GeoJsonPopup, feature), { closeButton: false, offset: [0, -5] });
      },
      pointToLayer: (feature, latlng)=> L.circleMarker(latlng),
      style: {      
        fillColor: 'yellowgreen',
        radius: 7,
        color: 'black',
        weight: 1,
        opacity: 1.0,
        fillOpacity: 0.5
      }
    }).addTo(settlementLayer);

    L.geoJSON($passionFruit, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(addPopup(GeoJsonPopup, feature), { closeButton: false, offset: [0, -5] });
      },
      pointToLayer: (feature, latlng)=> L.circleMarker(latlng),
      style: {      
        fillColor: 'yellowgreen',
        radius: 7,
        color: 'black',
        weight: 1,
        opacity: 1.0,
        fillOpacity: 0.5
      }
    }).addTo(archiveFieldDataLayer);


    L.control.layers({
      "OSM": osm,
      'Google': gog,
      'ESRI': esri,
      'Topo': topo,
      'Turista': tuh
    },{ 
      "Data": fieldDataLayer, 
      "Settlement": settlementLayer, 
      "Archive": archiveFieldDataLayer 
    }).setPosition('topright').addTo(map);

    //map.on("click", (e)=> addPoint(e));
    //map.on("dblclick", (e)=> finishPolygon(e));

    L.Spline.prototype.fire = function(event, data) {
      if (!event) {
        console.warn("Spline fire event missing:", event);
        return;
      }
      L.Layer.prototype.fire.call(this, event, data);
    };

    return ()=> {
      map?.remove();
      map = undefined;
    };

  }

  const addFeature = (feature, targetLayer)=> {
    let geometryType = feature.geometry.type;
    let coords = feature.geometry.coordinates;
    let shape;

    if (geometryType === "Point") {
      shape = L.circleMarker([coords[1], coords[0]], {
        radius: 7,
        fillColor: "yellow",
        color: "black",
        weight: 1,
        fillOpacity: 0.8
      });
    }else{
      if (feature.geometry.spline) {
        shape = L.spline(coords[0].map(c => [c[1], c[0]]), {
          id: feature.properties.id,
          color: "blue",
          weight: 2,
          fillcolor: 'cyan',
          fill: true,
          smoothing: 0.05,
        });
      }else{
        shape =  L.polygon(coords.map(ring => ring.map(c => [c[1], c[0]])), {
          color: "green",
          weight: 2,
          fillOpacity: 0.5
        });
      }
    }
    shape.bindPopup(addPopup(GeoJsonPopup, feature), { closeButton: false, offset: [0, -5] });
    targetLayer.addLayer(shape);

  }

  onLloadFieldData = async(data, targetLayer)=> {
    targetLayer.clearLayers(); // Remove old data
    data.features.forEach(feature => addFeature(feature, targetLayer));
  }

  const addPoint = (e) => {
    if (!drawing) {
      drawing = true;
      currentPolygon = [];
    }

    const latlng = e.latlng;
    if(currentPolygon.length === 6){
      currentPolygon.push(currentPolygon[0])
      finishPolygon()
    }else{
      currentPolygon.push(latlng);
    }

    if (currentPolygon.length > 1) {
      if (tempLine) {
        map.removeLayer(tempLine);
      }
      tempLine = L.polyline(currentPolygon, { color: "blue", weight:2 }).addTo(map);
    }
  };

  const finishPolygon = (e) => {
    console.log('dblclick')
    if (currentPolygon.length > 2) {
      L.spline(currentPolygon, {         
        fillColor: "yellow",
        color: "green",
        fill: true,
        weight: 2,
        smoothing: 0.1,
      })
      .addTo(fieldDataLayer);
    }

    // Reset state
    drawing = false;
    currentPolygon = [];
    if (tempLine) {
      map.removeLayer(tempLine);
      tempLine = null;
    }
  };


</script>


<div class="w-full h-full z-1000" use:initLeaflet>
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