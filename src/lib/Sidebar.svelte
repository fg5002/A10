<script>
  import Modal from "$lib/Modal.svelte";

  let { showSideBar = $bindable() } = $props();

  let element2;

  $effect(()=> showSideBar && element2.focus());

</script>

<Modal
  bind:showModal = {showSideBar}
  backdropClasses = "items-start justify-start"
  modalClasses = "h-full w-1/2 bg-yellow-300 p-2 items-start justify-center border-2 rounded-sm border-slate-400"
  idClass = 'sidebar'
>
  <input
    class="w-full px-2 py-1"
    type="text"
    placeholder="Site"
    bind:this={element2}
  >
</Modal>

