<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { onMount, getContext } from 'svelte';
  import {mapState} from '$lib/store';

  let { 
    cursorPosition = $mapState.center,
    bgr = 'bg-orange-400',
    brd = 'border-orange-400',
    onclick,
    oncontextmenu,
    ondrag,
    ondragend,
    children
  } = $props();

  let cursorContainer = $state();
	let cursor = $state();

  const map = getContext('map');

  const latLngToLatlngArray = (a)=> [a.lat, a.lng].map(c=>parseFloat(c.toFixed(6)));

  onMount(()=> {
    let divicon = L.divIcon({
      iconSize: null,
      className: `w-2 h-2 border rounded-full border-black border-solid z-40 ${bgr}`,
      iconAnchor: [4, 4],
      html: `<div class="h-20 w-20 bg-transparent border-4 border-solid rounded-xl mt-4 -ml-10 ${brd}"/>`
    });

    cursor = map() && L.marker(cursorPosition, {icon: divicon, draggable: true, autoPan: true, autoPanSpeed: 20})
    .on('click', (e)=> onclick(latLngToLatlngArray(e.latlng)))
    //.on('contextmenu', (e)=> oncontextmenu(latLngToLatlngArray(e.latlng)))
    //.on('drag', (e)=> ondrag(latLngToLatlngArray(e.target._latlng)))
    //.on('dragend', (e)=> ondragend(latLngToLatlngArray(e.target._latlng)))
    .addTo(map());
    
    return ()=> {
      divicon = undefined;
      cursor?.remove();
      cursor = undefined;
    };
	});
  
</script>

<div bind:this={cursorContainer}></div>