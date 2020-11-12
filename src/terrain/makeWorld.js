/*
 makes chunks of the world
 
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
import Ground from "./ground";
import Biomes from "./biomes";
import Trees from "../trees/trees";
import { randomRange, weightedRand } from "../utils/misc";

class World {
  constructor(generateDistance, seed) {
    this.generateDistance = generateDistance; // number of chunks
    this.seed = seed;

    this.biomes = Biomes;
    this.ground = new Ground(4, 0.4, 2, 550, seed);
    this.chunksize = 800;
    this.chunks = {}; // coz negative indexes
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

  /* scatters plants in the chunk. Just poission disc sampling in 1D
   choices: selection of plants to scatter
   spacing: distance to add to base radius
   numSamples: possion samples
  */
  _scatterPlants(
    choices,
    ground,
    biome,
    startX,
    spacing = 100,
    numSamples = 8
  ) {
    const grid = new Array(Math.ceil(this.chunksize / spacing));
    const positions = [];
    const spawnPts = [];
    const plants = new Array();
    // init point
    spawnPts.push(0);
    while (spawnPts.length > 0) {
      const spawnIndex = Math.round(randomRange(0, spawnPts.length));
      const spawnCenter = spawnPts[spawnIndex];

      let accepted = false;
      for (let i = 0; i < numSamples; i++) {
        const dir = Math.round(randomRange(-1, 1));
        const p = weightedRand(choices);
        const radius = biome.trees[p].radius;
        const candidate = spawnCenter + dir * randomRange(radius, 2 * radius);
        if (this._isValid(candidate, radius, positions, grid)) {
          positions.push(candidate);
          spawnPts.push(candidate);
          const pos = Math.round(candidate + startX);
          plants.push(
            Trees[p]({
              x: pos,
              y: ground[pos],
            })
          );
          grid[Math.round(candidate / radius)] = positions.length;
          accepted = true;
          break;
        }
      }
      if (!accepted) spawnPts.splice(spawnIndex, 1);
    }
    return plants;
  }

  // make a new chunk, direction: "L" or "R"
  chunk(direction, index = 0) {
    let startY = 650;
    const startX = (direction === "R" ? 1 : -1) * this.chunksize * index;
    const currBiome = Biomes["plains"];
    // const prevChunk = this.chunks[index + (direction == "R" ? -1 : 1)];
    const ground = this.ground.generate(
      this.chunksize,
      currBiome.groundVariance,
      startY,
      startX
    );

    const trees = this._scatterPlants(
      currBiome.trees,
      ground,
      currBiome,
      startX,
      100
    );

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
