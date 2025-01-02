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
  import TaxonEditor from "$lib/TaxonEditor.svelte";
  import {normalFruits, tropicalFruits, passionFruit, gps} from '$lib/store';

  //TODO daily list
  //TODO daily list contextmenu https://svelte.dev/playground/6fb90919e24942b2b47d9ad154386b0c?version=3.49.0
  //TODO daily list filter

  let showSideBar = $state(false);
  let showInput = $state(false);
  let showTaxonEditor = $state(false);
  let showCursor = $state(false);

  const toggleSideBar = ()=>{
    showSideBar = !showSideBar;
  }

  const toggleInput = ()=> {
    showInput = !showInput;
  }

  const toggleTaxonEditor = ()=> {
    showTaxonEditor = !showTaxonEditor;
  }

  const toggleCursor = ()=> {
    showCursor = !showCursor;
  }

  const cursorClick = (e) =>{
    addNewData(e);
    showCursor = false;
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

  <Input
    bind:showInput
    backdropClasses = "items-start justify-center z-3000"
    modalClasses = "w-auto h-auto mt-2"
    idClass = 'inputX' 
  />
  
  <Sidebar bind:showSideBar />
  
  <TaxonEditor bind:showTaxonEditor />
  
  <Leaflet>

    {#if showCursor}
      <Cursor onclick = {cursorClick} />
    {/if}

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

    <Control position={'bottomleft'}>
      <button 
        class="flex justify-center px-2 py-1 font-bold bg-yellow-500 border-2 border-black rounded-md" 
        onclick={toggleInput}
      >Input</button>
    </Control>

    <Control position={'topleft'}>
      <button 
        class="flex justify-center px-2 py-1 font-bold bg-yellow-500 border-2 border-black rounded-md" 
        onclick={toggleTaxonEditor}
      >Taxon editor</button>
    </Control>

    <Control position={'topleft'}>
      <button 
        class="flex justify-center px-2 py-1 mt-8 font-bold text-white border-2 border-black rounded-md bg-amber-500" 
        onclick={toggleCursor}
      >Cursor</button>
    </Control>


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
