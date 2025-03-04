<script>
  import Modal from "./Modal.svelte";
  import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
  import { sortableItems } from '$lib/store.js';

  let {
    showDailyList = $bindable()
  } = $props();

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
          reorderItem($sortableItems, e.oldIndex, e.newIndex)
        }
      });
      return () => sortable?.destroy();
    });
  }

</script>

<Modal
  bind:showModal = {showDailyList} 
  idClass = "daily-list" 
  backdropClasses = "h-[100vh-50px] z-2000 items-start"
  modalClasses = "flex-col h-[80vh] w-full bg-transparent border-[1px] border-slate-500 divide-y divide-slate-400"
  inFly = {{x: 500, duration: 500}}
  outFly = {{x: 500, duration: 500}}
>

<div class="flex items-center justify-between px-2 py-1 text-lg font-bold bg-lime-300">
  Daily List
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <img 
    class="w-5 h-5" src="images/close-small-svgrepo-com.svg"
    alt="none"
    onclick = {()=> showDailyList = false}
  >
</div>
<div class="w-auto h-full overflow-y-scroll">
  <ul
    class="flex flex-col w-full h-full divide-y divide-slate-400"
    use:sortableAction
  >
    {#each $sortableItems as item, i (item.id)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <li class="flex items-start justify-start gap-4 px-2 py-1 select-none bg-violet-100">
        <button type="button" class="px-2 py-1 text-sm select-none my-handle">
            XXX
        </button>
        <span class="font-semibold">{item.nam}</span>
      </li>    
    {/each}
  </ul>
</div>

</Modal>