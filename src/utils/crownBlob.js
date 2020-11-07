import Noise from "../utils/noise";

/*
 returns a "noisy" ellipse as a list of vertices
 x0, y0: center
 nRange: range of noise amplitude
 */
function makeCrownBlob(x0, y0, w, h, nRange) {
  const b = h / 2;
  const a = w / 2;
  let xoff, yoff;
  const path = [];
  const noise = new Noise();
  noise.seed(Math.random());
  for (let theta = 0; theta < 2 * Math.PI; theta += 0.01) {
    xoff = Math.cos(theta) + 1;
    yoff = Math.sin(theta) + 1;
    // https://en.wikipedia.org/wiki/Ellipse#Polar_forms
    const r =
      (a * b) /
      Math.sqrt((b * Math.cos(theta)) ** 2 + (a * Math.sin(theta)) ** 2);
    const nR =
      r + (noise.perlin(xoff, yoff) * (nRange[1] - nRange[0]) + nRange[0]);
    path.push({ x: x0 + nR * Math.cos(theta), y: y0 + nR * Math.sin(theta) });
  }
  return path;
}

export default makeCrownBlob;
