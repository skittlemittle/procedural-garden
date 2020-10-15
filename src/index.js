// le main scene
// MIT
import * as PIXI from "pixi.js";

import Tree from "./models/branching";
import Lsystem from "./models/L-system";

const WIDTH = 800;
const HEIGHT = 700;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

// render loop
app.ticker.add(() => {
});

const graphics = new PIXI.Graphics();
const Letree = new Tree({
  root: { x: WIDTH / 2, y: HEIGHT },
  startLenRange: [150, 200],
  minBranchSize: 20,
  bRange: [1, 3],
});

// const Letree = new Lsystem({
//   axiom: "X",
//   rules: [
//     { condition: "F", result: "FF" },
//     { condition: "X", result: "F+[[X]-X]-F[-FX]+X" },
//   ],
//   root: { x: WIDTH / 2, y: HEIGHT },
//   startLenRange: [30, 40],
//   angle: (Math.PI / 6) // 25 degrees lol
// });

document.addEventListener("keydown", () => {
  graphics.clear();
  graphics.lineStyle(1, 0xffffff, 1);
  const branches = Letree.generate();

  graphics.moveTo(WIDTH / 2, HEIGHT);

  branches.forEach((element) => {
    graphics.moveTo(element.x1, element.y1);
    graphics.lineTo(element.x2, element.y2);
  });

  app.stage.addChild(graphics);
});
