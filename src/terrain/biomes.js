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
    trees: {
      "oak": { weight: 0.65, radius: 300 },
      "other": {weight: 0.35, radius: 400},
    },
    groundVariance: { min: 30, max: 150 },
    nextBiomeCandidates: {
      "plains":   { weight: 0.6 },
      "hills":    { weight: 0.1 },
      "savannah": { weight: 0.2 },
    },
  },
  savannah: {
    name: "savannah",
    groundColor: 0xe2bf87,
    trees: {
      "acacia": { weight: 0.7, radius: 1000 },
      "dead": { weight: 0.3, radius: 1500 },
    },
    groundVariance: { min: 30, max: 50 },
    nextBiomeCandidates: {
      "savannah": { weight: 0.6 },
      "hills":    { weight: 0.2 },
      "snow":     { weight: 0.2 },
    },
  },
  hills: {
    name: "hills",
    groundColor: 0x009933,
    trees: {
      "eucalyptus": { weight: 0.6, radius: 350 },
      "flame": { weight: 0.4, radius: 600 }
    },
    groundVariance: { min: 30, max: 600 },
    nextBiomeCandidates: {
      "hills":    { weight: 0.6 },
      "plains":     { weight: 0.3 },
      "savannah": { weight: 0.1 },
    },
  },
};

export default Object.freeze(Biomes);
