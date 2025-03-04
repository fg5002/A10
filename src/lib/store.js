/*
You are an expert programmer AI assistant.
You will be provided the full source code for a codabase in your project knowledge.
Always use the entire knowledge for every question.
When generating code you should do it in Svelte 5 (with Runes and Snippets) with Tailwind CSS.
This project is a web application.
Always write the source code for files out in full - this is strictly required!
*/

import {writable} from 'svelte/store';

export const virtualKeyboardHeight = writable(0);

export const currDate = writable(new Date().toISOString().split('T')[0]);
export const currTime = writable(new Date().toTimeString().slice(0, 5).replace(/:/g,'.'));

export const mapState = writable({
  center: [47.391857,19.03352], 
  zoom: 16,
  baselayer: 'OSM',
  overlays: ['Normalfruits']
});

export const main = {
  's': 4, 
  'd': 155,
  't': 289,
  'k': [6,14,19],
  'v': [1,4,null],
  'f': [105,2841],
  'o': [2,1,3],
  'r': [46,24,3],
  'g': 506
}

export const main_2 = [
  {'d':2,'s':4,'t':289,'k':[6,14,19],'v':[1,4,''],'f':[1,2],'o':[2,1,3],'r':[46,24,3],'g':506},
  {'d':2,'s':5,'t':151,'k':[2],'v':[1],'f':null,'o':[1],'r':null,'g':1788},
  {'d':2,'s':6,'t':null,'k':[1],'v':['valami bogár'],'o':[2],'r':[5],'g':1492}
]

// date, sor, taxon, key, value, file, observer, reference, shape
export const main_2a = [
  {id:1,data:[1,2,289,[15,2,13,19,7],[6,2,"08.30","","A12"],[1,2],[2,1,3],506]},
  {id:2,data:[2,2,151,[2],[1],null,[1],1788]},
  {id:3,data:[3,2,null,[1],["valami bogár"],null,[2],1492]},
  {id:4,data:[4,2,289,[6,14,19],[1,4,""],[1,2],[2,1,3],556]},
  {id:5,data:[5,1,151,[2],[1],null,[1],1508]},
  {id:6,data:[6,1,55,[1],["valami bogár"],null,[2],886]},
  {id:7,data:[7,1,96,[15,29],[1,""],null,[2],102]},
  {id:8,data:[8,1,289,[6,14,12,9],[1,4,9,"12.50"],[1,2],[2,1,3],999]}
]

export const main_3 = [
  {"r":4,"d":2,"t":289,"k":[6,14,19],"v":[1,4,""],"f":[1,2],"o":[2,1,3],"g":506},
  {"r":5,"d":2,"t":151,"k":[2],"v":[1],"n":"Hárfázott a felhőkön.","o":[1],"g":1788},
  {"r":6,"d":2,"k":[1],"v":["valami bogár"],"o":[2],"g":1492}
]


export const sortableItems = writable([
  {id:1, nam:"alma"}, 
  {id:2, nam:"körte"}, 
  {id:3, nam:"szilva"}, 
  {id:4, nam:"kajszi"}, 
  {id:5, nam:"balatoni rákok"}, 
  {id:6, nam:"málna"},
  {id:7, nam:"dió"},
  {id:8, nam:"mogyoró"}, 
  {id:9, nam:"berkenye"}, 
  {id:10, nam:"meggy"}, 
  {id:11, nam:"ribizke"}, 
  {id:12, nam:"egres"}, 
  {id:13, nam:"mandula"}, 
  {id:14, nam:"cseresznye"},
  {id:15, nam:"törökmogyoró"}, 
  {id:16, nam:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
  {id:17, nam:"Vestibulum commodo felis quis tortor."}, 
  {id:18, nam:"Donec quis dui at dolor tempor interdum."}, 
  {id:19, nam:"Nunc dignissim risus id metus."}, 
  {id:20, nam:"Integer vitae libero ac risus egestas placerat."}, 
  {id:21, nam:"Vivamus vestibulum ntulla nec ante."}, 
  {id:22, nam:"Cras ornare tristique elit."}
])


export const currData2 = writable({
  id: null,
  geo:  {id: null, nam: 'Point', cor: [47.500000,19.250000], keep: true},
  data: [
    //{no: 1, id: 552, hun: 'Holló', ltn: 'Corvus corax', keep: false},
    //{no: 2, id: 3, ord: 3, nam: "hím", abr: "h", rep: "*h", typ: "tel", value: 1, keep: false},
    //{no: 2, id: 4, ord: 4, nam: "nőstény", abr: "n", rep: "*n", typ: "tel", value: 4, keep: false},
    //{no: 2, id: 15, ord: 15, nam: "átrepülő", abr: "at", rep: "null", typ: null, value: null, keep: false},
    //{no: 2, id: 40, ord: 40, nam: "rögzítve", abr: "rg", rep: "*", typ: "time", value: '16.15', keep: false},
    //{no: 2, id: 39, ord: 39, nam: "dátum", abr: "dt", rep: "*", typ: "date", value: '2024-12-11', keep: false},
    {no: 3, id: 5555525, nam: '20240612-102.jpg', keep: false},
    //{no: 3, id: 5555526, nam: '20240612-103.jpg', keep: false},
    //{no: 3, id: 125, nam: '20240612-001.mp3', keep: false},
    {no: 5, id: 3, nam: 'Bodor István', keep: true},
    //{no: 5, id: 12, nam: 'Őze Péter', keep: true},
  ]
})

export const currData = writable({
  id: null,
  tax: [{id: 552, hun: 'Holló', ltn: 'Corvus corax', keep: false}],
  atr: [
      {id: 3, ord: 3, nam: "hím", abr: "h", rep: "*h", typ: "tel", value: 1, keep: false},
      //{id: 4, ord: 4, nam: "nőstény", abr: "n", rep: "*n", typ: "tel", value: 4, keep: false},
      {id: 15, ord: 15, nam: "átrepülő", abr: "at", rep: "null", typ: null, value: null, keep: false},
      {id: 24, ord: 24, nam: "gyakoriság", abr: "gy", rep: "*", typ: "lis", dat: "igen ritka, ritka, szórványos, gyakori, tömeges", value: "gyakori", keep: false},
      {id: 39, ord: 39, nam: "dátum", abr: "dt", rep: "*", typ: "date", value: '2024-12-11', keep: false},
      {id: 40, ord: 40, nam: "rögzítve", abr: "rg", rep: "*", typ: "time", value: '16.15', keep: false},
      {id: 44, ord: 44, nam: "note", abr: "nt", rep: "*", typ: "note", value: 'Valami mindig történik.', keep: false}
  ],
  fil: [
    {id: 5555525, nam: '20240612-102.jpg', keep: false},
    //{id: 5555526, nam: '20240612-103.jpg', keep: false},
    //{id: 125, nam: '20240612-001.mp3', keep: false},
  ],
  obs: [
    {id: 3, nam: 'Bodor István', keep: true},
    //{id: 12, nam: 'Őze Péter', keep: true},
  ],
  geo: [{id: null, nam: 'Point', cor: [47.500000,19.250000], keep: true}]
})

export const DB1 = writable({
  tax: 552,
  atr: {key: [3,4,15,39,40], value: [1,4,null,'2024-12-11','16.15']},
  fil: ['20240612-102.jpg','20240612-103.jpg','20240612-001.mp3'],
  obs: [3,12],
  geo: {typ: 'Point', cor: [47.500000,19.250000]},
  id: null,
})

export const normalFruits = writable({
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        data: 'Csajkavirág 1',
      },
      'geometry': {
        'type': 'Polygon',
        'coordinates': [[
          [19.00452,47.372911],
          [19.004952,47.372837],
          [19.005068,47.37262],
          [19.004977,47.37238],
          [19.004642,47.37235],
          [19.004136,47.372527],
          [19.004111,47.372865],
          [19.00452,47.372911]
        ]]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Csajkavirág 2',
      },
      'geometry': {
        'type': 'Polygon',
        'coordinates': [[
          [19.005047,47.373532],
          [19.004935,47.373753],
          [19.005034,47.373929],
          [19.005374,47.373915],
          [19.005622,47.37379],
          [19.005801,47.373564],
          [19.005461,47.373396],
          [19.005047,47.373532]
        ]],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Körte',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.033752,47.3913200],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Birs',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.03322,47.3910257],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Naspolya',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.03352,47.3914057],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Meggy',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.032521,47.3914057],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Cseresznye',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.032088,47.392698],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Alma',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.030586,47.391792],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Szilva',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.0289339,47.391005],
      }
    }   
  ]
});


export const tropicalFruits = writable({
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        data: 'Papaya',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.032238,47.390548],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Mango',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.03038,47.390248],
      }
    } 
  ]
});

export const passionFruit = writable({
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        data: 'Passionfruit',
      },
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [19.036025,47.390889],
            [19.035532,47.390671],
            [19.035049,47.390613],
            [19.034856,47.390112],
            [19.035929,47.389872],
            [19.035907,47.390337],
            [19.036519,47.390504],
            [19.036025,47.390889]
          ]
        ],
      }
    }
  ]
});

export const gps = writable({
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        data: 'Circle',
      },
      'geometry': {
        'radius': 50,
        'type': 'Point',
        'coordinates': [19.032138,47.391548],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        data: 'Point',
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.032138,47.391548],
      }
    }
  ]
});