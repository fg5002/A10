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

export const currTime = writable(new Date().toTimeString().substring(0, 5)); 
export const currDate = writable(new Date().toISOString().split('T')[0]);

export const mapState = writable({
  center: [47.391857,19.03352], 
  zoom: 16,
  baselayer: 'OSM',
  overlays: ['Daily data', 'Passionfruit' ]
});

export const currData = writable({
  tax: [
    //{id: 552, hun: 'Holló', ltn: 'Corvus corax', keep: false}
  ],
  atr: [
    //{id: 3, ord: 3, nam: "hím", abr: "h", rep: "*h", typ: "tel", value: 1, keep: false},
    //{id: 4, ord: 4, nam: "nőstény", abr: "n", rep: "*n", typ: "tel", value: 4, keep: false},
    //{id: 15, ord: 15, nam: "átrepülő", abr: "at", rep: "null", typ: null, value: null, keep: false},
    //{id: 24, ord: 24, nam: "gyakoriság", abr: "gy", rep: "*", typ: "lis", dat: "igen ritka, ritka, szórványos, gyakori, tömeges", value: "gyakori", keep: false},
    //{id: 39, ord: 39, nam: "dátum", abr: "dt", rep: "*", typ: "date", value: '2024-12-11', keep: false},
    //{id: 43, ord: 43, nam: "note", abr: "nt", rep: "*", typ: "note", value: 'Valami mindig történik.', keep: false},
    //{id: 44, ord: 44, nam: "rögzítve", abr: "rg", rep: "*", typ: "time", value: '16.15', keep: false},
  ],
  fil: [
    //{id: null, nam: '20240612-102.jpg', keep: false},
    //{id: 5555526, nam: '20240612-103.jpg', keep: false},
    //{id: 125855, nam: '20240612-001.mp3', keep: false},
  ],
  obs: [
    {id: 3, nam: 'Bodor István', keep: true},
    //{id: 12, nam: 'Őze Péter', keep: true},
  ],
  geo: [
    //{id: null, type: 'Point', cor: [47.500000,19.250000], keep: false}
  ],
  aid: [
    //{id: 81456, keep: true}
  ],
})

export const storedData = writable([
  [1,47575752,20250313,null,[1],['Csajkavirág 1'],null,[22],2,[[[19.00452,47.372911],[19.004952,47.372837],[19.005068,47.37262],[19.004977,47.37238],[19.004642,47.37235],[19.004136,47.372527],[19.004111,47.372865],[19.00452,47.372911]]]],
  [2,47575788,20250313,null,[1],['Csajkavirág 2'],null,[22],2,[[[19.005047,47.373532],[19.004935,47.373753],[19.005034,47.373929],[19.005374,47.373915],[19.005622,47.37379],[19.005801,47.373564],[19.005461,47.373396],[19.005047,47.373532]]]],
  [3,47579991,20250313,null,[1],['Cseresznye'],null,[22],1,[19.032088,47.392698]],
  [4,47576691,20250313,null,[1],['Alma'],null,[22],1,[19.030586,47.391792]],
  [5,47599752,20250313,464,[2,44],[1,'18:38'],null,[22],1,[19.035145,47.395587]],
  [6,55137035,20250313,528,[2,15,35,44],["4",null,null,"21:01"],null,[7,3],1,[19.033242,47.392443]],
  [7,63225928,20250313,772,[3,11,44],["1",null,"21:14"],null,[3],1,[19.031216,47.390695]],
  [8,45949360,20250313,72,[2,44],["8","21:17"],null,[22,3],1,[19.032247,47.394818]],
  [9,63384736,20250313,551,[2,11,35,44],["2",null,null,"21:15"],null,[22,3],1,[19.035488,47.389446]],
  [10,4285453,20250313,750,[3,11,35,44],["3",null,null,"21:19"],null,[22,3],1,[19.035488,47.389446]],
  [11,90294413,20250313,156,[2,15,44],["3",null,"20:38"],null,[3],1,[19.036391,47.393286]],
  [12,18299389,20250313,874,[3,11,44],["1",null,"20:40"],null,[3],1,[19.033237,47.391335]],
  [13,43611396,20250313,523,[5,43,44],["1","A fáján.","20:41"],null,[3],1,[19.025665,47.39434]],
  [14,80616785,20250313,862,[2,11,44],["1",null,"21:22"],null,[3],1,[19.034618,47.390811]],
  [15,41844265,20250313,914,[2,44],["20-25","21:23"],null,[3],1,[19.033783,47.391873]]
])


export const dailyData = writable({
  'type': 'FeatureCollection',
  'features': [
  {
    'type': 'Feature',
    'properties': {
      disp: 'Dummy data',
      id: 9999999999
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [19.033852,47.3913300]
    }
  },
  ]
})

export const normalFruits = writable({
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        disp: 'Csajkavirág 1',
        id: 458500
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
        disp: 'Csajkavirág 2',
        id: 458501
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
        disp: 'Körte',
        id: 458502
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.033752,47.3913200]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        disp: 'Birs',
        id: 458503
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.03322,47.3910257],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        disp: 'Naspolya',
        id: 458504
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.03352,47.3914057],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        disp: 'Meggy',
        id: 458505
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.032521,47.3914057],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        disp: 'Cseresznye',
        id: 458506
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.032088,47.392698],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        disp: 'Alma',
        id: 458507
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.030586,47.391792],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        disp: 'Szilva',
        id: 458508
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
        disp: 'Papaya',
        id: 458510
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [19.032238,47.390548],
      }
    },
    {
      'type': 'Feature',
      'properties': {
        disp: 'Mango',
        id: 458511
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
        disp: 'Szilva',
        id: 458508
      },
      'geometry': {
        'type': 'Point',
        'param' : [40,10,160],
        'coordinates': [19.025914,47.394572],
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
disp: 'Circle',
id: 1000000
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
disp: 'Point',
  },
  'geometry': {
'type': 'Point',
'coordinates': [19.032138,47.391548],
  }
}
  ]
});