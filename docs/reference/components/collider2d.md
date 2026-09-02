---
title: "collider2d"
custom_edit_url: null
---

# `collider2d`

`2d` · `physics` · 8 properties · 2D

In a scene, `collider2d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `density` | float | `1` | Mass per area, so the shape's size sets its mass At least 0.001. |
| `friction` | float | `0.5` | Surface friction; 0 is ice At least 0. |
| `half_extents` | vec2 | `[0.5,0.5]` | Half-sizes of the rect, when kind is rect |
| `height` | float | `1` | Length along y of the straight part, when kind is capsule At least 0.01. |
| `kind` | enum | `rect` | Collision shape One of `circle`, `rect`, `capsule`. |
| `radius` | float | `0.5` | Circle radius, when kind is circle At least 0.01. |
| `restitution` | float | `0` | Bounciness: 0 is a dead stop, 1 a full rebound Range 0–1. |
| `sensor` | bool | `false` | Detects overlaps without colliding: bodies pass through and are reported |

## Script functions

Methods of `node.collider2d`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

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
