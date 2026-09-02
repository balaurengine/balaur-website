---
title: "collider3d"
custom_edit_url: null
---

# `collider3d`

`3d` · `physics` · 14 properties · 3D

The shape the 3D physics world sees for this node, and the surface it presents: friction, bounciness and density. With a `body3d` it moves with the body; on its own it is static geometry a scene can be built from. A sensor reports overlaps without pushing anything.

In a scene, `collider3d` is the node key that applies it. A script reaches the same properties through `node.collider3d.get()` and `node.collider3d.set(table)`.

## Properties

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

Methods of `node.collider3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `add_ball_collider(float)` | Attach a sphere collider of the given radius. |
| `add_cuboid_collider(float, float, float)` | Attach a box collider from its three half-extents. |
| `overlaps() -> [node]` | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
