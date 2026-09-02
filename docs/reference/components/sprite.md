---
title: "sprite"
custom_edit_url: null
---

# `sprite`

`2d` · `render` · 9 properties · 2D

In a scene, `sprite` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `columns` | float | `0` | Sheet grid columns for flipbook sprites; 0 means a single image At least 0. |
| `flip_x` | bool | `false` | Mirror horizontally |
| `flip_y` | bool | `false` | Mirror vertically |
| `frame` | float | `0` | Current sheet cell, counted left-to-right then top-to-bottom At least 0. |
| `half_extents` | vec2 | `[0,0]` | Size override in world units; [0, 0] sizes from the texture |
| `pixels_per_unit` | float | `100` | Texture pixels per world unit At least 0.01. |
| `rows` | float | `0` | Sheet grid rows for flipbook sprites; 0 means a single image At least 0. |
| `texture` | string | — | Image file, project-relative; required |
