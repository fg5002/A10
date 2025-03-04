<script> 
  import Modal from "$lib/Modal.svelte";
	import SveltyPicker from 'svelty-picker';
	
  let {
		showInput = $bindable(),
		backdropClasses,
		modalClasses,
		idClass,
		item,
		onCloseAttrEditor,
		onSubmitAttrEditor,
	} = $props();

	let textValue = $state();
	let inputElement = $state();

	$effect(()=> {
		textValue = item && item.value;
	});

	$effect(()=> {
		if(item && item.typ === "time" && item.value === "") {
			textValue = new Date().toTimeString().substring(0, 5);
		}
	});
	
	$effect(()=> showInput && "text,tel,note".includes(item.typ) && inputElement.focus());
	
	const selectItem = (e)=>{
		textValue = e;
		submit();
	}

	const keyDown = (e)=> {
		if(e.key === 'Enter') {
			submit();
		}
	}

	const submit = ()=> {
		onSubmitAttrEditor(textValue);
		textValue = "";
		showInput = false;
	}
	
</script>

<Modal
	bind:showModal = {showInput}
	backdropClasses = "items-center"
	modalClasses = "mt-[50px] h-fit w-fit flex flex-col border-[1px] border-slate-400 shadow-xl
		rounded-sm divide-y-1 divide-slate-400 bg-red-400"
	idClass = 'numandtextinput'
	onClose = {onCloseAttrEditor}
>

		<div class="flex items-center justify-between p-2 text-lg font-bold bg-lime-300 sm:text-xl">
			<div class="w-fit">{item.nam}</div>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img 
				class="w-5 h-5" src="images/close-small-svgrepo-com.svg"
				alt="none"
				onclick = {()=> showInput = false}
			>
		</div>
		
		{#if item.typ === "time" || item.typ === "date"}

			<SveltyPicker
				mode = {item.typ === "time" ? "time" : "date"}
				format = {item.typ === "time" ? "hh.ii" : "yyyy-mm-dd"} 
				pickerOnly = true
				autocommit = {item.typ === "time" ? false : true}
				on:input = {submit}
				on:cancel = {()=> showInput = false}
				bind:value = {textValue}
			/>

		{:else if item.typ === 'tel' || item.typ === 'text'}

			<input
				class="px-2 py-1 bg-yellow-300 outline-none lg:cursor-default border-[1px] border-slate-400 rounded-b-sm 
				{item.typ === 'tel' ? 'w-40' : 'w-80'}"
				type= {item.typ}
				onkeydown= {keyDown}
				bind:value = {textValue}
				bind:this={inputElement}
			/>
			
		{:else if item.typ === 'note'}

			<textarea
				class=" w-80 p-2 bg-yellow-300 outline-none resize-none border-[1px] border-slate-400 rounded-b-sm"
				rows="8"
				onkeydown= {keyDown}
				bind:value = {textValue}
				bind:this = {inputElement}
			></textarea>

		{:else}

			<ul class="max-h-80 w-full divide-y-[1px] divide-slate-400 overflow-y-auto border-[1px] border-slate-400">
				{#each item.typ.split(', ') as value}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<li 
						class="min-w-1/3 px-2 py-1 select-none {value === item.value ? 'bg-yellow-300' : 'bg-yellow-100'}"
						onclick={()=> selectItem(value)}
					>
						{value}
					</li>
				{/each}
			</ul>
	
		{/if}

			
</Modal>