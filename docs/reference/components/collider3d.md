---
title: "collider3d component"
image: "/img/social/reference.png"
sidebar_label: "collider3d"
description: "The shape the node collides with in 3D. On a node with a body3d it is that body's shape; on a node without one it is immovable world geometry. A collider…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40V216H40V40Z" opacity="0.2"/><path d="M152,40a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,40Zm-8,168H112a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM208,32H184a8,8,0,0,0,0,16h24V72a8,8,0,0,0,16,0V48A16,16,0,0,0,208,32Zm8,72a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V112A8,8,0,0,0,216,104Zm0,72a8,8,0,0,0-8,8v24H184a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V184A8,8,0,0,0,216,176ZM40,152a8,8,0,0,0,8-8V112a8,8,0,0,0-16,0v32A8,8,0,0,0,40,152Zm32,56H48V184a8,8,0,0,0-16,0v24a16,16,0,0,0,16,16H72a8,8,0,0,0,0-16ZM72,32H48A16,16,0,0,0,32,48V72a8,8,0,0,0,16,0V48H72a8,8,0,0,0,0-16Z"/></svg></span>`collider3d`

`3d` · `physics` · 40 properties · 3D

The shape the node collides with in 3D. On a node with a `body3d` it is that body's shape; on a node without one it is immovable world geometry. A collider on a child node belongs to the nearest body above it, which is how one body carries several shapes.

In a scene, `collider3d` is the node key that applies it. A script reaches the same properties through `node.collider3d.get()` and `node.collider3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `a` | vec3 | `[0,0,0]` | First corner, when kind is triangle or segment |
| `active_collisions` | flags | `["dynamic_dynamic","dynamic_kinematic","dynamic_static"]` | Which pairs of body kinds this collider is tested against; a sensor watching kinematic platforms needs more than the default One of `dynamic_dynamic`, `dynamic_kinematic`, `dynamic_static`, `kinematic_kinematic`, `kinematic_static`, `static_static`. |
| `b` | vec3 | `[1,0,0]` | Second corner, when kind is triangle or segment |
| `border` | float | `0` | Rounds a cuboid, cylinder, cone or triangle by this radius; a rounded shape slides over seams instead of catching on them At least 0. |
| `c` | vec3 | `[0,1,0]` | Third corner, when kind is triangle |
| `clean` | bool | `false` | Drop duplicate vertices and degenerate triangles when building a trimesh |
| `contact_force_threshold` | float | `0` | How hard a contact must be before on_contact_force is called At least 0. |
| `contact_skin` | float | `0` | A margin the solver treats as already touching; stops thin shapes tunnelling and jittering At least 0. |
| `density` | float | `1` | Mass per volume, so the shape's size sets its mass At least 0.001. |
| `enabled` | bool | `true` | Collide at all; a disabled collider keeps its shape and costs nothing |
| `events` | flags | `[]` | What this collider reports to its node's script: on_collision_start and on_collision_stop, or on_contact_force One of `collision`, `contact_force`. |
| `fill` | enum | `solid` | Whether voxelizing a mesh fills its inside or only its shell One of `solid`, `surface`. |
| `fit` | enum | `convex_hull` | The shape fitted to the mesh, when kind is fit One of `convex_hull`, `aabb`, `obb`, `convex_decomposition`. |
| `fix_internal_edges` | bool | `true` | Smooth the seams between a trimesh's triangles, so a character does not catch on flat ground |
| `friction` | float | `0.5` | Surface friction; 0 is ice At least 0. |
| `friction_combine` | enum | `average` | How this surface's friction combines with the other one's One of `average`, `min`, `multiply`, `max`, `clamped_sum`, `geometric_mean`. |
| `half_extents` | vec3 | `[0.5,0.5,0.5]` | Half-sizes of the cuboid, when kind is cuboid |
| `height` | float | `1` | Length along y of the straight part, for capsule, cylinder and cone At least 0.01. |
| `heightfield` | asset · [`heightfield`](../assets/heightfield.md) | — | Terrain grid, when kind is heightfield |
| `hooks` | flags | `[]` | Mid-step questions this collider asks its node's script; each costs a call per candidate pair per step One of `filter_contact`, `filter_overlap`, `modify_contacts`. |
| `kind` | enum | `cuboid` | Collision shape One of `ball`, `cuboid`, `capsule`, `cylinder`, `cone`, `triangle`, `segment`, `halfspace`, `trimesh`, `convex_hull`, `convex_decomposition`, `polyline`, `heightfield`, `voxels`, `voxelized_mesh`, `fit`. |
| `layers` | flags | `["0"]` | The layers this collider is on One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `mask` | flags | `[]` | The layers it collides with; empty means every layer One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `mass` | float | `0` | Mass in kilograms, overriding what density works out to; 0 keeps the density At least 0. |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Geometry for a trimesh, convex_hull or polyline collider |
| `normal` | vec3 | `[0,1,0]` | Which way the infinite plane faces, when kind is halfspace |
| `offset` | vec3 | `[0,0,0]` | Where the shape sits relative to the node |
| `offset_rotation` | vec3 | `[0,0,0]` | How the shape is turned relative to the node, in radians |
| `one_way` | bool | `false` | A platform bodies pass through from below and land on from above |
| `one_way_axis` | vec3 | `[0,1,0]` | The direction a one-way platform lets bodies through from |
| `oriented` | bool | `false` | Treat the trimesh as a closed, outward-facing surface, which makes inside and outside meaningful |
| `radius` | float | `0.5` | Radius, for ball, capsule, cylinder and cone At least 0.01. |
| `restitution` | float | `0` | Bounciness: 0 is a dead stop, 1 a full rebound Range 0–1. |
| `restitution_combine` | enum | `average` | How this surface's bounciness combines with the other one's One of `average`, `min`, `multiply`, `max`, `clamped_sum`, `geometric_mean`. |
| `scale` | vec3 | `[1,1,1]` | Cell size and height scale of a heightfield |
| `sensor` | bool | `false` | Detects overlaps without colliding: bodies pass through and are reported |
| `solver_layers` | flags | `["0"]` | Layers for the solver alone: a pair can be detected but not resolved One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `solver_mask` | flags | `[]` | Which solver layers this one pushes against; empty means all of them One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `voxel_size` | float | `0.25` | How big one cell is, when kind is voxelized_mesh At least 0.001. |
| `voxels` | asset · [`voxels`](../assets/voxels.md) | — | Filled cells, when kind is voxels; a script may dig into them while the game runs |

Asset types this component references: [`heightfield`](../assets/heightfield.md), [`mesh`](../assets/mesh.md), [`voxels`](../assets/voxels.md).

## Script functions

Methods of `node.collider3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `aabb() -> float, float, float, float, float, float` | The world-space box the collider currently occupies, as its two opposite corners. |
| `add_ball_collider(float)` | Attach a sphere collider of the given radius. |
| `add_cuboid_collider(float, float, float)` | Attach a box collider from its three half-extents. |
| `collider_mass() -> float` | What this collider weighs, density and size together. |
| `collider_mesh() -> any` | The collider's shape as points and triangles — including a voxel grid's — for drawing it or for spawning the pieces it broke into. |
| `collider_volume() -> float` | How much space the shape encloses. |
| `contacts() -> any` | Every contact point on this node's collider this step: `#{ node, point, normal, impulse }` each. Empty for a sensor, which has no contacts by definition. |
| `handles() -> any` | The rapier handles behind this node — its body and its colliders — as `#{ body, colliders }` of index and generation pairs. For matching a log line against rapier's own output. |
| `max_contact_impulse() -> float` | The hardest contact this node took in the last step, zero when nothing touched it: a damage threshold in one number. |
| `overlaps() -> [node]` | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
| `set_collider(any)` | Replace the node's collider from a `collider3d` table: `kind`, `radius`, `half_extents`, `friction`, and the rest of the component's own vocabulary. |
| `set_voxel(int, int, int, bool)` | Fill or empty one cell of a voxel collider: digging a hole, or building a wall, while the game runs. |
| `swept_aabb() -> float, float, float, float, float, float` | The box the collider covers over the next step, its motion included: what the broad phase actually tests. |
| `voxel(int, int, int) -> bool` | Whether one cell of a voxel collider is filled. |
| `voxel_at(float, float, float) -> int, int, int` | The cell a world position falls in, as three whole numbers. |
