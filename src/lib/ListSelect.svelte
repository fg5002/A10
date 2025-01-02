<script>
  import Modal from "./Modal.svelte";
  
  let {
    showSelectList = false,
    source = [],
    minChars = 1,
    filterList = (f,s)=> f["nam"].toLowerCase().includes(s) === true,
    sortListField = "nam",

    searchText = ""
  } = $props();
  
  let items = $state([]);
  
  const updateList = ()=> {
    if(searchText.length < minChars ) {
      items = [];
    }else{
      items = searchText ? 
      source
        .filter(f=> filterList(f, searchText))
        .sort((a, b)=> a[sortListField].localeCompare(b[sortListField], 'hu')) : 
      [];
    }
  }

  const inputKeyDown = (e)=> {
    if(e.key == 'Enter' && items.length>0){
      dispatch('firstItemSelected', items[0]);
      searchText = "";
    }
  }

</script>


<div class="flex flex-col w-full border rounded-sm bg-lime-200 border-slate-400">
  
  <div class="flex flex-col w-full h-full overflow-y-auto snap-y snap-proximity">
    {#if searchText != "" && items.length > 0}      
      {#each items as item, i}
        {@render children?.()}
      {/each}
    {/if}
  </div>
  
</div>
    