/*
 set your biomes here innit
 use the plant keys from src/trees/trees.js
*/

// prettier-ignore
const Biomes = {
  snow: {
    name: "snow",
    trees: {"pine": { weight: 1, radius: 100 }},
    "groundVariance": { min: 30, max: 200 }
  },
  plains: {
    name: "plains",
    trees: {"oak": { weight: 1, radius: 200 }},
    "groundVariance": { min: 30, max: 100 }
  },
  desert: {
    name: "desert",
    trees: {"acacia": { weight: 1, radius: 200 }},
    "groundVariance": { min: 30, max: 50 }
  },
  hills: {
    name: "hills",
    trees: {
      "eucalyptus": {
        weight: 0.6,
        radius: 300
      },
      "flame": {
        weight: 0.4,
        radius: 600
      }
    },
    "groundVariance": { min: 30, max: 400 }
  },
};

export default Object.freeze(Biomes);
