import {attributes, observers} from "$lib/attributes.js";
import {birds} from "$lib/taxon";
import {currDate, storedData, dailyData} from "$lib/store";
import GeoJsonPopup from '$lib/GeoJsonPopup.svelte'
import {mount} from 'svelte';


export const addPopup = (pp, feature)=> {
  const popupElement = document.createElement('div');
  if (pp) {
    mount(pp, {
      target: popupElement,
      props: {
        data: feature.properties,
        onEdit: (e)=> onFeatureEdit(e),
        openTaxonEditor: ()=> openTaxonEditor()
      }
    });
  }else {
    popupElement.innerHTML = '<div>No Popup Provided</div>';
  }
  return popupElement;
}

export const featureCollectionFromStoredData = (data)=> {
  let res = []; //TODO why keyword 'let' is reserved???
  let disp = {};
  data.forEach(item => {
    disp.no = item[0];
    let tax = item[3] ? birds.filter(f=> f.id === item[3]) : [];
    disp.tax = tax.length > 0 ? {'hun': tax[0].hun, 'ltn': tax[0].ltn} : null;
    let atr = item[4] ? item[4].map((z,i)=> {
      let h =attributes.filter(f=> f.id === z)[0]
      h.value = item[5][i];
      h.keep = false;
      return h;
    }) : [];
    disp.atr = atr.length > 0 ? atr.map(f=> f.typ ? f.rep.replace('*', f.value) : f.nam).join(', ') : null;
    let fil = item[6] ? item[6].map(f=> {
      return {nam: f, keep: false};
    }): [];    
    disp.fil = fil.length > 0 ? fil.map(f=> f.nam).join(', ') : null;  
    let obs = item[7] ? item[7].map(f=> {
      let o = observers.filter(h=> h.id === f)[0];
      o.keep = true;
      return o;
    }) : [];
    disp.obs = obs.length > 0 ? obs.map(f=> f.nam).join(', ') : null;
    let geos = {id: null, type: item[8] < 2 ? 'Point' : 'Polygon', cor: item[9], keep: true};
    geos.spline = item[8] > 2 ? true : false;

    let feature = {
    'type': 'Feature',
    'properties': {disp: disp, id: item[1]},
    'geometry': {'type': geos.type, 'spline': geos.spline, 'coordinates': geos.cor}
  }
    res = [...res, feature];
    disp = {};
  })
  let geo = {'type': 'FeatureCollection', 'features': res};
  console.log('lefutott');
  return geo;
}


export const currDataItemFromStoredData = (data,id)=> {
  let reData = data.filter(f=> f[1] === id)[0];
  let currDataItem = {};
  currDataItem.tax = reData[3] ? birds.filter(f=> f.id === reData[3]) : [];
  currDataItem.atr = reData[4] ? reData[4].map((z,i)=> {
    let h =attributes.filter(f=> f.id === z)[0]
    h.value = reData[5][i];
    h.keep = false;
    return h;
  }) : []
  currDataItem.fil = reData[6] ? reData[6].map(f=> {
    return {nam: f, keep: false};
  }): [];
  currDataItem.obs = reData[7] ? reData[7].map(f=> {
    let o = observers.filter(h=> h.id === f)[0];
    o.keep = true;
    return o;
  }) : [];
  currDataItem.geo = reData[8] ? [{id: null, type: reData[8] === 1 ? 'Point' : 'Polygon', cor: reData[9], keep: true}] : [];
  currDataItem.aid = id ? [{id: id, keep: true}] : [];
  currDataItem.no = reData[0]
  console.log('currDataItemFromStoredData');
  return currDataItem;
}

export const currDataItemToFeature = (data)=> {
  let displayedData = {};
  displayedData.tax = data.tax.length > 0 ? {'hun': data.tax[0].hun, 'ltn': data.tax[0].ltn} : null;
  displayedData.atr = data.atr.length > 0 ? data.atr.map(f=> f.typ ? f.rep.replace('*', f.value) : f.nam).join(', ') : null;
  displayedData.fil = data.fil.length > 0 ? data.fil.map(f=> f.nam).join(', ') : null;
  displayedData.obs = data.obs.length > 0 ? data.obs.map(f=> f.nam).join(', ') : null;
  let feature = {
    'type': 'Feature',
    'properties': {disp: displayedData, id: data['aid'][0].id},
    'geometry': {'type': data.geo[0].type, 'coordinates': data.geo[0].cor}
  }
  return feature
}

export const currDataItemToStoredData = (item)=> {

  let storingData = [
    null,
    item.aid.length > 0 ? item['aid'][0].id : null,
    null, //parseInt(currentDate.replace(/-/g,'')),
    item.tax.length > 0 ? item.tax[0].id : null,
    item.atr.length > 0 ? item.atr.map(f=> f.id) : null,
    item.atr.length > 0 ? item.atr.map(f=> f.typ ? f.value : null) : null,
    //item.fil.length > 0 ? item.fil.map(f=> f.id ? f.id : f.nam) : null,
    item.fil.length > 0 ? item.fil.map(f=> f.nam) : null,
    item.obs.length > 0 ? item.obs.map(f=> f.id) : null,
    //item.geo[0].id ? item.geo[0].id : item.geo[0].type,
    //item.geo[0].id ? item.geo[0].id : item.geo[0].cor,
    item.geo[0].type === 'Polygon' ? 2 : 1,
    item.geo[0].cor,
  ]
  return storingData;
}

export const storedDataToFeatureCollection = (data, dat)=> {
  let date = parseInt(dat.replace(/-/g,''));
  let rd = data.filter(f=>f[2] === date);
  let dummy = {
    'type': 'Feature',
    'properties': {disp: 'Dummy data', dummy: true, id: 9999999999},
    'geometry': {'type': 'Point', 'coordinates': [19.033852,47.3913300]
    }
  };

  let res =  rd.length > 0 ?
    rd.map(f=> currDataItemToFeature(currDataItemFromStoredData(data, f[1]))) :
    [dummy];
  console.log(date, res.length);
  let geo = {'type': 'FeatureCollection', 'features': res};
  return geo;
}

export const deleteDailyDataItem = (dailydata, d)=> {
  dailydata.features = dailydata.features.filter(f=> f.properties.id != parseInt(d));
}