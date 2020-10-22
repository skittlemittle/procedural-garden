// space colonizing tree generator, based off codingtrains vid
// makes a tree given a "leaf space" which is just a 2d shape

import {
  randomRange,
  vectorAdd,
  vectorDistance,
  vectorSubtract,
  normalize,
} from "../utils/utils";

function newLeaf(x, y) {
  return { pos: { x: x, y: y }, reached: false };
}

// returns the next branch
function newBranch(prevNode, direction, len = 10) {
  const d = vectorAdd(prevNode, { x: direction.x * len, y: direction.y * len });
  return {
    branch: { x1: prevNode.x, y1: prevNode.y, x2: d.x, y2: d.y },
    direction: direction,
    count: 0,
  };
}

export default class SpaceColonization {
  constructor(
    leafBlob = {
      poly: null,
      r: -1,
      center: { x: 0, y: 0 },
      numLeaves: 300,
    },
    minDist = 20,
    maxDist = 400
  ) {
    this.leafBlob = leafBlob;
    this.minDist = minDist;
    this.maxDist = maxDist;

    this.leaves = [];
    this.tree = [];
    this._branches = [];
  }

  // scatter leaf attractors in a given "blob" polygon
  _scatterLeaves({poly, r, center, numLeaves = 300}) {
    const leaves = [];
    for (let i = 0; i < numLeaves; i++) {
      const angle = randomRange(0, 2 * Math.PI);
      const dist = Math.sqrt(Math.random()) * r; // we want an even distribution
      const leaf = {
        x: dist * Math.cos(angle) + center.x,
        y: dist * Math.sin(angle) + center.y,
      };
      if (poly.contains(leaf.x, leaf.y)) leaves.push(leaf);
    }
    return leaves;
  }

  // leaves pull the closest branch towards themselves
  _grow() {
    for (const leaf of this.leaves) {
      let closestBranch = null;
      let record = this.maxDist;
      for (const branch of this._branches) {
        const dist = vectorDistance(leaf.pos, {
          x: branch.branch.x2,
          y: branch.branch.y2,
        });
        if (dist < this.minDist) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (dist < record) {
          closestBranch = branch;
          record = dist;
        }
      }
      if (closestBranch !== null) {
        const newDir = normalize(
          vectorSubtract(leaf.pos, {
            x: closestBranch.branch.x2,
            y: closestBranch.branch.y2,
          })
        );
        closestBranch.direction = vectorAdd(closestBranch.direction, newDir);
        closestBranch.count++;
      }
    }
    // cull leaves
    for (let i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) this.leaves.splice(i, 1);
    }
    // add new branches
    for (let i = this._branches.length - 1; i >= 0; i--) {
      const branch = this._branches[i];
      if (branch.count > 0) {
        const nextDir = normalize({
          x: branch.direction.x,
          y: branch.direction.y,
        });
        const nextBranch = newBranch(
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
  generate(root = { x: 0, y: 0 }) {
    this.tree.length = 0;
    this._branches.length = 0;
    this.leaves.length = 0;

    // make leef clusters
    const leaves = this._scatterLeaves(this.leafBlob);
    for (const l of leaves) this.leaves.push(newLeaf(l.x, l.y));
    // init branch
    const firstB = newBranch({ x: root.x, y: root.y }, { x: 0, y: -1 });
    this.tree.push(firstB.branch);
    this._branches.push(firstB);

    // grow the beginning "trunk" straight up
    let found = false;
    let currB = firstB;
    while (!found) {
      for (const leaf of this.leaves) {
        const dist = vectorDistance(
          { x: currB.branch.x2, y: currB.branch.y2 },
          leaf.pos
        );
        if (dist < this.maxDist) found = true;
      }
      if (!found) {
        currB = newBranch(
          { x: currB.branch.x2, y: currB.branch.y2 },
          { x: 0, y: -1 }
        );
        this.tree.push(currB.branch);
        this._branches.push(currB);
      }
    }

    for (let i = 0; i < 100; i++) this._grow(); // TODO: AAAAAAAAAAAAAAAAAAAAAA
    return this.tree;
  }
}
