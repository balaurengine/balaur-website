---
title: "shape3d"
custom_edit_url: null
---

# `shape3d`

`3d` · `render` · 5 properties · 3D

In a scene, `shape3d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `half_extents` | vec3 | `[0.5,0.5,0.5]` | Half-sizes of the cuboid, when kind is cuboid |
| `height` | float | `1` | Length along y, for capsule, cylinder and cone At least 0.01. |
| `kind` | enum | `cuboid` | Rendered 3D shape One of `ball`, `cuboid`, `capsule`, `cylinder`, `cone`, `plane`. |
| `radius` | float | `0.5` | Radius, for every kind but cuboid At least 0.01. |
