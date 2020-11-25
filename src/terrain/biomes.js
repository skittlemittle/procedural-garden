/*
 set your biomes here innit
 use the plant keys from src/trees/trees.js
*/

// prettier-ignore
const Biomes = {
  snow: {
    name: "snow",
    groundColor: 0xffffff,
    trees: {"pine": { weight: 1, radius: 200 }},
    groundVariance: { min: 30, max: 200 },
    nextBiomeCandidates: {
      "snow":   { weight: 0.5 },
      "hills":  { weight: 0.3 },
      "plains": { weight: 0.2 },
    },
  },
  plains: {
    name: "plains",
    groundColor: 0x33cc33,
    trees: {"oak": { weight: 1, radius: 250 }},
    groundVariance: { min: 30, max: 150 },
    nextBiomeCandidates: {
      "plains": { weight: 0.5 },
      "hills":  { weight: 0.2 },
      "savannah": { weight: 0.2 },
    },
  },
  savannah: {
    name: "savannah",
    groundColor: 0xe2bf87,
    trees: {"acacia": { weight: 1, radius: 1000 }},
    groundVariance: { min: 30, max: 50 },
    nextBiomeCandidates: {
      "savannah": { weight: 0.6 },
      "hills":  { weight: 0.3 },
      "snow": { weight: 0.1 }
    },
  },
  hills: {
    name: "hills",
    groundColor: 0x009933,
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
    groundVariance: { min: 30, max: 400 },
    nextBiomeCandidates: {
      "hills":  { weight: 0.7 },
      "snow":   { weight: 0.2 },
      "savannah": { weight: 0.1 },
    },
  },
};

export default Object.freeze(Biomes);
