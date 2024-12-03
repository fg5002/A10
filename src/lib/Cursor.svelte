<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, getContext } from 'svelte';
  import { nearestPointOnLine } from "@turf/nearest-point-on-line";
  import {polygonToLine} from '@turf/polygon-to-line';
  import {explode} from '@turf/explode';
  import {distance} from '@turf/distance';
  import * as turf from '@turf/helpers';
  import {mapState, normalFruits, tropicalFruits, passionFruit, gps} from '$lib/store';

  let { 
    cursorPosition = $mapState.center,
    bgr = 'bg-orange-400',
    brd = 'border-orange-400',
    onclick,
    ondrag,
    ondragend
  } = $props();

  let cursorContainer = $state();
	let cursor = $state();

  const map = getContext('map');

  const latLngToArr = (e)=> [e.lat, e.lng].map(d=> parseFloat(d.toFixed(6)));
  const latLngToRevArr = (e)=> [e.lng, e.lat].map(d=> parseFloat(d.toFixed(6)));

  const revArrToLatLng = (c) => {
    return {lat: parseFloat(c[1].toFixed(6)), lng: parseFloat(c[0].toFixed(6))}
  }
  
  const pixelToMeter = (n)=> {
    return 40075016.686 * Math.abs(Math.cos($mapState.center[0] * Math.PI/180)) / Math.pow(2, $mapState.zoom + 8) * 0.001 * n;
  }

  const snapTo=(d, p)=>{
    let dist = distance(d, p, {units: 'kilometers'});
    dist < pixelToMeter(15) && cursor.setLatLng(revArrToLatLng(d.geometry.coordinates));
  }

  const cursorSnap=(e, ...args)=> {
    let p=turf.point(e);
    [...args].forEach(f=> {
      f.features.forEach(d=> {
        let np;
        switch (d.geometry.type) {
          case 'Point':
            snapTo(d, p);
            break;
          case 'MultiPoint':
            explode(d).features.forEach(f=> snapTo(f, p));
            break;
          case 'LineString':
            np = nearestPointOnLine(d, p, {units: 'kilometers'});
            snapTo(np, p);
            explode(d).features.forEach(f=> snapTo(f, p));
            break;
          case 'Polygon':
            np = nearestPointOnLine(polygonToLine(d), p, {units: 'kilometers'});
            snapTo(np, p);
            explode(d).features.forEach(f=> snapTo(f, p));
            break;     
          default:
            break;
        }
      });
    });
  }
  
  ondrag = (e)=> {
    cursorSnap(latLngToRevArr(e), $normalFruits, $tropicalFruits, $passionFruit, $gps);
  }

  onMount(()=> {
    let divicon = L.divIcon({
      iconSize: null,
      className: `w-2 h-2 border rounded-full border-black border-solid z-40 ${bgr}`,
      iconAnchor: [4, 4],
      html: `<div class="h-20 w-20 bg-transparent border-4 border-solid rounded-xl mt-4 -ml-10 ${brd}"/>`
    });

    cursor = map() && L.marker(cursorPosition, {
      icon: divicon,
      draggable: true,
      autoPan: true,
      autoPanSpeed: 20
    })
    .on('click', (e)=> onclick(latLngToRevArr(e.latlng)))
    .on('drag', (e)=> ondrag(e.latlng))
    .on('dragend', ()=> {ondragend})
    .addTo(map());
    
    return ()=> {
      divicon = undefined;
      cursor?.remove();
      cursor = undefined;
    };
	});

</script>

<div bind:this={cursorContainer}></div>