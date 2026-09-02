---
title: "polygon"
custom_edit_url: null
---

# `polygon`

`2d` · `render` · `animation` · 5 properties · 2D

In a scene, `polygon` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[1,1,1,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Vertices, triangulation, UVs and skin weights; positions are [x, y] in the node's space |
| `pixels_per_unit` | float | `100` | Texture pixels per world unit, for the default UV mapping At least 0.01. |
| `skeleton` | string | — | Node path to the rig root, relative to this node; empty means this node |
| `texture` | string | — | Image file, project-relative; empty draws the tint alone |

Asset types this component references: [`mesh`](../assets/mesh.md).
