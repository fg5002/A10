<script> 
  import Modal from "$lib/Modal.svelte";
  import {attributes, observers} from "$lib/attributes.js"
  import {birds} from "$lib/taxon";
  import SveltyPicker, {config} from 'svelty-picker';
  import {currData, storedData, currDate, dailyData} from "$lib/store";

  //TODO update data
  //TODO hide dummy data
	
  let {
		showTaxonEditor = $bindable(),
    onUpdateGeo
	} = $props();

	let element = $state();
	let modalElement = $state();
  let inputElement = $state();
  let attributeInputElement = $state();
  let attributeInputText = $state();
  let editorType = $state("Tax");
  let searchText = $state('');
  let searchItems = $state([]);
  let selectedAttribute = $state(null);
  let dateTimeValue = $state();

  let labels = ["Tax", "Attrs", "Files", "Obs" ];

  config.todayBtn = true;

  $effect(()=> showTaxonEditor && element &&  element.focus());

  $effect(() => element && labels.includes(editorType) && element.focus());

  $effect(() => findItem());

  $effect(() => inputElement && inputElement.focus());

  $effect(()=> attributeInputElement && attributeInputElement.focus());

  const editorTypeChange = ()=> {
    searchText = "";
    element.focus();
  }

  const findItem = ()=> {

    switch (editorType) {
      case 'Tax':
        if(searchText.length < 3 ) {
          searchItems = [];
        }else{

          searchItems = [
            ...birds.filter(f=> f.abr.includes(searchText) === true),
            ...birds.filter(f=> (f.hun.toLowerCase().includes(searchText) === true || 
              f.ltn.toLowerCase().includes(searchText) === true) && 
              f.abr.includes(searchText) === false)
              .sort((a, b)=> a['hun'].localeCompare(b['hun'], 'hu'))
          ]
        }      
        break;
        
      case 'Attrs':
        if(searchText.length < 1 ) {
          searchItems = [];
        }else{
          searchItems = [
            ...attributes.filter(f=> f.abr.split(', ').indexOf(searchText) > -1),
            ...attributes.filter(f=> f.nam.includes(searchText) === true && 
              f.abr.split(', ').indexOf(searchText) === -1)
              .sort((a, b)=> a['nam'].localeCompare(b['nam'], 'hu'))
          ]
        }
        break;

      case 'Obs':
        if(searchText.length < 2 ) {
          searchItems = [];
        }else{
          searchItems = observers
            .filter(f=> f.nam.toLowerCase().includes(searchText) === true)
            .sort((a, b)=> a['nam'].localeCompare(b['nam'], 'hu'))
        }      
        break;        
    
      default:
        break;
    }
  }

  const selectItem = (item)=>{
    if(item) {
      let res = item;
      res.keep = false;
      switch (editorType) {
        case 'Tax':
          addNewCurrDataItem('tax', res);
          editorType = 'Attrs';
          break;
        case 'Attrs':
          if(item.typ) {
            res.value = '';
            editAttribute(res)
            searchText = "";
          }else{
            addNewCurrDataItem('atr', res);      
          }
          break;
        case 'Files':
          addNewFileName();
          break;
        case 'Obs':
          res.keep = true;
          addNewCurrDataItem('obs', res);
          break;          
        default:
          break;
      }
    }
  }

  const addRecordingTime = ()=> {
    let item = attributes.filter(f=> f.nam === "rögzítve")[0];
    item.keep = false;
    item.value = new Date().toTimeString().substring(0, 5);
    addNewCurrDataItem('atr', item);
  }

  const addNewCurrDataItem = (key, item)=> {
    deleteCurrDataItem(key, item);
    $currData[key] =  [...$currData[key], item];
    $currData[key].length > 0 && $currData[key].sort((a,b)=> a.ord - b.ord || a.nam.localeCompare(b.nam, 'hu'));
    searchText = "";
    clearMainInput();
    element.focus();
  }

  const deleteCurrDataItem = (key, item)=> {
    if(item.keep) return;
    $currData[key] = $currData[key].filter(f => f.id != item.id);
    element.focus();
  }

  const addNewFileName = ()=> {
    let res = searchText.match(/^[\d]{1,3}$/);
    let fn = res ? 
      `${$currDate.replace(/-/g,'')}-${res[0].padStart(3, "0")}.jpg` :
      searchText.match(/[^\.]+\.[\D]{3,4}/) ? searchText : null;
    if(fn) {
      $currData.fil = $currData.fil.filter(f => f.nam != fn);
      let obj = {id: Math.floor(Math.random() * 100000000), nam: fn, keep: false}
      addNewCurrDataItem('fil', obj);
    }
  }

  const changeKeep = (e, key, item) => {
    e.preventDefault();
    const index = $currData[key].findIndex(f => f.id === item.id);
    $currData[key][index].keep = !$currData[key][index].keep;
    element.focus();
  };

  const mainInputKeyDown = (e)=> {
    if(e.key === 'Enter') {
      switch (editorType) {
        case 'Files':
          addNewFileName()
          break;
        case 'Tax':
        case 'Obs':
          selectItem(searchItems[0])
          break;
        case 'Attrs':
          selectedAttribute ? submitAttribute() : selectItem(searchItems[0]);
          break;
        default:
          break;
      }
      e.preventDefault();
    }
  }
    
  const attributeInputKeyDown = (e)=> {
    if(e.key === 'Enter') {
      e.preventDefault();
      selectedAttribute.value = attributeInputText;
      addNewCurrDataItem('atr', selectedAttribute);
    }
  }

  const selectAttributeDateTimeList = (txt)=> {
    selectedAttribute.value = txt;
    addNewCurrDataItem('atr', selectedAttribute);
  }

  const editAttribute = (item)=> {
    if(item.keep) return;
    editorType = 'Attrs';
    let index = $currData.atr.findIndex(f => f.id === item.id)
    selectedAttribute = index >-1 ? $currData.atr[index] : item;

    switch (selectedAttribute.typ) {
      case "text":
      case "tel":
        element.type = selectedAttribute.typ;
        searchText = selectedAttribute.value;
        element.focus();    
        break;
      case "note":
        element.disabled = true;
        attributeInputText = selectedAttribute.value;
      case "date":
      case "time":
        element.disabled = true;
        dateTimeValue = selectedAttribute.value ? 
          selectedAttribute.value : 
          selectedAttribute.typ === 'time' ? 
            new Date().toTimeString().substring(0, 5) : 
            $currDate;
            element.focus();
        break;
      case "lis":
        element.disabled = true;
        element.focus();
        break;
      default:
        break;
    }
  }

  const submitAttribute = ()=> {
    switch (selectedAttribute.typ) {
    case "text":
    case "tel":
      selectedAttribute.value = searchText;      
      break;
    case "note":
      selectedAttribute.value = attributeInputText;
      break;
    default:
      break;
    }
    addNewCurrDataItem('atr', selectedAttribute);
  }

  const submitTaxonEditor = ()=> {
    
    $currData.aid = [{id: Math.floor(Math.random() * 100000000), keep: false}];

    if($currData.atr.filter(f=> f.nam === 'rögzítve').length === 0){
      addRecordingTime();
    }
  
    let disp = currDataToFeature($currData);
    console.log('disp', JSON.stringify(disp));
    $dailyData.features = [...$dailyData.features, disp];
  
    let data = currDataToStoredData($currData)
    console.log('data', JSON.stringify(data))
    $storedData = [...$storedData, data];

    showTaxonEditor = false;
    editorType = 'Tax';
    currDataClean();

  }

  // ord, id, dat, tax, atk, atv, fil, obs, typ, cor

  const currDataFromStoredData = (id)=> {
    let reData = $storedData.filter(f=> f[1] === id)[0];
    let reloadedData = {};
    reloadedData.tax = reData[3] ? birds.filter(f=> f.id === reData[3]) : [];
    reloadedData.atr = reData[4] ? reData[4].map((z,i)=> {
      let h =attributes.filter(f=> f.id === z)[0]
      h.value = reData[5][i];
      h.keep = false;
      return h;
    }) : []
    reloadedData.fil = reData[6] ? reData[6].map(f=> {
      return {nam: f, keep: false};
    }): [];
    reloadedData.obs = reData[7] ? reData[7].map(f=> {
      let o = observers.filter(h=> h.id === f)[0];
      o.keep = true;
      return o;
    }) : [];
    reloadedData.geo = reData[8] ? [{id: null, type: reData[8] === 1 ? 'Point' : 'Polygon', cor: reData[9], keep: true}] : [];
    reloadedData.aid = id ? [{id: id, keep: true}] : [];
    return reloadedData;
  }

  const currDataToFeature = (data)=> {
    let displayedData = {};
    displayedData.tax = data.tax.length > 0 ? {'hun': data.tax[0].hun, 'ltn': data.tax[0].ltn} : null;
    displayedData.atr = data.atr.length > 0 ? data.atr.map(f=> f.typ ? f.rep.replace('*', f.value) : f.nam).join(', ') : null;
    displayedData.fil = data.fil.length > 0 ? data.fil.map(f=> f.nam).join(', ') : null;
    displayedData.obs = data.obs.length > 0 ? data.obs.map(f=> f.nam).join(', ') : null;

    let feature = {
      'type': 'Feature',
      'properties': {
        disp: displayedData,
        id: data['aid'][0].id
      },
      'geometry': {
        'type': data.geo[0].type,
        'coordinates': data.geo[0].cor,
      }
    }
    return feature
  }

  const currDataToStoredData = (data)=> {
    let storingData = [
      $storedData.length+1,
      data.aid.length > 0 ? data['aid'][0].id : null,
      parseInt($currDate.replace(/-/g,'')),
      data.tax.length > 0 ? data.tax[0].id : null,
      data.atr.length > 0 ? data.atr.map(f=> f.id) : null,
      data.atr.length > 0 ? data.atr.map(f=> f.typ ? f.value : null) : null,
      //data.fil.length > 0 ? data.fil.map(f=> f.id ? f.id : f.nam) : null,
      data.fil.length > 0 ? data.fil.map(f=> f.nam) : null,
      data.obs.length > 0 ? data.obs.map(f=> f.id) : null,
      //data.geo[0].id ? data.geo[0].id : data.geo[0].type,
      //data.geo[0].id ? data.geo[0].id : data.geo[0].cor,
      data.geo[0].type === 'Polygon' ? 2 : 1,
      data.geo[0].cor,
    ]
    return storingData;
  }

  const storedDataToFeatureCollection = ()=> {
    let rd = $storedData.map(f=> {
      return currDataToFeature(currDataFromStoredData(f[1]))
    })
    let geo = {
      'type': 'FeatureCollection',
      'features': rd
    }
    return geo;
  }

  const clearMainInput = ()=> {
    searchText = "";
    if(selectedAttribute) {
      selectedAttribute = null;
    }
    element.type = 'text';
    element.disabled = false;
    element.focus();
  }

  const currDataClean = ()=> {
    Object.keys($currData).forEach(key => {
      $currData[key] = key != 'aid' && $currData[key].filter(f=> f.keep);
    });
  }

  const currDataClearAll = ()=> {
    Object.keys($currData).forEach(key=> $currData[key] = [])
  }
  
  const selectedAttributeClick = (key, item)=> {
    key === 'geo' ? updateGeo($currData.geo[0]) :
    item.typ ? editAttribute(item) : deleteCurrDataItem(key, item);
  }

  const updateGeo = (item)=> {
    if(item.keep) return;
    onUpdateGeo?.(item.id);
    showTaxonEditor = false;
  }

</script>

<Modal
	bind:showModal = {showTaxonEditor}
  bind:this = {modalElement}
	backdropClasses = "items-center"
	modalClasses = "flex-col md:h-[60vh] lg:h-[60vh] sm:h-[58vh] w-full bg-violet-100 border-[1px] border-slate-500 divide-y divide-slate-400"
  idClass = "taxoneditor"  
>

  <!--attributetypes-->  
  <div class="flex items-center justify-between p-2 text-lg bg-red-300 sm:text-xl">
    <div class="flex flex-wrap gap-3">
      {#each labels as nam}
        <label class="flex justify-center items-center
          {nam === editorType ? 'text-white px-3 bg-green-600  rounded-sm' :'font-normal'}"
        >
          <input
            style = "display:none" 
            type = "radio" 
            name = "editorType"
            value = {nam}
            onchange = {editorTypeChange}
            bind:group = {editorType}
          />
          {nam}
        </label>
      {/each}
    </div>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img 
      class="w-5 h-5" src="images/close-small-svgrepo-com.svg"
      alt="none"
      onclick = {()=> showTaxonEditor = false}
    >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img 
      class="w-5 h-5" src="images/close-small-svgrepo-com.svg"
      alt="none"
      onclick = {()=> $currData = currDataFromStoredData(55137035)}
    >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img 
      class="w-5 h-5" src="images/vector-triangle.svg"
      alt="none"
      onclick = {()=> $dailyData = storedDataToFeatureCollection()}
    >
  </div>

  <!-------------------------------------------------------------------------------------------------->
    <!--main input-->
    <div class="flex gap-2 w-[100vw]] items-center border-[1px] bg-yellow-300 text-xl px-2 py-1">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->      
      <img 
        class="w-5 h-5" src="images/close-small-svgrepo-com.svg"
        alt="none"
        onclick = {clearMainInput}
      >
      <span class="font-bold bg-yellow-300">{selectedAttribute && selectedAttribute.nam}</span>
      <input
        class="flex-1 w-full py-1 bg-yellow-300 outline-none lg:cursor-default"
        type = "text"
        onkeydown= {mainInputKeyDown}
        bind:value = {searchText}
        bind:this = {element}
      >
    </div>

    <!--selected attributes searchlist-->
    <div class="flex flex-col h-full p-2 overflow-y-auto text-sm md: lg:text-lg sm:text-xl bg-cyan-200">

      {#if searchItems.length === 0}

        {#if selectedAttribute}
              
          {#if selectedAttribute.typ === 'note'}
          
            <textarea
              class=" w-full p-2 bg-yellow-300 outline-none resize-none border-[1px] border-slate-400 rounded-b-sm"
              rows="8"
              bind:this={attributeInputElement}
              bind:value = {attributeInputText}
              onkeydown= {attributeInputKeyDown}
            ></textarea>

          {:else if selectedAttribute.typ === 'date' || selectedAttribute.typ === 'time'}

            <SveltyPicker
              mode = {selectedAttribute && selectedAttribute.typ === "time" ? "time" : "date"}
              format = {selectedAttribute && selectedAttribute.typ === "time" ? "hh.ii" : "yyyy-mm-dd"} 
              pickerOnly = true
              autocommit = {selectedAttribute && selectedAttribute.typ === "time" ? false : true}
              on:cancel = {clearMainInput}
              bind:value = {dateTimeValue}
              on:input = {(e)=> selectedAttribute && selectAttributeDateTimeList(dateTimeValue)}
            />

          {:else if selectedAttribute.typ === 'lis'}

            <ul class="max-h-80 w-fit divide-y-[1px] divide-slate-400 overflow-y-auto border-[1px] border-slate-400">
              {#each selectedAttribute.dat.split(', ') as value}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <li 
                  class="min-w-1/3 px-2 py-1 select-none {value === selectedAttribute.value ? 'bg-yellow-300' : 'bg-yellow-100'}"
                  onclick={()=> selectAttributeDateTimeList(value)}
                >
                  {value}
                </li>
              {/each}
            </ul>
          {/if}
  
        {:else}
    
          <!--selected attributes wrapped list-->
          <div class="flex flex-col gap-1">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            {#each Object.keys($currData) as key}      
              {#if $currData[key].length > 0}
                <div class="flex flex-wrap gap-1">
                  {#each $currData[key] as item}
                    <div 
                      class="flex gap-2 justify-center items-center px-2 pr-1 border-2 border-violet-300 rounded-md select-none 
                        {item.keep ? 'bg-yellow-300 border-yellow-500' : 'bg-violet-200 '}"
                        oncontextmenu = {(e)=> changeKeep(e, key, item)}
                    >
                      <div
                        onclick = {()=> selectedAttributeClick(key, item)}
                      >
                        {#if key === 'tax'}
                          {item.hun} ({item.ltn})
                        {:else if key === 'atr'}
                          {item.typ ? item.rep.replace('*', item.value) : item.nam}
                        {:else if key === 'geo'}
                          {item.type}: {item.id}
                        {:else if key === 'aid'}
                          Edited data id: {item.id}
                        {:else}
                          {item.nam}
                        {/if}
                      </div>
                      {#if item.typ}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <img 
                          class="w-5 h-4"
                          src="images/close-small-svgrepo-com.svg"
                          alt="none"
                          onclick = {()=> deleteCurrDataItem(key, item)}
                        >
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}
            {/each}
            <div>
              {#if $currData.atr.length > 0 && $currData.obs.length > 0 && searchText === ""}
                <button
                  class="w-auto px-4 py-1 mt-4 text-xl text-white border-[1px] rounded-md outline-none border-slate-800 
                  shadow-xl {$currData.aid.length > 0 ? 'bg-violet-400' : 'bg-amber-600'}"
                  onclick = {submitTaxonEditor}
                >{$currData.aid.length > 0 ? 'Update' : 'Submit'}</button>
              {/if}
              <button
                class="w-auto px-4 py-1 mt-4 text-xl text-white border-[1px] rounded-md outline-none border-slate-800 
                shadow-xl bg-amber-600}"
                onclick = {currDataClearAll}
              >Clear editor</button>  
            </div>
          </div>

        {/if}

      {:else}

        <!--searchlist-->
        <ul class="flex flex-col w-full select-none overflow-y-auto divide-y-[1px] divide-slate-400 bg-violet-100">
          {#each searchItems as item, i (item.id)}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <li 
              class="flex flex-wrap gap-1 px-2 py-1 bg-transparent"
              onclick = {()=> selectItem(item)}
            >
              {#if editorType === 'Tax'}
                <span class="mr-2 font-semibold">{item.hun}</span>
                <span class="italic">({item.ltn})</span>
              {:else if editorType === 'Obs'}
                <span class="mr-2 font-semibold">{item.nam}</span>
              {:else}  
                <span class="font-semibold">{item.nam}</span>            
                <span class="italic">({item.abr})</span>            
              {/if}
            </li>
          {/each}
        </ul>
    
      {/if}
    
    </div>

</Modal>
