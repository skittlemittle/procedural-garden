// le main scene
// MIT
import * as PIXI from 'pixi.js';

import Tree from "./models/Tree";
import { newStack } from './utils';

const WIDTH = 800;
const HEIGHT = 750;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

// global state, weirdchamp :(
export const State = {
  trStack: newStack(),
};

// render loop
app.ticker.add(() => {
  // kira.rotation += 0.01;
});

const graphics = new PIXI.Graphics();
const Letree = new Tree({root: {x: WIDTH / 2, y: HEIGHT}});
const branches = Letree.generate()
console.log(branches);

graphics.lineStyle(1, 0xffffff, 1);
graphics.moveTo(WIDTH/2, HEIGHT);

branches.forEach(element => {
  graphics.moveTo(element.x1, element.y1);
  graphics.lineTo(element.x2, element.y2);
});

app.stage.addChild(graphics);

