<script>
  import Leaflet from "$lib/Leaflet_new.svelte"
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
  import {dailyData, tempData, currData, normalFruits, tropicalFruits, passionFruit, gps} from '$lib/store';
  import ImageViewer from "$lib/ImageViewer.svelte";
  import {drawShape } from '$lib/geoDrawing.js';
  import ModalNew from "$lib/Modal_new.svelte";
  import Popup from "$lib/Popup.svelte";
	import LeafletNew from "./Leaflet_new.svelte";

  //TODO daily list
  //TODO daily list filter

  let {
    modalID
  } = $props();

  let showInput = $state(false);
  let showCursor = $state(false);


  let selectedShape;
  let quickPoint;


  const toggleInput = ()=> {
    showInput = !showInput;
  }

  const toggleCursor = ()=> {
    showCursor = !showCursor;
  }

  const cursorClick = (e) =>{
    //$currData.geo = [{id: null, type: 'Point', cor: e, keep: true}]
    //addNewPoint(e);
    console.log(selectedShape, e)
    //taxon_editor.showModal();
    
    let shape = drawShape(selectedShape, e);
    $tempData.features = [...$tempData.features, shape];
    console.log(JSON.stringify(shape));

    if(quickPoint) {
      quickPoint = false;
      //$currData.geo = shape.geometry;
      taxon_editor.showModal()
    }

    selectedShape = 'point';
    showCursor = false;
  }

  const drawQuickPoint = ()=> {
    quickPoint = true;
    showCursor = true;
  }

  const editDailyItem = (e)=>{
    console.log(e.detail);
    //toggleEditor();
  } 
  
  const openTaxonEditor = ()=> {
    taxon_editor.showModal();
  }

  const showDailyList = ()=> {
    daily_list.showModal();
    document.getElementById("my-drawer").checked = false;
  }

  const showImageViewer = ()=> {
    image_viewer.showModal();
    document.getElementById("my-drawer").checked = false;
  }

  const selectNewShape = (e)=> {
    selectedShape = e;
    showCursor = true;
  }



</script>

<ModalNew
  modalID = {modalID}
  modalClasses = "h-full w-full p-0 bg-yellow-100"
>
  <div class="flex gap-12 px-4 bg-yellow-300 shadow-sm navbar">

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img 
      class="w-6 h-6" src="images/menu-svgrepo-com.svg"
      alt="none"
      onclick = {()=> document.getElementById("my-drawer").checked = true}
    >
    <span class="text-lg font-bold">Map</span>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img 
      class="w-6 h-6" 
      src="images/editor-indent-svgrepo-com.svg"
      alt="none"
      onclick = {()=> taxon_editor.showModal()}
    >    
    
  </div>

  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
    </div>
    <div class="drawer-side z-3000">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="flex flex-col items-center justify-center w-1/2 h-full gap-2 p-2 bg-violet-100">

        <button 
          class="w-full px-2 py-1 bg-yellow-300 border-2 rounded-md border-slate-400" 
          img={'images/flower-tulip-outline.svg'} 
          onclick={showDailyList}
        >Daily List
        </button> 

        <button 
          class="w-full px-2 py-1 bg-yellow-300 border-2 rounded-md border-slate-400" 
          onclick={showImageViewer}
        >Image Viewer
        </button>

      </div>
    </div>
  </div>

  <LeafletNew
    openTaxonEditor = {openTaxonEditor}
  >

    {#if showCursor}
      <Cursor onclick = {cursorClick} />
    {/if}

    <Control position={'topleft'}>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <img 
        class="w-12 h-12 mt-32" 
        src="images/plus-svgrepo-com.svg"
        alt="none"
        onclick={drawQuickPoint}
      > 
    </Control>

  </LeafletNew>

</ModalNew>


<TaxonEditor modalID = "taxon_editor"/>

<DailyList
  modalID = "daily_list"
  dataList = {$dailyData}
  openTaxonEditor = {openTaxonEditor}
  on:editDailyItem = {editDailyItem}
/>




