<script>
  import Modal from "./Modal.svelte";
  import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

  //TODO accordion
  //TODO hide dummy data

  let {
    showDailyList = $bindable(),
    dataList,
  } = $props();

	const scroll = node => {
		if (dataList.features.length > 0)
			node.scrollIntoView()
	}

  const reorderItem = (arr, from, to)=> {
    let item = arr.splice(from, 1);
    arr.splice(to, 0, item[0]);
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
          console.log(e.oldIndex, e.newIndex);
          reorderItem(dataList.features, e.oldIndex, e.newIndex)
        }
      });
      return () => sortable?.destroy();
    });
  }

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
      <li class="flex items-start justify-start px-2 py-1 text-lg select-none bg-violet-100" use:scroll>
        <div class="relative w-full">
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
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <img 
              class="absolute w-5 h-5 right-2 bottom-1 my-handle" 
              src="images/svgviewer-output.svg"
              alt="none"
              onclick = {()=> showTaxonEditor = false}
            >
          </div>
        </div>
      </li>    
    {/each}
  </ul>
</div>

</Modal>