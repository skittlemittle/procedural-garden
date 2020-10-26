// le main scene
import * as PIXI from "pixi.js";

// import Branching from "./generators/Branching";
// import newOak from "./trees/oak";
import newAspen from "./trees/aspen";
import Ground from "./ground";

const WIDTH = 800;
const HEIGHT = 800;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

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
  const zoom = 150.6;
  graphics.clear();
  graphics.lineStyle(3, 0xcccc00, 1);

  const ground = new Ground(
    { min: 30, max: 100 },
    3,
    0.4,
    2,
    Math.random()
  ).generate(zoom, WIDTH, HEIGHT - 150);
  graphics.moveTo(0, HEIGHT - 150);
  for (const x in ground) graphics.lineTo(x * 1, ground[x]);

  const { tree, leaves } = newAspen({ x: 310, y: ground[310] }, 40);
  // leaves.forEach((e) => graphics.drawCircle(e.x, e.y, 2));
  leaves.forEach((e) => {
    graphics.moveTo(e.x1, e.y1);
    graphics.lineTo(e.x2, e.y2);
  });

  graphics.lineStyle(2, 0xffffff, 1);
  graphics.moveTo(WIDTH / 2, HEIGHT);
  tree.forEach((element) => {
    graphics.moveTo(element.x1, element.y1);
    graphics.lineTo(element.x2, element.y2);
  });

  app.stage.addChild(graphics);
});
