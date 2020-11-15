// perlin ground
import Noise from "../utils/noise";
import { lerp } from "../utils/misc";

class Ground {
  constructor(octaves, persistance, lacunarity, zoom, seed = Math.random()) {
    /*
    octaves: number of noise layers
    persistance: how much noise amplitude decreases each octave
    lacunarity: how much noise frequency increases each octave
    */
    this.octaves = octaves;
    this.persistance = persistance;
    this.lacunarity = lacunarity;
    this.zoom = zoom;
    this.noise = new Noise();
    this.noise.seed(seed);
  }

  /*returns a hash map of layered noise
    pRange: previous noise range
    nRange: current noise range
    startY: starting height
    startX: scrolls the ground
  */
  generate(width, nRange, pRange, startY, startX) {
    const ground = {};

    for (let x = 0; x <= width; x++) {
      let frequency = 1;
      let amplitude = 1;
      let noiseHeight = 0;
      // linearly interpolate between ranges for a smooth transition
      let lerpX = x * 0.005; // 0.005: 200 steps
      let nMax, nMin;
      nMax = lerpX <= 1 ? lerp(pRange.max, nRange.max, lerpX) : nRange.max;
      nMin = lerpX <= 1 ? lerp(pRange.min, nRange.min, lerpX) : nRange.min;

      for (let i = 0; i < this.octaves; i++) {
        const xoff = ((x + startX) / this.zoom) * frequency;
        const perlinVal = this.noise.perlin(xoff) * (nMax - nMin) + nMin;
        noiseHeight += perlinVal * amplitude;

        amplitude *= this.persistance;
        frequency *= this.lacunarity;
      }
      ground[x + startX] = noiseHeight + startY;
    }
    return ground;
  }
}

export default Ground;
