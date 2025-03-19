<script>
  import Modal from "./Modal.svelte";
  import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
  import DailyListItem from "$lib/DailyListItem.svelte";
  import {currDate, currData, dailyData, storedData} from "$lib/store";
  import {storedDataToFeatureCollection, currDataItemFromStoredData, featureCollectionFromStoredData} from '$lib/editor.svelte.js';

  //TODO eliminate dummy data

  let {
    showDailyList = $bindable(),
    dataList,
    onSelectItemToEdit
  } = $props();

  $inspect($currDate)

  $effect(()=> {
    $dailyData = featureCollectionFromStoredData($storedData);
  })

	const scroll = node => {
		if (dataList.features.length > 0)
			node.scrollIntoView()
	}

  let moveInArray = (arr, from, to)=> {
    let item = arr.splice(from, 1);
    arr.splice(to, 0, item[0]);
  };

  const reorderItem = (from, to)=> {
    console.log(`${from} -> ${to}`);
    moveInArray($storedData,from, to);
    showDailyList = false;  //TODO eliminate the need of hiding panel at reordering
    $dailyData = featureCollectionFromStoredData($storedData);
  }

  const sortableAction = (node, options = {})=> {
    $effect(() => {
      let sortable = new Sortable(node, {
        animation: 150,
        ghostClass: 'opacity-0',
        multiDrag: true,
        handle: '.my-handle',
        selectedClass: 'selected', // The class applied to the selected items
	      fallbackTolerance: 3, // So that we can select items on mobile
        onEnd(e) {
          //console.log(e.oldIndex, e.newIndex);
          reorderItem(e.oldIndex, e.newIndex)
        }
      });
      return () => sortable?.destroy();
    });
  }

  const copyCoordToClipboard = async(cor)=> {
    try {
      await navigator.clipboard.writeText([cor[1],cor[0]]);
    } catch (error) {
      console.error(error.message);
    }
  }

  const selectItemToEdit = (id)=> {
    let res = currDataItemFromStoredData($storedData,id)
    $currData = res;
    onSelectItemToEdit(res);
    showDailyList = false;
  }

  const deleteItem = (id)=> {
    console.log(id)
    $dailyData.features = [...dataList.features.filter(f=> f.properties.id != parseInt(id))]
  };

</script>

<Modal
  bind:showModal = {showDailyList} 
  idClass = "daily-list" 
  backdropClasses = "h-[calc(100vh-50px]) z-2000 items-center"
  modalClasses = "flex-col h-full w-full bg-transparent border-[1px] border-slate-500 divide-y divide-slate-400"
  inFly = {{x: 500, duration: 500}}
  outFly = {{x: 500, duration: 500}}
>

<div class="h-[50px] flex items-center justify-between px-2 py-1 text-lg sm:text-xl font-bold bg-lime-300">
  Daily List
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <img 
    class="w-5 h-5" src="images/map-pin.svg"
    alt="none"
    onclick = {()=> console.log('empty')}
  >
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <img 
    class="w-5 h-5" src="images/close-small-svgrepo-com.svg"
    alt="none"
    onclick = {()=> showDailyList = false}
  >
</div>
<div class="w-full h-[86vh] bg-lime-100">
  <ul
    class="flex flex-col h-full w-full bg-red-100 divide-y-[1px] divide-slate-400 border-b-[1px] border-slate-400 
    overflow-y-scroll"
    use:sortableAction
  >
    {#each dataList.features as item, i (item.properties.id)}

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <li class="text-lg select-none bg-violet-100" use:scroll>
        
        <!--DailyListItem disp = {item.properties.disp}/-->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div tabindex="0" class="min-h-0 p-0 px-1 collapse">

          <div class="h-auto min-h-0 px-2 py-1 collapse-title">
            {#if Object.hasOwn(item.properties.disp, "atr")}
              {#if item.properties.disp.tax}
                <div class="flex flex-wrap w-full">
                  <span class="pr-1 font-semibold">{item.properties.disp.tax.hun}</span>
                  <span class="italic ">({item.properties.disp.tax.ltn})</span>        
                </div>
              {/if}
              <span>{item.properties.disp.atr}</span>
            {:else}
              <span class="font-semibold">{item.properties.disp}</span>
            {/if}            
          </div>

          <div class="min-h-0 px-2 py-1 collapse-content bg-lime-100">
            {#if item.properties.disp.fil}
              <div>{item.properties.disp.fil}</div>
            {/if}
            <div>{item.properties.disp.obs}</div>
            {#if item.geometry.type === 'Point'}
              <div class="flex items-center gap-4">
                {item.geometry.coordinates}
              <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <img 
                  class="w-5 h-5" 
                  src="images/copy-svgrepo-com.svg"
                  alt="none"
                  onclick = {()=> copyCoordToClipboard(item.geometry.coordinates)}
                >                
              </div>
            {:else}
              <div>{item.geometry.type}</div>
            {/if}
            <div class="flex justify-end gap-6 mt-2">
              <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
              <img 
                class="w-5 h-5" 
                src="images/delete-recycle-bin-trash-can-svgrepo-com.svg"
                alt="none"
                onclick = {()=> deleteItem(item.properties.id)}
              >
              <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
              <img 
                class="w-5 h-5" 
                src="images/edit-3-svgrepo-com.svg"
                alt="none"
                onclick = {()=> selectItemToEdit(item.properties.id)}
              >
              <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
              <img 
                class="w-5 h-5 my-handle" 
                src="images/drag-indicator-svgrepo-com.svg"
                alt="none"
              >

            </div>
          </div>
        </div>

        <!--div class="relative w-full my-handle">
          <div class="max-w[95%]">
            {#if typeof item.properties.disp === 'object'}
              {#if item.properties.disp.tax}
                <div class="flex flex-wrap w-full">
                  <span class="pr-1 font-semibold">{item.properties.disp.tax.hun}</span>
                  <span class="italic ">({item.properties.disp.tax.ltn})</span>        
                </div>
              {/if}
              {#if item.properties.disp.atr}
              <div>{item.properties.disp.atr}</div>
              {/if}
              {:else}
              <span class="font-semibold">{item.properties.disp}</span>
            {/if}
            <img 
              class="absolute w-5 h-5 right-2 bottom-1" 
              src="images/down-arrow-backup-2-svgrepo-com.svg"
              alt="none"
              onclick = {()=> showTaxonEditor = false}
            >
          </div>
        </div-->
      </li>    
    {/each}
  </ul>
</div>

</Modal>