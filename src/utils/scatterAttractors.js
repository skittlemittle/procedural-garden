import { randomRange } from "./misc";
// scatter attractors in a given polygon
function scatterAttractors(poly, w, h, center, numAttractors = 300) {
  const attractors = [];
  for (let i = 0; i < numAttractors; i++) {
    const leaf = {
      x: randomRange(-w, w) + center.x,
      y: randomRange(-h, h) + center.y,
    };
    if (poly.contains(leaf.x, leaf.y)) attractors.push(leaf);
  }
  return attractors;
}

export default scatterAttractors;
