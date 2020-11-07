// perlin ground
import Noise from "../utils/noise";

class Ground {
  constructor(octaves, persistance, lacunarity, zoom, seed = Math.random()) {
    this.octaves = octaves;
    this.persistance = persistance;
    this.lacunarity = lacunarity;
    this.zoom = zoom;
    this.noise = new Noise();
    this.noise.seed(seed);
  }

  /*returns a hash map of layered noise
    detail: controls point spacing {1 to width}
    startY: starting height
    octaves: number of noise layers
    persistance: how much noise amplitude decreases each octave
    lacunarity: how much noise frequency increases each octave
    offSet: scrolls the ground
  */
  generate(width, nRange, startY, startX, offset = 0) {
    const ground = {};
    let xoff = 0;

    for (let x = 0; x <= width; x++) {
      let frequency = 1;
      let amplitude = 1;
      let noiseHeight = 0;
      for (let i = 0; i < this.octaves; i++) {
        xoff = (x / this.zoom) * frequency;
        const perlinVal =
          this.noise.perlin(xoff + offset) * (nRange.max - nRange.min) +
          nRange.min;
        noiseHeight += perlinVal * amplitude;

        amplitude *= this.persistance;
        frequency *= this.lacunarity;
      }
      ground[x + startX] = startY + noiseHeight;
    }
    return ground;
  }
}

export default Ground;
