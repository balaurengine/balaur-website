---
title: "tilemap"
custom_edit_url: null
---

# `tilemap`

`2d` · `render` · 3 properties · 2D

In a scene, `tilemap` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `cells` | string | — | Rows of tile characters, one row per line: . is empty, 0-9 then a-z index into the tileset |
| `pixels_per_unit` | float | `100` | Tile-texture pixels per world unit At least 0.01. |
| `tileset` | asset · [`tileset`](../assets/tileset.md) | — | The tileset naming the texture and tile grid |

Asset types this component references: [`tileset`](../assets/tileset.md).
