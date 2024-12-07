<script> 
  import Modal from "$lib/Modal.svelte";
	
  let {
		showInput = $bindable()
	} = $props();

	let element;

	$effect(()=> showInput && element.focus());

</script>

<Modal
	bind:showModal = {showInput}
	backdropClasses = "items-start justify-start pl-4 pt-4"
	modalClasses = "w-1/2 bg-yellow-500 p-2 items-center justify-center"
>
	<input
		class="w-full px-2 py-1"
		type="text"
		placeholder="Coordinate"
		bind:this={element}
	>
</Modal>