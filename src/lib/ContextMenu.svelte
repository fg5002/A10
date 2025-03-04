<script>

  let {
    showMenu = $bindable(),
    pos
  } = $props();

  let menu = $state({ h: 0, y: 0 });
  let browser = $state({ h: 0, y: 0 })

  function rightClickContextMenu(e){
    e.preventDefault();
    //showMenu = true
    const parent = e.target.parentElement;
    browser = {
      w: parent.offsetWidth,
      h: parent.offsetHeight
    };
    /*pos = {
      x: e.clientX,
      y: e.clientY
    };*/
    // If bottom part of context menu will be displayed
    // after right-click, then change the position of the
    // context menu. This position is controlled by `top` and `left`
    // at inline style. 
    // Instead of context menu is displayed from top left of cursor position
    // when right-click occur, it will be displayed from bottom left.
    if (browser.h -  pos.y < menu.h) pos.y = pos.y - menu.h
    if (browser.w -  pos.x < menu.w) pos.x = pos.x - menu.w
  }

  function onPageClick(e){
      // To make context menu disappear when
      // mouse is clicked outside context menu
      showMenu = false;
  }

  $inspect('pos', pos)
  $inspect('browser', browser)

  function getContextMenuDimension(e){
    // This function will get context menu dimension
    // when navigation is shown => showMenu = true
    let height = e.offsetHeight;
    let width = e.offsetWidth;
    menu = {
      h: height,
      w: width
    }
  }


</script>

<svelte:window 
  oncontextmenu={rightClickContextMenu} 
  onclick={onPageClick} 
/>

{#if showMenu}
  <div 
    class="absolute w-[100px] rounded-md wrapper bg-cyan-400 z-3000"
    use:getContextMenuDimension 
    style="top:{pos.y}px; left:{pos.x}px"
  >
    <div class="content">
      <ul class="px-2 py-1 menu">
        <li class="item">
          <span>Alma</span>
        </li>
        <!--li class="relative flex justify-between item">
          <span>Körte</span>
          <ul class="absolute rounded-md w-[100px] bg-red-500 subMenu right-[-100px] top-[-20px] px-2 py-1">
            <li>Retek</li>
            <li>Bodza</li>
          </ul>
        </li-->
        <li class="item">
          <span>Szilva</span>
        </li>
        <li class="item">
          <span>Birs</span>
        </li>
      </ul>
    </div>
  </div>
{/if}
