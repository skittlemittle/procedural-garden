/*L system
  alphabet is a string
  axiom is a string
  rules is an array of objects: [{condition: "A", result: "B"}, ...]

  alphabet:
  F: draw forward
  X: does nothing
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
    root = { x: 0, y: 0 },
    startLenRange = [100, 200],
    angle = 0,
  }) {
    this.axiom = axiom;
    this.rules = rules;
    this.root = root;
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

  _traceBranches(sentence = "", len = 0) {
    let prevNode = { ...this.root };
    let currBase;
    let node = { ...this.root };
    for (let i = 0; i < sentence.length; i++) {
      const curr = sentence.charAt(i);
      //TODO: goblinesque, redo
      if (curr === "F") {
        node = {
          x1: prevNode.x,
          y1: prevNode.y,
          x2: prevNode.x,
          y2: prevNode.y - len,
        };
        currBase = { ...node };
      } else if (curr === "+") {
        node = {
          x1: prevNode.x,
          y1: prevNode.y,
          x2: prevNode.x - len * Math.sin(this.angle),
          y2: prevNode.y - len * Math.cos(this.angle),
        };
        currBase = { ...node };
      } else if (curr === "-") {
        node = {
          x1: prevNode.x,
          y1: prevNode.y,
          x2: prevNode.x - len * Math.sin(-this.angle),
          y2: prevNode.y - len * Math.cos(-this.angle),
        };
        currBase = { ...node };
      } else if (curr === "[") {
        this.stack.push({ pos: { ...currBase } });
      } else if (curr === "]") {
        this.stack.pop();
        if (this.stack.top() !== undefined) currBase = this.stack.top().pos;
      }
      if (curr !== "X") {
        this.tree.push({ ...node });
        prevNode = {x: currBase.x2, y: currBase.y2};
      }
    }
  }

  /* ====Public methods==== */
  generate() {
    this.sentence = this._makeSentence(this.sentence);
    this._traceBranches(
      this.sentence,
      randomRange(this.startLenRange[0], this.startLenRange[1])
    );
    return this.tree;
  }
}
