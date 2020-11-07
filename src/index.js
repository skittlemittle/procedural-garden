// le main scene
// draws everything

import * as PIXI from "pixi.js";

import World from "./terrain/makeWorld";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

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

// ghetto drawing loop
document.addEventListener("keydown", () => {
  const chunks = {};
  const world = new World(5, Math.random());
  chunks[0] = world.chunk("R", 0);

  const ground = chunks[0].ground;
  const trees = chunks[0].trees;

  graphics.clear();
  graphics.lineStyle(3, 0x00cc00, 1);

  for (const x in ground) graphics.lineTo(x * 1, ground[x]);
  for (const t of trees) {
    const { branches, leaves } = t;

    graphics.lineStyle(3, 0xcccc00, 1);
    // leaves.forEach((e) => graphics.drawCircle(e.x, e.y, 2));
    leaves.forEach((e) => {
      graphics.moveTo(e.x1, e.y1);
      graphics.lineTo(e.x2, e.y2);
    });

    graphics.lineStyle(2, 0xffffff, 1);
    graphics.moveTo(WIDTH / 2, HEIGHT);
    branches.forEach((element) => {
      graphics.moveTo(element.x1, element.y1);
      graphics.lineTo(element.x2, element.y2);
    });
  }
  app.stage.addChild(graphics);
});
