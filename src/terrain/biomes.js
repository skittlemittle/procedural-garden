/*
 set your biomes here innit
 use the plant keys from src/trees/trees.js
*/

// prettier-ignore
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
    trees: {"eucalyptus": 0.6, "flame": 0.4},
  },
};

export default Object.freeze(Biomes);
