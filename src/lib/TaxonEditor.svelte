<script> 
  import Modal from "$lib/Modal.svelte";
  import {currData3, attributes} from "$lib/store";
  import {birds} from "$lib/taxon";
  import Input from "$lib/Input.svelte";
	
  let {
		showTaxonEditor = $bindable()
	} = $props();

  
	let element;
  let editorType = $state("Tax");
  let showCalendar = $state(false);
  let searchText = $state('');
  let searchItems = $state([]);
  let selectedItem = $state();

  let showInput = $state(false);
  
  let labels = ["Tax", "Props", "Files", "Refs", "Obs" ];
  
  $effect(()=> showTaxonEditor && element.focus());

  $effect(() => element && labels.includes(editorType) && element.focus());

  $effect(() => findItem());

  const findItem = ()=> {

    switch (editorType) {
      case 'Tax':
        if(searchText.length < 3 ) {
          searchItems = [];
        }else{

          searchItems = [
            ...birds.filter(f=> f.abr.includes(searchText) === true),
            ...birds.filter(f=> (f.hun.toLowerCase().includes(searchText) === true || 
              f.ltn.toLowerCase().includes(searchText) === true) && 
              f.abr.includes(searchText) === false)
              .sort((a, b)=> a['hun'].localeCompare(b['hun'], 'hu'))
          ]
        }      
        break;
        
      case 'Props':
        if(searchText.length < 1 ) {
          searchItems = [];
        }else{
          searchItems = [
            ...attributes.filter(f=> f.abr.split(',').indexOf(searchText) > -1),
            ...attributes.filter(f=> f.nam.includes(searchText) === true && 
              f.abr.split(',').indexOf(searchText) === -1)
              .sort((a, b)=> a['nam'].localeCompare(b['nam'], 'hu'))
          ]
        }
        break;
    
      default:
        break;
    }
  }

  const selectItem = (item)=>{
    let res = item;
    switch (editorType) {
      case 'Tax':
        res.typ = 1;
        $currData3 = $currData3.filter(f => f.typ != 1);
        editorType = 'Props';
        break;
      case 'Props':
        res.typ = 2;
        if(item.rep != null) showInput = true
        $currData3 = $currData3.filter(f => !(f.id === item.id && item.typ === 2));
        break;
        
      default:
        break;
    }
    //res.id = Math.random().toString(36).substring(2, 10); // add id for currdata
    $currData3 = [...$currData3, res];
    $currData3.sort((a,b)=> (a.typ - b.typ || a.ord - b.ord || a.value - b.value));
    searchText = "";
    element.focus();
  }

  const deleteItem = (e)=> {
    e.preventDefault();
    $currData3 = $currData3.filter(f=> !(f.typ === parseInt(e.target.dataset.typ) && f.id === parseInt(e.target.dataset.id)));
  };

  const inputKeyDown = (e)=> {
    if(e.key === 'Enter') {
      e.preventDefault()
      searchText ? selectItem(searchItems[0]) : console.log('Submit');
    }
  }
  
</script>

<Modal
	bind:showModal = {showTaxonEditor}
	backdropClasses = "items-start justify-start"
	modalClasses = "flex-col h-1/2 w-full bg-yellow-500 p-2 gap-2 m-2 text-xl rounded-sm"
  idClass = "taxoneditor"
>
  <div class="flex items-center justify-start border-2 divide-x-2 rounded-sm shadow-xl divide-slate-400 w-min border-slate-400">
    {#each labels as nam}
      <label class="flex font-bold px-2 py-1 justify-center items-center
        {nam === editorType ? 'bg-lime-400' : 'bg-yellow-200'}"
      >
        <input
          style = "display:none" 
          type = "radio" 
          name = "editorType" 
          value = {nam}
          onchange = {()=> element.focus()}
          bind:group = {editorType}
        />
        {nam}
      </label>
    {/each} 
  </div>
    
  <input
    class="w-full px-2 py-1 bg-yellow-300 border-2 outline-none border-slate-400"
    type = "text"
    placeholder = "search..."
    onkeydown= {inputKeyDown}
    bind:value = {searchText}
    bind:this = {element}
  >
  
  <div class="h-full overflow-y-auto ">

    {#if searchItems.length > 0}

      <div class="flex flex-col divide-y-2 divide-yellow-500">
        {#each searchItems as item, i (item.id)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div 
            class="flex flex-wrap px-2 py-1 shadow bg-lime-100"
            onclick = {()=> selectItem(item)}
          >
            {#if editorType === 'Tax'}
              <span class="mr-2 font-bold">{item.hun}</span>
              <span class="italic">({item.ltn})</span>
            {:else}  
              <span class="font-bold">{item.nam}</span>            
              <span class="italic">({item.abr})</span>            
            {/if}

          </div>
        {/each}
      </div>
  
    {:else}

      {#snippet dailyItem(typ, id, value)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div data-typ = {typ} data-id = {id} class="px-2 py-1 bg-yellow-100 rounded shadow select-none" oncontextmenu = {deleteItem}>
          {value}
        </div>
      {/snippet}

      <div class="flex flex-wrap gap-2">
        {#each $currData3 as item}
          {#if item.typ === 1}
            {@render dailyItem(item.typ, item.id, `${item.hun} (${item.ltn})`)}
          {:else if item.typ === 2}
            {@render dailyItem(item.typ, item.id, item.rep ? item.rep.replace('*', item.value) : item.nam)}
          {:else}    
            {@render dailyItem(item.typ, item.id, item.value)}
          {/if}
        {/each}

      </div>
      
    {/if}

  </div>

</Modal>


<Input 
  bind:showInput
/>

