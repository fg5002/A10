<script>

  let {disp} = $props();

</script>


<div class="flex justify-between w-full">
  <div class="max-w[95%]">
    {#if typeof disp === 'object'}
      {#if disp.tax}
        <div class="flex flex-wrap w-full">
          <span class="pr-1 font-semibold">{disp.tax.hun}</span>
          <span class="italic ">({disp.tax.ltn})</span>        
        </div>
      {/if}
      {#if disp.atr}
        <div>{disp.atr}</div>
      {/if}
    {:else}
      <span class="font-semibold">{disp}</span>
    {/if}
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <img 
    class="w-5 h-5 mt-1 mr-2 my-handle" 
    src="images/down-arrow-backup-2-svgrepo-com.svg"
    alt="none"
    onclick = {()=> console.log('ok')}
  >
</div>