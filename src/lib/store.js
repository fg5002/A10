import {writable} from 'svelte/store';

export const mapState = writable({
  center: [47.391857,19.03352], 
  zoom: 16,
  baselayer: 'OSM',
  overlays: ['Normalfruits', 'Passionfruit']
});

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