// space colonizing tree generator, based off codingtrains vid
// makes a tree given a "leaf space" which is just a 2d shape

import {
  vectorAdd,
  vectorDistance,
  vectorSubtract,
  normalize,
} from "../utils/misc";

export default class SpaceColonization {
  constructor({
    maxDist = 100,
    minDist = 20,
    flowerDensity = 1,
    branchLen = 10,
    leafDensity = 0.5,
  }) {
    this.minDist = minDist;
    this.maxDist = maxDist;
    this.branchLen = branchLen;
    this.leafDensity = leafDensity;
    this.flowerDensity = flowerDensity;

    this.attractors = [];
    this.tree = [];
    this.leaves = [];
    this.flowers = [];
    this._branches = [];
  }

  _newAttractor(x, y) {
    return { pos: { x: x, y: y }, reached: false };
  }

  // returns the next branch
  _newBranch(prevNode, direction, parent = null, len = this.branchLen) {
    const d = vectorAdd(prevNode, {
      x: direction.x * len,
      y: direction.y * len,
    });
    return {
      branch: { x1: prevNode.x, y1: prevNode.y, x2: d.x, y2: d.y },
      direction: direction,
      count: 0,
      parent: parent,
    };
  }

  _addOrgan(pos) {
    if (Math.random() % 2 > this.leafDensity) {
      this.leaves.push({ x: pos.x, y: pos.y });
    } else if (Math.random() % 2 > this.flowerDensity) {
      this.flowers.push({ x: pos.x, y: pos.y });
    }
  }

  // leaf attractors pull the closest branch towards themselves
  _grow() {
    for (const attractor of this.attractors) {
      let closestBranch = null;
      let record = this.maxDist;
      for (const branch of this._branches) {
        const dist = vectorDistance(attractor.pos, {
          x: branch.branch.x2,
          y: branch.branch.y2,
        });
        if (dist < this.minDist) {
          attractor.reached = true;
          closestBranch = null;
          break;
        } else if (dist < record) {
          closestBranch = branch;
          record = dist;
        }
      }
      if (closestBranch !== null) {
        const newDir = normalize(
          vectorSubtract(attractor.pos, {
            x: closestBranch.branch.x2,
            y: closestBranch.branch.y2,
          })
        );
        closestBranch.direction = vectorAdd(closestBranch.direction, newDir);
        closestBranch.count++;
      }
    }
    // cull attractors and add leaves
    for (let i = this.attractors.length - 1; i >= 0; i--) {
      if (this.attractors[i].reached) {
        // random chance for a "reached" attractor to become a leaf / flower
        this._addOrgan({ ...this.attractors[i].pos });
        this.attractors.splice(i, 1);
      }
    }
    // add new branches
    for (let i = this._branches.length - 1; i >= 0; i--) {
      const branch = this._branches[i];
      if (branch.count > 0) {
        const nextDir = normalize({
          x: branch.direction.x,
          y: branch.direction.y,
        });
        const nextBranch = this._newBranch(
          {
            x: branch.branch.x2,
            y: branch.branch.y2,
          },
          nextDir
        );
        this.tree.push(nextBranch.branch);
        this._branches.push(nextBranch);
        // reset
        branch.count = 0;
      }
    }
  }

  /* ====Public methods==== */
  generate(root = { x: 0, y: 0 }, attractors, iterations = 150) {
    this.tree.length = 0;
    this._branches.length = 0;
    this.leaves.length = 0;
    this.attractors.length = 0;

    // make attractor cluster
    for (const a of attractors)
      this.attractors.push(this._newAttractor(a.x, a.y));
    // init branch
    const firstB = this._newBranch({ x: root.x, y: root.y }, { x: 0, y: -1 });
    this.tree.push(firstB.branch);
    this._branches.push(firstB);

    for (let i = 0; i < iterations; i++) this._grow();
    return { branches: this.tree, leaves: this.leaves, flowers: this.flowers };
  }
}
