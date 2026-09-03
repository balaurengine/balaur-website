---
title: "collider2d"
custom_edit_url: null
---

# `collider2d`

`2d` · `physics` · 33 properties · 2D

The shape the node collides with in 2D. On a node with a `body2d` it is that body's shape; on a node without one it is immovable world geometry. A collider on a child node belongs to the nearest body above it, which is how one body carries several shapes.

In a scene, `collider2d` is the node key that applies it. A script reaches the same properties through `node.collider2d.get()` and `node.collider2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `a` | vec2 | `[0,0]` | First corner, when kind is triangle or segment |
| `active_collisions` | flags | `["dynamic_dynamic","dynamic_kinematic","dynamic_static"]` | Which pairs of body kinds this collider is tested against; a sensor watching kinematic platforms needs more than the default One of `dynamic_dynamic`, `dynamic_kinematic`, `dynamic_static`, `kinematic_kinematic`, `kinematic_static`, `static_static`. |
| `b` | vec2 | `[1,0]` | Second corner, when kind is triangle or segment |
| `border` | float | `0` | Rounds a rect or triangle by this radius, so it slides over seams instead of catching on them At least 0. |
| `c` | vec2 | `[0,1]` | Third corner, when kind is triangle |
| `contact_force_threshold` | float | `0` | How hard a contact must be before on_contact_force is called At least 0. |
| `contact_skin` | float | `0` | A margin the solver treats as already touching; stops thin shapes tunnelling and jittering At least 0. |
| `density` | float | `1` | Mass per volume, so the shape's size sets its mass At least 0.001. |
| `enabled` | bool | `true` | Collide at all; a disabled collider keeps its shape and costs nothing |
| `events` | flags | `[]` | What this collider reports to its node's script: on_collision_start and on_collision_stop, or on_contact_force One of `collision`, `contact_force`. |
| `friction` | float | `0.5` | Surface friction; 0 is ice At least 0. |
| `friction_combine` | enum | `average` | How this surface's friction combines with the other one's One of `average`, `min`, `multiply`, `max`, `clamped_sum`, `geometric_mean`. |
| `half_extents` | vec2 | `[0.5,0.5]` | Half-sizes of the rect, when kind is rect |
| `height` | float | `1` | Length along y of the straight part, when kind is capsule At least 0.01. |
| `heightfield` | asset · [`heightfield`](../assets/heightfield.md) | — | A row of heights, when kind is heightfield: a side-scroller's ground |
| `hooks` | flags | `[]` | Mid-step questions this collider asks its node's script; each costs a call per candidate pair per step One of `filter_contact`, `filter_overlap`, `modify_contacts`. |
| `kind` | enum | `rect` | Collision shape One of `circle`, `rect`, `capsule`, `triangle`, `segment`, `halfspace`, `trimesh`, `convex_hull`, `polyline`, `heightfield`. |
| `layers` | flags | `["0"]` | The layers this collider is on One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `mask` | flags | `[]` | The layers it collides with; empty means every layer One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `mass` | float | `0` | Mass in kilograms, overriding what density works out to; 0 keeps the density At least 0. |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Points and triangles for a trimesh, convex_hull or polyline collider: the same asset a polygon draws |
| `normal` | vec2 | `[0,1]` | Which way the infinite line faces, when kind is halfspace |
| `offset` | vec2 | `[0,0]` | Where the shape sits relative to the node |
| `offset_rotation` | float | `0` | How the shape is turned relative to the node, in radians |
| `one_way` | bool | `false` | A platform bodies pass through from below and land on from above |
| `one_way_axis` | vec2 | `[0,1]` | The direction a one-way platform lets bodies through from |
| `radius` | float | `0.5` | Circle radius, when kind is circle or capsule At least 0.01. |
| `restitution` | float | `0` | Bounciness: 0 is a dead stop, 1 a full rebound Range 0–1. |
| `restitution_combine` | enum | `average` | How this surface's bounciness combines with the other one's One of `average`, `min`, `multiply`, `max`, `clamped_sum`, `geometric_mean`. |
| `scale` | vec2 | `[1,1]` | Width and height scale of a heightfield |
| `sensor` | bool | `false` | Detects overlaps without colliding: bodies pass through and are reported |
| `solver_layers` | flags | `["0"]` | Layers for the solver alone: a pair can be detected but not resolved One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `solver_mask` | flags | `[]` | Which solver layers this one pushes against; empty means all of them One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |

Asset types this component references: [`heightfield`](../assets/heightfield.md), [`mesh`](../assets/mesh.md).

## Script functions

Methods of `node.collider2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics2d`](../modules/physics2d.md):

| method | what it does |
| --- | --- |
| `add_collider(any)` | Attach a 2D collider from a `collider2d` table: `kind`, `radius`, `half_extents`, `friction`, and the rest of the component's own vocabulary. |
| `overlaps() -> [node]` | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
