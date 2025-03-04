<script> 
  import Modal from "$lib/Modal.svelte";
	
  let {
		showInput = $bindable(),
		backdropClasses,
		modalClasses,
		idClass,
		value,
		onClose,
		onSubmit,
	} = $props();

	let text = 'Valid for the file input type only, the accept attribute defines which file types are selectable in a file upload control.\n\nSee the file input type.'

	let textValue = $state();

	let inputElement = $state();

	$effect(()=> {
		if(value) textValue = value;
	});
	$effect(()=> showInput && inputElement.focus());
	
	const keyDown = (e)=> {
		if(e.key === 'Enter') {
			submit();
		}
	}

	const submit = ()=> {
		onSubmit(textValue);
		textValue = "";
		showInput = false;
	}
	
</script>

<Modal
	bind:showModal = {showInput}
	backdropClasses = "flex items-end bg-white/30 justify-center"
	modalClasses = "flex flex-col w-full gap-1 max-h-2/5 items-start bg-lime-300 justify-center border-2 border-slate-400 shadow-xl 
	sm:mb-[calc(221px+48px)] p-2"
	inFly = {{y: 500, duration: 300}}
  outFly = {{y: 500, duration: 300}}
	idClass = 'inputX'
	{onClose}
>
	<label class="text-xl font-bold" for="ii">{item.nam}</label>
	{#if item.edi === "text" || item.edi === "tel"} 
		<input
			class="w-full p-2 text-xl bg-yellow-300 border-2 rounded-md outline-none border-slate-400"
			type={item.edi}
			bind:this={inputElement}
			bind:value={textValue}
			onkeydown = {keyDown}
		>
	{:else if item.edi === "note"}
		<textarea
			class="w-full p-2 text-xl bg-yellow-300 border-2 rounded-md outline-none textarea border-slate-400"
			rows="8"
			bind:this={inputElement}
			bind:value={textValue}
		>{text}</textarea>
		<button
			class="w-auto px-2 text-xl bg-yellow-300 border-2 rounded-md outline-none border-slate-400"
			onclick = {submit}
		>Submit</button>
	{/if}

</Modal>