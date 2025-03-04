  import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
  //import Sortable from 'sortablejs';
	//import {sortableItems} from '$lib/store.js';

  export const reorderItem = (arr, from, to)=> {
    let item = arr.splice(from, 1);
    arr.splice(to, 0, item[0]);

  }

  export const sortableAction = (node, options = {})=> {
    $effect(() => {
      let sortable = new Sortable(node, {
        animation: 150,
        ghostClass: 'blue-background-class',
        multiDrag: true,
        handle: '.my-handle',
        selectedClass: 'selected', // The class applied to the selected items
	      fallbackTolerance: 3, // So that we can select items on mobile
        onEnd(e) {
          console.log(e.oldIndex, e.newIndex);
          reorderItem($sortableItems, e.oldIndex, e.newIndex)
        }
      });
      return () => sortable?.destroy();
    });
  }
