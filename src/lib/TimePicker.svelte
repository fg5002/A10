<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from "./Modal.svelte";
  import SveltyPicker, {config} from 'svelty-picker';


  let {
    showTimePicker = $bindable(false),
    time = $bindable(new Date().toISOString().split('T')[1].substring(1, 5)),
    onSubmit
  } = $props();




  //config.clearBtn = false;

  // TODO GMT+1 ???



  const submit = ()=> {
    onSubmit(time);
    showTimePicker = false;   
  }

</script>

<Modal 
  bind:showModal={showTimePicker}
  modalClass = "timepicker" 
  backdropClasses = "items-start justify-center z-3000"
  mainClasses = "w-auto h-auto mt-1.5"
>
  <SveltyPicker
    inputClasses="p-2 w-auto border-2 border-gray-700 rounded-md"
    mode = time
    format = "hh.ii"
    pickerOnly = true
    manualInput = true
    on:input = {submit}
    bind:value = {time}
  />
</Modal>