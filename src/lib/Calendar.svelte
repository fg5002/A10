<script>
  import Modal from "./Modal.svelte";
  import SveltyPicker, {config} from 'svelty-picker';

  let {
    showCalendar = $bindable(false),
    calDate = $bindable(new Date().toISOString().split('T')[0])
  } = $props();

  config.todayBtn = false;
  config.clearBtn = false;
  config.clearToggle = false;

  const toggleCalendar = ()=> showCalendar=!showCalendar;

</script>

<Modal 
  bind:showModal={showCalendar}
  backdropClasses = "items-start justify-center z-3000"
  modalClasses = "w-auto h-auto mt-16"
  idClass = "calendar"
>
  <div class="border rounded-sm shadow-xl border-slate-500">
    <SveltyPicker
      inputClasses="p-2 w-auto border-2 border-gray-700 rounded-md"
      format = "yyyy-mm-dd"
      pickerOnly = true
      on:input = {toggleCalendar}
      bind:value = {calDate}
    />
  </div>
</Modal>