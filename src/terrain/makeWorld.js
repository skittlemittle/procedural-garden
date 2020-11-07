/*
 makes and connects chunks of the world
 
 chunks:
 {
   index: {
     biome
     ground
     trees
     shrubs
   }
 }
*/
import Noise from "../utils/noise";
import Ground from "./ground";
import Biomes from "./biomes";
import Trees from "../trees/trees";
import { randomRange, weightedRand } from "../utils/misc";

class World {
  constructor(generateDistance, seed) {
    this.generateDistance = generateDistance; // number of chunks
    this.seed = seed;

    this.biomes = Biomes;
    this.g = new Ground(3, 0.4, 2, 150.6, seed);
    this.tdNoise = new Noise();
    this.tdNoise.seed(seed);
    this.chunksize = 800;
    this.chunks = {}; //coz negative indexes
  }

  // check if point is too close, stolen from sebastian lague
  _isValid(candidate, radius, positions, grid) {
    if (candidate >= 0 && candidate < this.chunksize) {
      const cellX = Math.round(candidate / radius);
      const searchStart = Math.max(0, cellX - 2);
      const searchEnd = Math.min(cellX + 2, grid.length - 1);

      for (let x = searchStart; x <= searchEnd; x++) {
        const pointIndex = grid[x] - 1;
        if (pointIndex != -1) {
          const dist = Math.abs(candidate - positions[pointIndex]);
          if (dist < radius) return false;
        }
      }
      return true;
    }
    return false;
  }

  // returns a list of tree positions
  // just poission disc sampling in 1D with radii set by perlin noise
  _scatterTrees(radius = 200, numSamples = 8) {
    const grid = new Array(Math.ceil(this.chunksize / radius));
    const positions = [];
    const spawnPts = [];
    // init point
    spawnPts.push(0);
    while (spawnPts.length > 0) {
      const spawnIndex = Math.round(randomRange(0, spawnPts.length));
      const spawnCenter = spawnPts[spawnIndex];

      let accepted = false;
      for (let i = 0; i < numSamples; i++) {
        const dir = Math.round(randomRange(-1, 1));
        const candidate = spawnCenter + dir * randomRange(radius, 2 * radius);
        if (this._isValid(candidate, radius, positions, grid)) {
          positions.push(candidate);
          spawnPts.push(candidate);
          grid[Math.round(candidate / radius)] = positions.length;
          accepted = true;
          break;
        }
      }
      if (!accepted) spawnPts.splice(spawnIndex, 1);
    }
    return positions;
  }

  // make a new chunk, direction: "L" or "R"
  chunk(direction, index = 0) {
    let startY = 650;
    const startX = (direction == "R" ? 1 : -1) * this.chunksize * index;
    const currBiome = Biomes["hills"];
    // const prevChunk = this.chunks[index + (direction == "R" ? -1 : 1)];
    const ground = this.g.generate(
      this.chunksize,
      { min: 30, max: 100 },
      startY,
      startX
    );

    const trees = [];
    for (let pos of this._scatterTrees()) {
      pos = Math.round(pos) + startX;
      const t = weightedRand(currBiome.trees);
      trees.push(Trees[t]({ x: pos, y: ground[pos] }));
    }
    this.chunks[index] = {
      biome: currBiome.name,
      ground,
      trees,
      shrubs: null,
    };
    return this.chunks[index];
  }
}

export default World;
