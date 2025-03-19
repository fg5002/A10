<script>
  let { disp } = $props();
</script>


  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div tabindex="0" class="p-0 collapse max-w-1/3 h-auto bg-yellow-200 text-black rounded sm: text-[1.1rem]">
    <div class="w-auto p-2 min-h-8 collapse-title">
      {#if typeof disp === 'object'}
        {#if disp.tax}
          <div>
            <div class="font-bold">{disp.tax.hun}</div>
            <div class="italic ">{disp.tax.ltn}</div>        
          </div>
        {/if}
        {#if disp.atr}
          <div>{disp.atr}</div>
        {/if}
      {:else}
        <div>{disp}</div>
      {/if}
    </div>
    <div class="p-0 collapse-content max-w-1/2">
      <span>Alma</span>
    </div>
  </div>
