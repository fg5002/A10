<script>
  import ModalNew from "$lib/Modal_new.svelte";
  import SveltyPicker, {config} from 'svelty-picker';

  let {
    modalID,
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

<ModalNew
  modalID = {modalID}
  backdropClasses = "items-start"
  modalClasses = "w-auto p-0 mt-8"
  closeButton = false
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
</ModalNew>