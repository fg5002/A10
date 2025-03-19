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
  import DailyList from "$lib/DailyList.svelte";
  import {dailyData, currData, normalFruits,tropicalFruits, passionFruit, gps} from '$lib/store';

  //TODO daily list
  //TODO daily list filter

  let showSideBar = $state(false);
  let showInput = $state(false);
  let showTaxonEditor = $state(false);
  let showCursor = $state(false);
  let showDailyList = $state(false);

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
    $currData.geo = [{id: null, type: 'Point', cor: e, keep: true}]
    //addNewPoint(e);
    console.log($currData.geo)
    showTaxonEditor = true;
    showCursor = false;
  }

  const addNewPoint = (cor)=> {
    let f = {
      'type': 'Feature',
      'properties': {
        data: `Zab-${$normalFruits.features.length}`,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': cor,
      }
    }
    $normalFruits.features = [...$normalFruits.features, f];
  }

  const editDailyItem = (e)=>{
    console.log(e.detail);
    //toggleEditor();
  } 
  
  const onSelectItemToEdit = ()=> {
    showTaxonEditor = true;
  }

</script>
  
<div class="w-full h-full">

<Input
  bind:showInput
  backdropClasses = "items-start justify-center z-3000"
  modalClasses = "w-auto h-auto mt-2"
  idClass = 'inputX' 
/>

<Sidebar bind:showSideBar />

<TaxonEditor bind:showTaxonEditor />

<!--List/-->

<DailyList 
  bind:showDailyList
  dataList = {$dailyData}
  onSelectItemToEdit = {onSelectItemToEdit}
  on:editDailyItem = {editDailyItem}
/>

<Leaflet>

  {#if showCursor}
    <Cursor onclick = {cursorClick} />
  {/if}

  <Control position={'topright'}>      
    <!--MenuItem img={'images/flower-tulip-outline.svg'} on:click={()=> showDailyList = true}/-->  
    <button 
      class="px-2 py-1 text-white border-2 rounded-md border-slate-400 bg-violet-500" 
      img={'images/flower-tulip-outline.svg'} 
      onclick={()=> showDailyList = true}
    >
      Daily
    </button>  
  </Control>

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
    
      <SubGroup name='Daily data'>
        <GeoJson name="Daily data" data={$dailyData}/>
      </SubGroup>

      <SubGroup name='Normalfruits'>
        <GeoJson name="NormalFruits" data={$normalFruits}/>
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

</Leaflet>

</div>

