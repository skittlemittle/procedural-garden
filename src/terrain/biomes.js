/*
 set your biomes here innit
 use the plant keys from src/trees/trees.js
*/

const Biomes = {
  snow: {
    name: "snow",
    trees: {"pine": 1},
  },
  forrest: {
    name: "forrest",
    trees: {"oak": 1},
  },
  desert: {
    name: "desert",
    trees: {"acacia": 1},
  },
  hills: {
    name: "hills",
    trees: {"eucalyptus": 0.4, "oak": 0.6},
  },
};

export default Object.freeze(Biomes);