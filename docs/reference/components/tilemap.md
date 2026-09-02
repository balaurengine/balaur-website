---
title: "tilemap"
custom_edit_url: null
---

# `tilemap`

`2d` · `render` · 3 properties · 2D

A grid of tiles cut from one `tileset` atlas and centred on the node, one character per cell, drawn at `pixels_per_unit` tile-texture pixels per world unit.

In a scene, `tilemap` is the node key that applies it. A script reaches the same properties through `node.tilemap.get()` and `node.tilemap.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `cells` | string | — | Rows of tile characters, one row per line: . is empty, 0-9 then a-z index into the tileset |
| `pixels_per_unit` | float | `100` | Tile-texture pixels per world unit At least 0.01. |
| `tileset` | asset · [`tileset`](../assets/tileset.md) | — | The tileset naming the texture and tile grid |

Asset types this component references: [`tileset`](../assets/tileset.md).
