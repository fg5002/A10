<script>
  import {fly} from 'svelte/transition';

  let {
    showModal = $bindable(),
    inFly = {x: -500, duration: 500},
    outFly = {x: -500, duration: 500},
    backdropClasses,
    modalClasses,
    children
  } = $props();

  const closeModal = (e)=>{
    if(e.target.classList.contains('close')){
      showModal = false;
    }
  }
  
</script>

{#if showModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="close fixed flex w-full h-full bg-transparent rounded-sm z-2000 {backdropClasses}"
    in:fly={inFly}
    out:fly= {outFly}
    onclick= {(e)=>closeModal(e)}
  >
    <div class="flex rounded-sm shadow-2xl {modalClasses}">
      {@render children?.()}
    </div>
  </div>
{/if}