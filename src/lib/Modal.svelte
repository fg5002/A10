<script>
  import {fly, fade} from 'svelte/transition';

  let {
    showModal = $bindable(),
    //inFly = {x: -500, duration: 500},
    //outFly = {x: -500, duration: 500},
    inFly = {fade, duration: 500},
    outFly = {fade, duration: 500},
    backdropClasses,
    modalClasses,
    idClass,
    children
  } = $props();

  const closeModal = (e)=>{
    if(e.target.classList.contains(idClass)){
      showModal = false;
    }
  }

  //TODO customise inFly, outFly
  
</script>

{#if showModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed flex w-full h-full items-start justify-center bg-transparent rounded-sm z-2000 {backdropClasses} {idClass}"
    in:fly={inFly}
    out:fly= {outFly}
    onclick= {(e)=> closeModal(e)}
  >
    <div class="flex border-2 border-slate-400 rounded-md shadow-2xl {modalClasses} {idClass}">
      {@render children?.()}
    </div>
  </div>
{/if}