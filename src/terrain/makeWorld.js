/*
 makes and connects chunks of the world

 returns:
 - ground
 - entities
 - other shit?
*/
import Ground from "./ground";
import Biomes from "./biomes";
import Trees from "../trees/trees";

class World {
  constructor(generateDistance, seed) {
    this.generateDistance = generateDistance; // number of chunks
    this.seed = seed;

    this.g = new Ground(3, 0.4, 2, 150.6, seed);
    this.chunksize = 100;
    this.biomes = Biomes;
    this.chunks = [];
  }

  chunk(direction, index = 0) {
    const startY = 650;
    const ground = this.g.generate(
      this.chunksize,
      { min: 30, max: 100 },
      startY
    );

    const { branches, leaves } = Trees["aspen"]({ x: 563, y: ground[563] }, 40);

    this.chunks[index] = {
      biome: Biomes["forrest"],
      ground,
      trees: [{branches, leaves}],
      shrubs: null
    };

    return this.chunks[index];
  }
}

export default World;
