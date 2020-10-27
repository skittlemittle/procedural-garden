/*
 set your biomes here innit
 use the plant keys from src/trees/trees.js
*/

const Biomes = {
  snow: {
    trees: ["pine"],
  },
  forrest: {
    trees: ["oak"],
  },
  desert: {
    trees: ["acacia"],
  },
  hills: {
    trees: ["aspen", "oak"],
  },
};

export default Object.freeze(Biomes);