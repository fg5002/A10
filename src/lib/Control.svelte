<script>
  import { onMount, getContext } from 'svelte'
  import L from 'leaflet';

  let {position, children} = $props();

	let control = $state();
  let controlContainer = $state();

  const map = getContext('map');

  $effect(()=> {
    control && control.setPosition(position);
  })

  onMount(()=>{
    if (map()){
      control = L.control();
      control.onAdd = () => controlContainer
      control.addTo(map());

      return ()=> {
        control?.remove();
        control = undefined;
      };
    }
  })

</script>

<div  class="flex flex-col gap-2" bind:this={controlContainer}>
  {#if control}
    {@render children?.()}
  {/if}
</div>