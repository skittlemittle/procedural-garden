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
tree(root, height);
```

where `root` is a `{x, y}`

# Credits:

perlin noise: Joseph Gentle (https://github.com/josephg/noisejs)

L system rules: https://ameya98.github.io/WebPPL/generative_art/

# License:

MIT
