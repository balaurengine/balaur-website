---
title: "body2d"
custom_edit_url: null
---

# `body2d`

`2d` · `physics` · 1 property · 2D

In a scene, `body2d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `kind` | enum | `dynamic` | How 2D physics drives the node: simulated, immovable, or moved by script One of `dynamic`, `static`, `kinematic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |

## Script functions

Methods of `node.body2d`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics2d`](../modules/physics2d.md):

- `add_body(string)`
- `add_collider(any)`
- `angular_velocity() -> float`
- `apply_impulse(float, float)`
- `linear_velocity() -> float, float`
- `max_contact_impulse() -> float`
- `overlaps() -> [node]`
- `set_angular_velocity(float)`
- `set_linear_velocity(float, float)`

Module-level, not on the handle:

- `physics2d::set_gravity(float, float)`
