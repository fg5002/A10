<script>
  import {fly, fade} from 'svelte/transition';

  let {
    modalID,
    backdropClasses,
    closeButton = true,
    modalClasses,
    inFly = { y: 300, duration: 300 },
    children
  } = $props();

</script>

<dialog id={modalID} class="w-full bg-transparent modal {backdropClasses}">
  <div class="flex flex-col modal-box {modalClasses}">
    {#if closeButton === true}  
      <form method="dialog">
        <button class="absolute font-bold btn btn-md btn-circle btn-ghost right-1 top-1">✕</button>
      </form>
    {/if}
    {@render children?.()}
  </div>
  {#if closeButton != true}
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  {/if}
</dialog>
