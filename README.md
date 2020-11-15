# Procedural Garden

Procedurally generated forrests.

![imag](https://raw.githubusercontent.com/skittlemittle/procedural-garden/main/scren.png)

---

- `npm i`

- `npm run build`

- host `build/`

# "Documentation:"

**Chunks:**

the list of chunks

example:

```json
{
  "index": {
    "biome": {
      "name": "hills",
      "groundColor": 0x009933
    },
    "ground": {},
    "trees": [],
    "shrubs": []
  }
}
```

---

**Tree "API":**

```js
tree((root = { x, y }), height);
```

generates the tree.

returns:

- leafColor: hex color code

- branchColor: hex color code

- branches: a list of lines

- leaves: a list of lines or points

# Credits:

perlin noise: Joseph Gentle (https://github.com/josephg/noisejs)

L system rules: https://ameya98.github.io/WebPPL/generative_art/

# License:

MIT
