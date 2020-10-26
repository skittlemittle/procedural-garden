// perlin ground
import * as Noise from "./utils/noise";

class Ground {
  constructor(nRange, octaves, persistance, lacunarity, seed = Math.random()) {
    this.nRange = nRange;
    this.octaves = octaves;
    this.persistance = persistance;
    this.lacunarity = lacunarity;
    Noise.seed(seed);
  }

  /*returns a hash map of layered noise
    detail: controls point spacing {1 to width}
    startY: starting height
    octaves: number of noise layers
    persistance: how much noise amplitude decreases each octave
    lacunarity: how much noise frequency increases each octave
  */
  generate(scale, width, startY) {
    const ground = [];
    let xoff = 0;

    for (let x = 0; x <= width; x++) {
      let frequency = 1;
      let amplitude = 1;
      let noiseHeight = 0;
      for (let i = 0; i < this.octaves; i++) {
        xoff = (x / scale) * frequency;
        const perlinVal =
          Noise.perlin(xoff) * (this.nRange.max - this.nRange.min) +
          this.nRange.min;
        noiseHeight += perlinVal * amplitude;

        amplitude *= this.persistance;
        frequency *= this.lacunarity;
      }
      ground[x] = startY + noiseHeight;
    }
    return ground;
  }
}

export default Ground;
