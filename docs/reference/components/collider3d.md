---
title: "collider3d"
custom_edit_url: null
---

# `collider3d`

`3d` · `physics` · 14 properties · 3D

In a scene, `collider3d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `a` | vec3 | `[0,0,0]` | First corner, when kind is triangle |
| `b` | vec3 | `[1,0,0]` | Second corner, when kind is triangle |
| `c` | vec3 | `[0,1,0]` | Third corner, when kind is triangle |
| `density` | float | `1` | Mass per volume, so the shape's size sets its mass At least 0.001. |
| `friction` | float | `0.5` | Surface friction; 0 is ice At least 0. |
| `half_extents` | vec3 | `[0.5,0.5,0.5]` | Half-sizes of the cuboid, when kind is cuboid |
| `height` | float | `1` | Length along y of the straight part, for capsule, cylinder and cone At least 0.01. |
| `heightfield` | asset · [`heightfield`](../assets/heightfield.md) | — | Terrain grid, when kind is heightfield |
| `kind` | enum | `cuboid` | Collision shape One of `ball`, `cuboid`, `capsule`, `cylinder`, `cone`, `triangle`, `trimesh`, `convex_hull`, `polyline`, `heightfield`. |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Geometry for a trimesh, convex_hull or polyline collider |
| `radius` | float | `0.5` | Radius, for ball, capsule, cylinder and cone At least 0.01. |
| `restitution` | float | `0` | Bounciness: 0 is a dead stop, 1 a full rebound Range 0–1. |
| `scale` | vec3 | `[1,1,1]` | Cell size and height scale of a heightfield |
| `sensor` | bool | `false` | Detects overlaps without colliding: bodies pass through and are reported |

Asset types this component references: [`heightfield`](../assets/heightfield.md), [`mesh`](../assets/mesh.md).

## Script functions

Methods of `node.collider3d`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

- `add_ball_collider(float)`
- `add_body(string)`
- `add_cuboid_collider(float, float, float)`
- `apply_impulse(float, float, float)`
- `linear_velocity() -> float, float, float`
- `overlaps() -> [node]`
- `set_linear_velocity(float, float, float)`

Module-level, not on the handle:

- `physics3d::set_gravity(float, float, float)`
