<script>
  import ModalNew from "$lib/Modal_new.svelte";
  import Modal from "./Modal.svelte";

  let {
    modalID
  } = $props();

</script>

<ModalNew
  modalID = {modalID}
  modalClasses = "h-full w-full p-0 bg-yellow-100"
>
  <div class="flex items-center justify-center h-full">
    <div class="flex gap-3 carousel">

      <div class="w-full carousel-item">
        <img
          src="birds/229.jpg"
          class="w-full"
          alt="Tailwind CSS Carousel component" />
      </div>
      <div class="w-full carousel-item">
        <img
          src="birds/230.jpg"
          class="w-full"
          alt="Tailwind CSS Carousel component" />
      </div>
      <div class="w-full carousel-item">
        <img
          src="birds/231.jpg"
          class="w-full"
          alt="Tailwind CSS Carousel component" />
      </div>
      <div class="w-full carousel-item">
        <img
          src="birds/232.jpg"
          class="w-full"
          alt="Tailwind CSS Carousel component" />
      </div>
    </div>
  </div>
</ModalNew>

