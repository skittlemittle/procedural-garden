// le main scene
// MIT
import * as PIXI from "pixi.js";

// import Branching from "./generators/Branching";
// import newOak from "./trees/oak";
import newAspen from "./trees/aspen";
import Ground from "./ground";

const WIDTH = 800;
const HEIGHT = 700;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

// const Letree = new Branching({
//   startLenRange: [100, 150],
//   minBranchSize: 30,
//   bRange: [1, 3],
//   angleRange: { min: -(Math.PI / 4), max: Math.PI / 4 },
// });



////////////////////////////
const loader = PIXI.Loader.shared;
loader.onComplete.add(loaded);
loader.add("leef", "./assets/leaf.png");
loader.load();

let img;
function loaded() {
  const texture = loader.resources["leef"].texture;
  img = new PIXI.Sprite(texture);
  img.anchor.x = 0.5;
  img.anchor.y = 0.5;
  // app.stage.addChild(img);
  app.ticker.add(animate);
}

function animate() {
  img.x = app.renderer.screen.width / 2;
  img.y = app.renderer.screen.height / 2;
}
////////////////////////////
const graphics = new PIXI.Graphics();

document.addEventListener("keydown", () => {
  graphics.clear();
  graphics.lineStyle(3, 0xcccc00, 1);

  const { tree, leaves } = newAspen({ x: WIDTH / 2, y: HEIGHT }, 40);
  // leaves.forEach((e) => graphics.drawCircle(e.x, e.y, 2));
  // const { tree } = Letree.generate({ x: WIDTH / 2, y: HEIGHT });
  leaves.forEach((e) => {
    graphics.moveTo(e.x1, e.y1);
    graphics.lineTo(e.x2, e.y2);
  });

  const ground = new Ground([30, 100], 3, 0.4, 2, 9).generate(
    150.6,
    WIDTH,
    HEIGHT - 150
  );

  graphics.moveTo(0, HEIGHT - 150);
  ground.forEach((p) => graphics.lineTo(p.x, p.y));

  graphics.lineStyle(2, 0xffffff, 1);
  graphics.moveTo(WIDTH / 2, HEIGHT);
  tree.forEach((element) => {
    graphics.moveTo(element.x1, element.y1);
    graphics.lineTo(element.x2, element.y2);
  });

  app.stage.addChild(graphics);
});
