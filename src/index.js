// le main scene
// draws everything
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
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

const camera = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,
  interaction: app.renderer.plugins.interaction,
});
app.stage.addChild(camera);
camera.drag().wheel();

const state = {
  chunks: null,
  world: null,
};

// draw chunks from start to stop
function draw(start, stop) {
  if (!state.chunks) state.chunks = {};
  for (let i = start; i <= stop; i++) {
    // clean up trash
    if (camera.children[i] && i < start && i > stop) {
      camera.getChildByName(`${i}`).removeChild().destroy({ children: true });
      state.chunks[i] = null;
    }

    if (!state.chunks[i]) {
      const graphics = new PIXI.Graphics();
      graphics.name = `${i}`; // cant have negative child indexes :(
      // only negative indexes are drawn from the left
      const direction = start < 0 ? "L" : "R";
      state.chunks[i] = state.world.chunk(direction, i);
      const ground = state.chunks[i].ground;
      const trees = state.chunks[i].trees;

      graphics.lineStyle(3, state.chunks[i].biome.groundColor, 1);

      let moved = false;
      for (const x in ground) {
        if (!moved) graphics.moveTo(x * 1, ground[x]);
        graphics.lineTo(x * 1, ground[x]);
        moved = true;
      }
      for (const t of trees) {
        renderTree(t, graphics);
      }
      camera.addChild(graphics);
    }
  }
}

function renderTree(t, graphics) {
  graphics.lineStyle(3, t.branchColor, 1);
  t.branches.forEach((b) => {
    graphics.moveTo(b.x1, b.y1);
    graphics.lineTo(b.x2, b.y2);
  });

  if (!t.leaves) return;
  graphics.lineStyle(4, t.leafColor, 1);
  if (t.leafType === "point") {
    t.leaves.forEach((l) => graphics.drawCircle(l.x, l.y, 2));
  } else {
    t.leaves.forEach((l) => {
      graphics.moveTo(l.x1, l.y1);
      graphics.lineTo(l.x2, l.y2);
    });
  }
  if (!t.flowers) return;
  graphics.lineStyle(6, t.flowerColor, 1);
  t.flowers.forEach((f) => graphics.drawCircle(f.x, f.y, 3));
}

/* event handling zone */
camera.addListener("moved", (e) => {
  const start = Math.floor(e.viewport.left / 800);
  const stop = Math.floor(e.viewport.right / 800);
  draw(start, stop);
});

document.addEventListener("keydown", () => {
  state.world = new World(Math.random());
  state.chunks = null;
  camera.children.forEach((c) => {
    c.destroy({ children: true });
  });
  camera.children.length = 0;
  const start = Math.floor(camera.left / 800);
  const stop = Math.floor(camera.right / 800);
  draw(start, stop);
});

window.onload = () => {
  state.world = new World(Math.random());
  draw(0, 2);
};
