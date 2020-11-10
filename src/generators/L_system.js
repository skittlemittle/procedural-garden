/*L system
  axiom is a string
  rules is an array of objects: [{condition: "A", results: ["B"]}, ...]
  you may pass multiple results to a rule, one will be picked randomly
  biased by its weight.
  weights should sum up to 1
  [{condition: "A", results: {"A":weight, "B":weight}}]

  alphabet:
  F: draw forward
  L: draw leaf
  +: turn left by <angle>
  -: turn right by <angle>
  [: push
  ]: pop

  alphabet stolen from: https://ameya98.github.io/WebPPL/generative_art/
 */

import { newStack, randomRange, weightedRand } from "../utils/misc";

export default class Lsystem {
  constructor({ axiom = "", rules = [], shrink = 0.9, angleRange = [] }) {
    this.axiom = axiom;
    this.rules = rules;
    this.angleRange = angleRange;
    this.shrink = shrink;

    this.stack = newStack();
    this.tree = []; // list of lines: {x1, y1, x2, y2}
    this.leaves = [];
  }

  // basically stolen from coding train
  _makeSentence(sentence) {
    let nextSentence = "";
    for (const curr of sentence) {
      let found = false;
      this.rules.forEach((rule) => {
        if (curr === rule.condition && !found) {
          found = true;
          nextSentence += weightedRand(rule.result);
        }
      });
      if (!found) nextSentence += curr;
    }
    return nextSentence;
  }

  //TODO: goblinesque, redo
  _traceBranches(root, sentence, startLen) {
    let prevBranch = { ...root };
    let angle = 0;
    let len = startLen;
    let currBase;
    for (const curr of sentence) {
      if (curr === "F") {
        const branch = {
          x1: prevBranch.x,
          y1: prevBranch.y,
          x2: prevBranch.x - len * Math.sin(angle),
          y2: prevBranch.y - len * Math.cos(angle),
        };
        this.tree.push({ ...branch });
        currBase = { ...branch };
        len *= this.shrink;
      } else if (curr === "L") {
        const leaf = {
          x1: prevBranch.x,
          y1: prevBranch.y,
          x2: prevBranch.x - len * Math.sin(angle),
          y2: prevBranch.y - len * Math.cos(angle),
        };
        this.leaves.push({ ...leaf });
        currBase = { ...leaf };
      } else if (curr === "+") {
        angle += randomRange(this.angleRange.min, this.angleRange.max);
      } else if (curr === "-") {
        angle -= randomRange(this.angleRange.min, this.angleRange.max);
      } else if (curr === "[") {
        this.stack.push({ pos: { ...currBase }, angle: angle, len: len });
      } else if (curr === "]") {
        const n = this.stack.pop();
        currBase = n.pos;
        angle = n.angle;
        len = n.len;
      }
      prevBranch = { x: currBase.x2, y: currBase.y2 };
    }
  }

  /* ====Public methods==== */
  generate(root = { x: 0, y: 0 }, passes = 4, startLenRange) {
    this.tree.length = 0;
    this.leaves.length = 0;
    let sentence = this.axiom;
    const bLen = randomRange(startLenRange[0], startLenRange[1]);

    for (let i = 0; i < passes; i++) sentence = this._makeSentence(sentence);

    this._traceBranches(root, sentence, bLen);
    return { branches: this.tree, leaves: this.leaves };
  }
}
