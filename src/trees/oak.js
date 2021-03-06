// minecraff minecraff
import { Polygon } from "pixi.js";
import { randomRange } from "../utils/misc";
import SpaceColonization from "../generators/Space_colonization";
import makeCrownBlob from "../utils/crownBlob";
import scatterAttractors from "../utils/scatterAttractors";

function newOak(root = { x: 0, y: 0 }, height = 400) {
  const h = Math.round(randomRange(height / 2, height / 4));
  const w = Math.round(randomRange(h, h * 0.7));

  const crown = makeCrownBlob(
    root.x + randomRange(-w, w),
    root.y - height,
    w,
    h,
    [100, 300]
  );
  const attractors = scatterAttractors(new Polygon(crown), w, h, {
    x: root.x,
    y: root.y - height,
  });

  const tree = new SpaceColonization({
    maxDist: height,
    flowerDensity: 0.8,
  });
  return {
    leafType: "point",
    leafColor: 0x1ca807,
    branchColor: 0x3f301d,
    flowerColor: 0xff00ff,
    ...tree.generate(root, attractors, 50),
  };
}

export default newOak;
