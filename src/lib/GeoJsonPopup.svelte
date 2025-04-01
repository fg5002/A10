<script>
  import {currData, dailyData, storedData} from '$lib/store';
  import {currDataItemFromStoredData, deleteDailyDataItem} from '$lib/editor.svelte.js';
  let {
    data,
    onEdit,
    openTaxonEditor
  } = $props();

  const eedit = (e, d)=> {
    onEdit(d);
    e.target.blur();
  }

  const deleteShape = (e, d)=> {
    e.target.blur();
    deleteDailyDataItem($dailyData, d);
  }

  const selectItemToEdit = (e, id)=> {
    e.target.blur();
    let res = currDataItemFromStoredData($storedData,parseInt(id));
    $currData = res;
    openTaxonEditor();
  }


</script>

  <div class="min-w-[50px] w-auto h-auto p-2 text-black bg-yellow-200 rounded max-w-1/2 text-lg sm:text-xl">
    {#if data.disp.atr}
      <div class="font-bold">{data.disp.tax && data.disp.tax.hun}</div>
      <div class="italic ">{data.disp.tax && data.disp.tax.ltn}</div>        
      <div>{data.disp.atr}</div>
    {:else}
      <div>{data.disp}</div>
    {/if}

    {#if data.disp.no}
      <div class="inline-flex w-full text-lg sm:text-xl dropdown dropdown-bottom">
        <button 
          class="text-white badge badge-lg bg-lime-600"
          tabindex="0"
        >
          {data.disp.no}   
        </button>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div
          class="flex flex-col items-start p-0 shadow-sm menu-md dropdown-content bg-base-100 z-1 border-[1px] 
          border-slate-400 divide-y-[1px] divide-slate-400"
          tabindex="0"
        >
          <button class="px-2 py-1 m-0" onclick = {(e)=> selectItemToEdit(e, data.id)}>Edit data</button>
          <button class="px-2 py-1 m-0" onclick = {(e)=> eedit(e, data.id)}>Edit geo</button>
          <button class="px-2 py-1 m-0" onclick = {(e)=> deleteShape(e, data.id)}>Delete</button>
        </div>
      </div>
    {/if}
  </div>
