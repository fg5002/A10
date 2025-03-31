<script>
  //sanet.st@Mercurybooks
  import {currData} from '$lib/store';

  let {
    onSubmitTaxonEditor,
    onEditAttribute,
    onFocusInput
  } = $props();

  $effect(()=> $currData && onFocusInput());

  const editAttribute = (e, item)=> {
    onEditAttribute(item)
    e.target.blur();
  }

  const deleteAttribute = (e, key, item)=> {
    if(item.keep) return;
    $currData[key] = $currData[key].filter(f => f.id != item.id);
    onFocusInput();
    e.target.blur();
  }

  const keepAttribute = (e, key, item) => {
    const index = $currData[key].findIndex(f => f.id === item.id);
    $currData[key][index].keep = !$currData[key][index].keep;
    onFocusInput();
    e.target.blur();
  };

  const deleteAllAttributes = ()=> {
    Object.keys($currData).forEach(key=> $currData[key] = [])
  }

</script>

<div class="flex flex-col items-start h-full gap-1 overflow-y-auto text-l">
  {#each Object.keys($currData) as key}      
    {#if $currData[key].length > 0}
      <div class="flex flex-wrap gap-1">
        {#each $currData[key] as item}
          <div class="dropdown dropdown-bottom">
            <button 
              tabindex="0"
              class="badge text-xl border-[1px] h-auto border-slate-400 rounded-md text-left
              {item.keep ? 'bg-yellow-300 ' : 'bg-lime-300'}"
            >
              {#if key === 'tax'}
                {item.hun} ({item.ltn})
              {:else if key === 'atr'}
                {item.typ ? item.rep.replace('*', item.value) : item.nam}
              {:else if key === 'geo'}
                {item.type}: {item.id}
              {:else if key === 'aid'}
                Edited data id: {item.id}
              {:else}
                {item.nam}
              {/if}
            </button>

            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <div
              tabindex="0"
              class="w-auto flex flex-col items-start p-0 shadow-sm dropdown-content menu-md bg-base-100 z-1 border-[1px] 
              border-slate-400 divide-y-[1px] divide-slate-400"
            >
              {#if item.typ}
                <button class="px-2 py-1" onclick = {(e)=> editAttribute(e, item)}>Edit</button>
              {/if}
              {#if !item.keep}
                <button class="px-2 py-1" onclick = {(e)=> deleteAttribute(e, key, item)}>Delete</button>
              {/if} 
              {#if key === 'geo'}
                <button class="w-auto px-2 py-1 whitespace-nowrap" onclick = {(e)=> updateGeo(e, $currData.geo[0])}>Update geo</button>
              {/if}
              <button class="px-2 py-1" onclick = {(e)=> keepAttribute(e, key, item)}>Keep</button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/each}
</div>
<div class="flex items-center justify-between gap-4">
  {#if $currData.atr.length > 0 && $currData.obs.length > 0 }
    <button
      class="px-2 border-[1px] border-slate-400 rounded-md text-lg bg-orange-400"
      onclick = {onSubmitTaxonEditor}
    >Submit</button>
  {/if}
  <button
    class="px-2 border-[1px] border-slate-400 rounded-md text-lg text-white bg-lime-600"
    onclick = {deleteAllAttributes}
  >Clear all</button>
</div>