/*
 set your biomes here innit
 use the plant keys from src/trees/trees.js
*/

const Biomes = {
  snow: {
    name: "snow",
    trees: ["pine"],
  },
  forrest: {
    name: "forrest",
    trees: ["oak"],
  },
  desert: {
    name: "desert",
    trees: ["acacia"],
  },
  hills: {
    name: "hills",
    trees: ["aspen", "oak"],
  },
};

export default Object.freeze(Biomes);