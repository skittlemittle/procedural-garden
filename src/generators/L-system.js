/*L system
  alphabet is a string
  axiom is a string
  rules is an array of objects: [{condition: "A", result: ["B"]}, ...]
  you may pass multiple results to a rule, one will be picked at random
  [{condition: "A", result: ["A", "B"]}]

  alphabet:
  F: draw forward
  +: turn left by <angle>
  -: turn right by <angle>
  [: push
  ]: pop
 */

import { newStack, randomRange } from "../utils/utils";

export default class Lsystem {
  constructor({
    axiom = "",
    rules = [],
    startLenRange = [100, 200],
    angleRange = [],
  }) {
    this.axiom = axiom;
    this.rules = rules;
    this.startLenRange = startLenRange;
    this.angleRange = angleRange;

    this.stack = newStack();
    this.sentence = axiom;
    this.tree = []; // list of lines: {x1, y1, x2, y2}
  }

  // basically stolen from coding train
  _makeSentence(sentence = "") {
    let nextSentence = "";
    for (const curr of sentence) {
      let found = false;
      this.rules.forEach((rule) => {
        if (curr === rule.condition && !found) {
          found = true;
          const res =
            rule.result[Math.round(randomRange(0, rule.result.length - 1))];
          nextSentence += res;
        }
      });
      if (!found) nextSentence += curr;
    }
    return nextSentence;
  }

  //TODO: goblinesque, redo
  _traceBranches(root, sentence = "", len = 0) {
    let prevBranch = { ...root };
    let branch, currBase;
    let angle = 0;
    for (const curr of sentence) {
      if (curr === "F") {
        branch = {
          x1: prevBranch.x,
          y1: prevBranch.y,
          x2: prevBranch.x - len * Math.sin(angle),
          y2: prevBranch.y - len * Math.cos(angle),
        };
        this.tree.push({ ...branch });
        currBase = { ...branch };
      } else if (curr === "+") {
        angle += randomRange(this.angleRange.min, this.angleRange.max);
      } else if (curr === "-") {
        angle -= randomRange(this.angleRange.min, this.angleRange.max);
      } else if (curr === "[") {
        this.stack.push({ pos: { ...currBase }, angle: angle });
      } else if (curr === "]") {
        const n = this.stack.pop();
        currBase = n.pos;
        angle = n.angle;
      }
      prevBranch = { x: currBase.x2, y: currBase.y2 };
    }
  }

  /* ====Public methods==== */
  generate(root = { x: 0, y: 0 }, passes = 4) {
    this.tree = [];
    this.sentence = this.axiom;

    let bLen = randomRange(this.startLenRange[0], this.startLenRange[1]);
    for (let i = 0; i < passes; i++) {
      this.sentence = this._makeSentence(this.sentence);
      this._traceBranches(root, this.sentence, bLen);
      bLen *= randomRange(0.6, 1);
    }

    return this.tree;
  }
}
