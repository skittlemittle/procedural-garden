// perlin ground
import * as Noise from "./utils/noise";

class Ground {
  constructor(nRange, seed = Math.random()) {
    this.nRange = nRange;
    Noise.seed(seed);
  }

  /* detail: controls point spacing {1 to width}
     startY: starting height
     octaves: number of noise layers
     persistance: how much noise amplitude decreases each octave
     lacunarity: how much noise frequency increases each octave
  */
  generate(scale, width, startY, octaves, persistance, lacunarity) {
    let ground = [];
    let xoff = 0;
    let minHeight = this.nRange[0];
    let maxHeight = this.nRange[1];

    for (let x = 0; x <= width; x++) {
      let frequency = 1;
      let amplitude = 1;
      let noiseHeight = 0;
      for (let i = 0; i < octaves; i++) {
        xoff = (x / scale) * frequency;
        const perlinVal =
          Noise.perlin(xoff) * (this.nRange[1] - this.nRange[0]) +
          this.nRange[0];
        noiseHeight += perlinVal * amplitude;

        amplitude *= persistance;
        frequency *= lacunarity;
      }

      if (noiseHeight > 1) maxHeight = noiseHeight;
      else if (noiseHeight < 0) minHeight = noiseHeight;
      ground.push({
        x: x,
        y: startY + noiseHeight,
      });
    }
    // start+(x-min)(end-start)/(max-min)
    ground.map((node) => {
      this.nRange[0] +
        ((node - minHeight) * (this.nRange[1] - this.nRange[1])) /
          (maxHeight - minHeight);
    });
    return ground;
  }
}

export default Ground;
