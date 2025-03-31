<script>
  import ModalNew from "$lib/Modal_new.svelte";
  import SveltyPicker, {config} from 'svelty-picker';

  let {
    modalID,
    calDate = $bindable(new Date().toISOString().split('T')[0])
  } = $props();

  config.todayBtn = false;
  config.clearBtn = false;
  config.clearToggle = false;

</script>

<ModalNew
  modalID = {modalID}
  backdropClasses = "items-start"
  modalClasses = "w-auto p-0 mt-8"
  closeButton = false
>
  <div class="border rounded-sm shadow-xl border-slate-500">
    <SveltyPicker
      inputClasses="p-2 w-auto border-2 border-gray-700 rounded-md"
      format = "yyyy-mm-dd"
      pickerOnly = true
      bind:value = {calDate}
    />
  </div>
</ModalNew>