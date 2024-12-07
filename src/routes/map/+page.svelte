<script>
  import Leaflet from "$lib/Leaflet.svelte"
  import Cursor from "$lib/Cursor.svelte";
  import Control from "$lib/Control.svelte";
  import GeoJson from "$lib/GeoJson.svelte";
  import SubGroup from "$lib/SubGroup.svelte";
  import Layers from "$lib/Layers.svelte";
  import TileLayer from "$lib/TileLayer.svelte";
  import Deflate from "$lib/Deflate.svelte";
  import Sidebar from "$lib/Sidebar.svelte";
  import Input from "$lib/Input.svelte";
  import {normalFruits, tropicalFruits, passionFruit, gps} from '$lib/store';

  let showSideBar = $state(false);
  let showinputModal = $state(false);
  let showcursor = $state(false);

  const toggleSideBar = ()=>{
    showSideBar = !showSideBar;
  }

  const toggleInput = ()=> {
    showinputModal = !showinputModal;
  }

  const toggleCursor = ()=> {
    showcursor = !showcursor;
  }

  const cursorClick = (e) =>{
    addNewData(e);
    showcursor = false;
  }

  const addNewData = (c)=> {
    let f = {
      'type': 'Feature',
      'properties': {
        data: `Zab-${$normalFruits.features.length}`,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': c,
      }
    }
    $normalFruits.features = [...$normalFruits.features, f];
  }
  
</script>
  

<div class="h-full">

  <Input bind:showInput = {showinputModal} />
  
  <Sidebar bind:showSideBar = {showSideBar} />
  
  <Leaflet>

    <Layers>      
      <TileLayer
        name={'OSM'}
        url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
        options={{ minZoom: 7, maxZoom: 19, attribution: '&copy; OpenstreetMap', crossOrigin : true}}
        selected
      />
      <TileLayer
        name={'Google'}
        url={'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga'}
        options={{ minZoom: 7, maxZoom: 21, attribution: '&copy; Google Maps', crossOrigin : true}}
      />  
      <TileLayer
      url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
      name={'Esri'}
      options={{ minZoom: 7, maxZoom: 19, attribution: '&copy; ESRI', crossOrigin : true}}
      />
      <TileLayer
        name={'Túristautak'}
        url={'http://{s}.map.turistautak.hu/tiles/turistautak/{z}/{x}/{y}.png'}
        options={{ minZoom:7, maxZoom:18, attribution: '&copy; Túristautak.hu', crossOrigin : true}}
      /> 

      <Deflate>
      
        <SubGroup name='Normalfruits'>
          <GeoJson name='Normalfruits' data={$normalFruits}/>
        </SubGroup>
        
        <SubGroup name='Tropicalfruits'>  
          <GeoJson name='Tropicalfruits' data={$tropicalFruits}/>
        </SubGroup>  
      
        <SubGroup name='Passionfruit'>
          <GeoJson name='Passionfruit' data={$passionFruit}/>
        </SubGroup>
        
      </Deflate>

      <SubGroup name='Gps'>
        <GeoJson name='Gps' data={$gps}>
        </GeoJson>
      </SubGroup>

    </Layers>

    <Control position={'topleft'}>
      <button 
        class="flex justify-center px-2 py-1 font-bold bg-yellow-500 border-2 border-black rounded-md" 
        onclick={toggleSideBar}
      >Sidebar</button>
    </Control>    

    <Control position={'topleft'}>
      <button 
        class="flex justify-center px-2 py-1 font-bold bg-yellow-500 border-2 border-black rounded-md" 
        onclick={toggleInput}
      >Input</button>
    </Control>

    <Control position={'bottomleft'}>
      <button 
        class="flex justify-center px-2 py-1 mb-24 font-bold text-white border-2 border-black rounded-md bg-amber-600" 
        onclick={toggleCursor}
      >Cursor</button>
    </Control>


    {#if showcursor}
      <Cursor onclick = {cursorClick} />
    {/if}

    <!--CircleMarker position ={[47.391857,19.03652]}>
      <Popup>
        <div class="flex flex-col justify-center w-64 gap-1 p-2 bg-yellow-200">
          <div class="font-bold whitespace-nowrap">Nagy fülemüle</div>
          <div class="italic whitespace-nowrap">Luscinia luscinia</div>
        </div>
      </Popup>   
    </CircleMarker-->

  </Leaflet>

</div>
