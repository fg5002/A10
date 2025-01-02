import {writable} from 'svelte/store';

export const currDate = writable(new Date().toISOString().split('T')[0]);
export const currTime = writable(new Date().toTimeString().slice(0, 8).replace(/:/g,'_'));

export const mapState = writable({
  center: [47.391857,19.03352], 
  zoom: 16,
  baselayer: 'OSM',
  overlays: ['Normalfruits']
});

export const currData3 = writable(
  [
    {typ: 1, id: 552, hun: 'Holló', ltn: 'Corvus corax', value: null},
    {typ: 2, ord: 2, id: 6, nam: 'hím', rep: '*h', value: 1},
    {typ: 2, ord: 3, id: 14, nam: 'nőstény', rep: '*n', value: 4},
    {typ: 2, ord: 5, id: 19, nam: 'átrepülő', rep: null, value: null},
    {typ: 2, ord: 40, id: 3, nam: 'rögzítve', rep: 'rögzítve: *', value: 16.15},
    {typ: 2, ord: 45, id: 45, nam: 'dátum', rep: '*', value: '2024-12-11'},
    {typ: 3, id: 4566, value: '20240612-102.jpg'},
    {typ: 3, id: 4567, value: '20240612-103.jpg'},
    {typ: 3, id: 125, value: '20240612-001.mp3'},
    {typ: 5, id: 12, value: 'Kiss Péter'},
    {typ: 5, id: 5, value: 'Nagy Pál'},
    {typ: 6, id: 'ykiefdu1', value: 'Point'},
  ]
)

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

export const attributes = [
  {abr: "c,lb", id: 1, nam: "címke", rep: "*", typ: "text"}, 
  {abr: "ad", id: 2, nam: "adult", rep: "*ad", typ: "tel"}, 
  {abr: "bef", id: 3, nam: "befejezés", rep: "*-ig", typ: "time"}, 
  {abr: "bir", id: 4, nam: "birding.hu", rep: "birding.hu/*", typ: "tel"}, 
  {abr: "ir", id: 5, nam: "irány", rep: "*-felé", typ: "text"}, 
  {abr: "h", id: 6, nam: "hím", rep: "*h", typ: "tel"}, 
  {abr: "hdb", id: 7, nam: "herbárium doboz", rep: "doboz :*", typ: "tel"}, 
  {abr: "hno", id: 8, nam: "herbárium szám", rep: "no: *", typ: "tel"}, 
  {abr: "idp", id: 9, nam: "időpont", rep: "*-kor", typ: "time"}, 
  {abr: "imm", id: 10, nam: "immature", rep: "*imm", typ: "tel"}, 
  {abr: "ize", id: 11, nam: "izeltlabuak.hu", rep: "izeltlabuak.hu/*", typ: "tel"}, 
  {abr: "kez", id: 13, nam: "kezdés", rep: "*-tól", typ: "time"}, 
  {abr: "n,fm", id: 14, nam: "nőstény", rep: "*n", typ: "tel"}, 
  {abr: "p,e", id: 15, nam: "példány", rep: "*pd", typ: "tel"}, 
  {abr: "pul", id: 16, nam: "pullus", rep: "*pull", typ: "tel"}, 
  {abr: "sub", id: 17, nam: "subadult", rep: "*sub", typ: "tel"}, 
  {abr: "toj", id: 18, nam: "tojás", rep: "* tojás", typ: "tel"}, 
  {abr: "at", id: 19, nam: "átrepülő", rep: null, typ: null}, 
  {abr: "dog", id: 20, nam: "dög", rep: null, typ: null}, 
  {abr: "en", id: 21, nam: "ének", rep: null, typ: null}, 
  {abr: "elf", id: 22, nam: "előfordul", rep: null, typ: null}, 
  {abr: "ell", id: 23, nam: "ellenőrizendő", rep: null, typ: null}, 
  {abr: "ft", id: 24, nam: "fotó", rep: null, typ: null}, 
  {abr: "fh", id: 25, nam: "fotóról határozva", rep: null, typ: null}, 
  {abr: "flt", id: 26, nam: "folt", rep: null, typ: null}, 
  {abr: "fsz", id: 27, nam: "fészek", rep: null, typ: null}, 
  {abr: "gyk", id: 28, nam: "gyakori", rep: null, typ: null}, 
  {abr: "hg", id: 29, nam: "hang", rep: null, typ: null}, 
  {abr: "kcs", id: 30, nam: "közös csapatban", rep: null, typ: null}, 
  {abr: "ket", id: 31, nam: "kétes", rep: null, typ: null}, 
  {abr: "lis, lvi", id: 32, nam: "látva is", rep: null, typ: null}, 
  {abr: "mdf", id: 33, nam: "mindenfelé", rep: null, typ: null}, 
  {abr: "nh,npd", id: 34, nam: "néhány pd", rep: null, typ: null}, 
  {abr: "nym", id: 35, nam: "nyom", rep: null, typ: null}, 
  {abr: "ria", id: 36, nam: "riaszt", rep: null, typ: null}, 
  {abr: "rtk", id: 37, nam: "ritka", rep: null, typ: null}, 
  {abr: "szv", id: 38, nam: "szórványos", rep: null, typ: null}, 
  {abr: "tbb,tpd", id: 39, nam: "több pd", rep: null, typ: null}, 
  {abr: "tbf", id: 40, nam: "többfelé", rep: null, typ: null}, 
  {abr: "tcs", id: 41, nam: "több csapatban", rep: null, typ: null}, 
  {abr: "tom", id: 42, nam: "tömeges", rep: null, typ: null}, 
  {abr: "vir", id: 43, nam: "virágzik", rep: null, typ: null}, 
  {abr: "ab", id: 44, nam: "abundancia", rep: "*", typ: ['ritka', 'szórványos', 'gyakori', 'tömeges']}, 
  {abr: "dt", id: 45, nam: "dátum", rep: "dátum: *", typ: "date"}, 
  {abr: "nt", id: 46, nam: "note", rep: "*", typ: "note"}, 
  {abr: "gy", id: 47, nam: "gyakoriság", rep: "*", typ: ['ritka', 'igen szórványos', 'szórványos', 'gyakori', 'tömeges']}, 
  {abr: "ad", id: 48, nam: "A-D", rep: "A-D: *", typ: ['+', '+-1', '1', '1-2', '2', '2-3', '3', '3-4', '4', '4-5', '5']},
  {abr: "j", id: 49, nam: "juvenilis", rep: "*juv", typ: "tel"}, 
]

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