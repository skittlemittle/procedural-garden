/*L system
  alphabet is a string
  axiom is a string
  rules is an array of objects: [{condition: "A", result: "B"}, ...]

  alphabet:
  F: draw forward
  +: turn left by <angle>
  -: turn right by <angle>
  [: push
  ]: pop
 */

import { newStack, randomRange } from "../utils";

export default class Lsystem {
  constructor({
    axiom = "",
    rules = [],
    startLenRange = [100, 200],
    angle = 0,
  }) {
    this.axiom = axiom;
    this.rules = rules;
    this.startLenRange = startLenRange;
    this.angle = angle;

    this.dFunctions = {
      F: () => 0,
      X: () => -1,
    };
    this.stack = newStack();
    this.sentence = axiom;
    this.tree = []; // list of lines: {x1, y1, x2, y2}
  }

  // basically stolen from coding train
  _makeSentence(sentence = "") {
    let nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
      const curr = sentence.charAt(i);
      let found = false;
      this.rules.forEach((rule) => {
        if (curr === rule.condition && !found) {
          found = true;
          nextSentence += rule.result;
        }
      });
      if (!found) nextSentence += curr;
    }
    return nextSentence;
  }

  //TODO: goblinesque, redo
  _traceBranches(root, sentence = "", len = 0) {
    let prevNode = { ...root };
    let node, currBase;
    let angle = 0;
    for (let i = 0; i < sentence.length; i++) {
      const curr = sentence.charAt(i);
      if (curr === "F") {
        node = {
          x1: prevNode.x,
          y1: prevNode.y,
          x2: prevNode.x - len * Math.sin(angle),
          y2: prevNode.y - len * Math.cos(angle),
        };
        this.tree.push({ ...node });
        currBase = { ...node };
      } else if (curr === "+") {
        angle += this.angle;
      } else if (curr === "-") {
        angle -= this.angle;
      } else if (curr === "[") {
        this.stack.push({ pos: { ...currBase }, angle: angle });
      } else if (curr === "]") {
        const n = this.stack.pop();
        currBase = n.pos;
        angle = n.angle;
      }
      prevNode = { x: currBase.x2, y: currBase.y2 };
    }
  }

  /* ====Public methods==== */
  generate(root = { x: 0, y: 0 }, passes = 3) {
    this.tree = [];
    this.sentence = this.axiom;

    let bLen = randomRange(this.startLenRange[0], this.startLenRange[1]);
    for (let i = 0; i < passes; i++) {
      this.sentence = this._makeSentence(this.sentence);
      this._traceBranches(root, this.sentence, bLen);
      bLen *= 0.7;
    }

    return this.tree;
  }
}
