---
title: "body3d"
custom_edit_url: null
---

# `body3d`

`3d` · `physics` · 1 property · 3D

In a scene, `body3d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `kind` | enum | `dynamic` | How physics drives the node: simulated, immovable, or moved by script One of `dynamic`, `static`, `kinematic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |

## Script functions

Methods of `node.body3d`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

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
