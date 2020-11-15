/*
 makes chunks of the world
*/
import Ground from "./ground";
import Biomes from "./biomes";
import Trees from "../trees/trees";
import Noise from "../utils/noise";
import { randomRange, weightedRand } from "../utils/misc";

class World {
  constructor(generateDistance, seed) {
    this.generateDistance = generateDistance; // number of chunks
    this.seed = seed;

    this.ground = new Ground(4, 0.4, 2, 550, seed); // mfw magic numbers!!!!
    this.chunksize = 800;
    this.chunks = {}; // coz negative indexes
    this.noise = new Noise();
    this.noise.seed(seed);
    this.currBiome = Biomes["plains"];
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
  chunk(direction, index = 0, groundHeight = 580) {
    const prevChunk = this.chunks[index + (direction == "R" ? -1 : 1)];
    if (index !== 0 && !this.chunks[index]) {
      this.currBiome =
        Biomes[weightedRand(Biomes[prevChunk.biome.name].nextBiomeCandidates)];
    }

    if (!this.chunks[index]) {
      const startX = (direction === "R" ? 1 : -1) * this.chunksize * index;
      const ground = this.ground.generate(
        this.chunksize,
        this.currBiome.groundVariance,
        // lord forgive me
        prevChunk
          ? Biomes[prevChunk.biome.name].groundVariance
          : { min: 0, max: 0 },
        groundHeight,
        startX
      );

      const noiseOffset = index * Math.random();
      const trees = this._scatterPlants(
        this.currBiome.trees,
        ground,
        this.currBiome,
        startX,
        Math.abs(this.noise.perlin(noiseOffset)) * (100 - 30) + 30
      );

      this.chunks[index] = {
        biome: {
          name: this.currBiome.name,
          groundColor: Biomes[this.currBiome.name].groundColor,
        },
        ground,
        trees,
        shrubs: null,
      };
    }

    return this.chunks[index];
  }
}

export default World;
