<script>
  import { createEventDispatcher } from "svelte";
  import Modal from "$lib/Modal.svelte";
  import { sortableItems } from "$lib/store";
  import { flip } from "svelte/animate";

  let { showDailyList = $bindable() } = $props();
  const dispatch = createEventDispatcher();

  let container = $state();
  let draggedItem = $state(null);
  let overItem = $state(null);

  let showContextMenu = $state(false);
  let contextMenuPosition = $state({ x: 0, y: 0 });
  let activeItem = $state(null);

  // --- Handle Sorting ---
  function handleDragStart(event, item) {
    draggedItem = item;
    event.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(event, item) {
    event.preventDefault();
    overItem = item;
  }

  function handleDrop(event) {
    event.preventDefault();
    if (draggedItem && overItem && draggedItem !== overItem) {
      const targetIndex = $sortableItems.findIndex((i) => i.id === overItem.id);
      $sortableItems = $sortableItems.filter((i) => i.id !== draggedItem.id);
      $sortableItems.splice(targetIndex, 0, draggedItem);
    }
    draggedItem = null;
    overItem = null;
  }

  // --- Handle Context Menu ---
  function openContextMenu(event, item) {
    event.preventDefault();
    activeItem = item;
    showContextMenu = true;
    contextMenuPosition = { x: event.clientX, y: event.clientY };
  }

  function closeContextMenu() {
    showContextMenu = false;
    activeItem = null;
  }

  function contextMenuAction(action) {
    console.log(`Action: ${action} on ${activeItem.nam}`);
    closeContextMenu();
  }
</script>

<Modal
  bind:showModal={showDailyList}
  modalClass="daily-list"
  backdropClasses="items-start justify-center z-2000"
  modalClasses="w-full h-3/4 flex-col mt-1.5 md:w-2/3 xl:w-1/3"
  idClass="dailylist"
>
  <div bind:this={container} class="px-2 overflow-y-auto border border-gray-300 divide-y-2 rounded bg-lime-200 divide-slate-400">
    
    {#each $sortableItems as item (item.id)}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="lis flex justify-between items-center select-none cursor-pointer {draggedItem === item ? 'bg-yellow-300' : 'bg-lime-200'}"
        data-id={item.id}
        animate:flip={{ duration: 300 }}
        draggable="true"
        ondragstart={(e) => handleDragStart(e, item)}
        ondragover={(e) => handleDragOver(e, item)}
        ondrop={handleDrop}
        oncontextmenu={(e) => openContextMenu(e, item)}
      >
        <div class="h-full px-2 py-1 select-none lis" data-id={item.id}>{item.nam}</div>
        <button>
          <img src="images/flower-tulip-outline.svg" alt="No" class="w-auto h-6">
        </button>
      </div>
    {/each}
  </div>
</Modal>

<!-- Context Menu -->
{#if showContextMenu}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed bg-white border shadow-lg rounded-md p-2 z-[3000] flex flex-col"
    style="top: {contextMenuPosition.y}px; left: {contextMenuPosition.x}px"
    onclick={closeContextMenu}
  >
    <button class="p-2 text-sm hover:bg-gray-200" onclick={() => contextMenuAction('Edit')}>Edit</button>
    <button class="p-2 text-sm hover:bg-gray-200" onclick={() => contextMenuAction('Delete')}>Delete</button>
  </div>
{/if}
