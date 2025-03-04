<script>
	import { isObject } from "@turf/helpers";

  let { data } = $props();
</script>

<div class="max-w-[200px] p-2 bg-yellow-200 text-black rounded sm: text-[1.1rem]">
  {#each data as item}
    {#if typeof item === 'object'}
      <div>
        <div class="font-bold">{item.hun}</div>
        <div class="italic ">{item.ltn}</div>        
      </div>
    {:else}
      <div>{item}</div>
    {/if}
  {/each}
</div>