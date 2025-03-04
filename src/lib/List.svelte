<script>

let {
  showContextMenu = $bindable(),
	} = $props();

let contextMenu = $state();
let shareMenu =  $state();

  window.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.offsetX, y = e.offsetY;
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let cmWidth = contextMenu.width;
    console.log(cmWidth)
    let cmHeight = contextMenu.innerHeight;

    if(x > (winWidth - cmWidth - shareMenu.offsetWidth)) {
        shareMenu.style.left = "-200px";
    } else {
        shareMenu.style.left = "";
        shareMenu.style.right = "-200px";
    }

    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;
    
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
  });

  //document.addEventListener("click", () => contextMenu.style.visibility = "hidden");
  $effect(() => {
    /*if (showContextMenu) {
      document.addEventListener("click", closeContextMenu);
    } else {
      document.removeEventListener("click", closeContextMenu);
    }*/
  });
</script>

{#if showContextMenu}

  <div class="wrapper w-[200px] h-[300px]" bind:this = {contextMenu}>
    <div class="content">
      <ul class="menu">
        <li class="item">
          <i class="uil uil-eye"></i>
          <span>Preview</span>
        </li>
        <li class="item share">
          <div>
            <i class="uil uil-share"></i>
            <span>Share</span>
          </div>
          <i class="uil uil-angle-right"></i>
          <ul class="share-menu" bind:this={shareMenu}>
            <li class="item">
              <i class="uil uil-twitter-alt"></i>
              <span>Twitter</span>
            </li>
            <li class="item">
              <i class="uil uil-instagram"></i>
              <span>Instagram</span>
            </li>
            <li class="item">
              <i class="uil uil-dribbble"></i>
              <span>Dribble</span>
            </li>
            <li class="item">
              <i class="uil uil-telegram-alt"></i>
              <span>Telegram</span>
            </li>
          </ul>
        </li>
        <li class="item">
          <i class="uil uil-link-alt"></i>
          <span>Get Link</span>
        </li>
        <li class="item">
          <i class="uil uil-edit"></i>
          <span>Rename</span>
        </li>
        <li class="item">
          <i class="uil uil-trash-alt"></i>
          <span>Delete</span>
        </li>
      </ul>
      <div class="setting">
        <li class="item">
          <i class="uil uil-setting"></i>
          <span>Settings</span>
        </li>
      </div>
    </div>
  </div>
{/if}