---
title: "physics2d"
custom_edit_url: null
---

# `physics2d`

The 2D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds.

10 functions, 5 constants. Scripts reach it as `physics2d::`.

Acts on [`body2d`](../components/body2d.md), [`collider2d`](../components/collider2d.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `add_body(node, string)` | [`body2d`](../components/body2d.md) | Give the node a 2D rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`). |
| `add_collider(node, any)` | [`collider2d`](../components/collider2d.md) | Attach a 2D collider from a `collider2d` table: `kind`, `radius`, `half_extents`, `friction`, and the rest of the component's own vocabulary. |
| `angular_velocity(node) -> float` | [`body2d`](../components/body2d.md) | How fast the body is spinning, in radians per second. |
| `apply_impulse(node, float, float)` | [`body2d`](../components/body2d.md) | Add an instant change in momentum, as if the body were struck. |
| `linear_velocity(node) -> float, float` | [`body2d`](../components/body2d.md) | How fast the body is travelling, in units per second. |
| `max_contact_impulse(node) -> float` | [`body2d`](../components/body2d.md) | The hardest contact this body took in the last step, zero when nothing touched it. |
| `overlaps(node) -> [node]` | [`collider2d`](../components/collider2d.md) | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
| `set_angular_velocity(node, float)` | [`body2d`](../components/body2d.md) | Set how fast the body spins, in radians per second. |
| `set_gravity(float, float)` | — | Set the 2D world's gravity, in units per second squared. |
| `set_linear_velocity(node, float, float)` | [`body2d`](../components/body2d.md) | Set how fast the body travels, in units per second. |

## Constants

| name | value |
| --- | --- |
| `BODY_DYNAMIC` | `dynamic` |
| `BODY_KINEMATIC` | `kinematic` |
| `BODY_STATIC` | `static` |
| `SHAPE_CIRCLE` | `circle` |
| `SHAPE_RECT` | `rect` |
