<script>
  import {fly, fade} from 'svelte/transition';

  let {
    showModal = $bindable(),
    backdropClasses,
    modalClasses,
    idClass,
    inFly = { y: 300, duration: 500 },
    onClose,
    children
  } = $props();

  const closeModal = (e)=>{
    if(e.target.classList.contains(idClass)){
      showModal = false;
    }
  }

  $effect(()=> showModal && onClose);
  
</script>

{#if showModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed flex flex-col h-full w-full md:w-1/2 md:mx-auto xl:w-2/3 z-2000 bg-slate-100/70 {backdropClasses} {idClass}"
    in:fade
    out:fade
    onclick = {closeModal}
  >
    <div 
      class="flex flex-col max-w-full max-h-full shadow-2xl bg-tr xl:text-sm md:text-lg sm:text-xl xl:w-2/3 {modalClasses} {idClass}"
    >
      {@render children?.()}
    </div>
  </div>
{/if}