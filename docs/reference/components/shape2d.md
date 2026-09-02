---
title: "shape2d"
custom_edit_url: null
---

# `shape2d`

`2d` · `render` · 8 properties · 2D

In a scene, `shape2d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `closed` | bool | `false` | Join the last point back to the first, making a polygon outline |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `half_extents` | vec2 | `[0.5,0.5]` | Half-sizes of the rect, when kind is rect |
| `height` | float | `1` | Length along y of the straight part, when kind is capsule At least 0.01. |
| `kind` | enum | `rect` | Rendered 2D shape One of `circle`, `rect`, `capsule`, `polyline`. |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Points of a polyline, taken from a mesh asset's vertices |
| `radius` | float | `0.5` | Radius, when kind is circle or capsule At least 0.01. |
| `width` | float | `0.02` | Line thickness in world units, when kind is polyline At least 0.001. |

Asset types this component references: [`mesh`](../assets/mesh.md).
