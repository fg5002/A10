<script> 
  import Modal from "$lib/Modal.svelte";
	
  let {
		showInput = $bindable(),
		backdropClasses,
		modalClasses,
		idClass,
		type = 'tel'		
	} = $props();

	let element;

	$effect(()=> showInput && element.focus());

</script>

<Modal
	bind:showModal = {showInput}
	backdropClasses = "bg-slate-400 bg-opacity-70"
	modalClasses = "flex flex-col w-full max-h-1/3 items-start justify-start gap-2 mx-4 mt-16 border-2 border-slate-400"
	idClass = 'inputX'
>

	<div class="relative flex flex-col w-full h-full">

		<!--input
			class="w-full p-2 text-xl bg-yellow-300 outline-none border-slate-400 placeholder-slate-500"
			type={type}
			bind:this={element}
			placeholder = '< Alma >'
		-->

		<textarea
			class="w-full h-full p-2 text-xl bg-yellow-300 outline-none placeholder-slate-500"
			rows="8"
			type={type}
			bind:this={element}
			placeholder = '< Alma >'
		></textarea>
		<button class="absolute px-2 py-1 font-bold bg-orange-500 border-2 rounded-full opacity-45 right-2 bottom-2 border-slate-400">Ok</button>
	</div>
</Modal>