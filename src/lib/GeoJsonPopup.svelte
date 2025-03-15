<script>
  let { disp } = $props();
</script>

<div class="max-w-1/2 p-2 bg-yellow-200 text-black rounded sm: text-[1.1rem]">
  <!--span class="font-semibold">{disp.ord}</span-->
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