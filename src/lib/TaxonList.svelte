<script>
  import ListSelect from "./ListSelect.svelte";

  let {
    showTaxonList = false,
    source = [],
    result = null
  } = $props();

  const dispatch = createEventDispatcher();


  const select = (i)=> {
    result = i;

    showTaxonList = false;
  }
  
  const selectFirst = (e)=> {
    result = e.detail;
    showTaxonList = false;
  }

</script>

<ListSelect
  bind:showSelectList ={showTaxonList}
  source = {source}
  minChars = {3}
  placeHolder = "Taxon"
  filterList = {(f,s)=> f.hun.toLowerCase().includes(s) === true || f.ltn.toLowerCase().includes(s) === true || f.abr.indexOf(s)>-1 && f.mon != null}
  sortListField = "hun"
  on:firstItemSelected = {selectFirst}
  on:outroEnd
  on:modalClose
>
  <div slot="item" class="px-2 pt-1 border-b border-slate-400" let:item on:pointerup|preventDefault={select(item)}>
    <span class="font-semibold">{item.hun}</span>
    <span class="italic">{item.ltn}</span>
    <span class="self-center text-red-500">{item.abr && `[${item.abr}]`}</span>
  </div>
</ListSelect>