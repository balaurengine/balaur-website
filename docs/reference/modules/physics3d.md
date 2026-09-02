---
title: "physics3d"
custom_edit_url: null
---

# `physics3d`

8 functions, 5 constants. Scripts reach it as `physics3d::`.

Acts on [`body3d`](../components/body3d.md), [`collider3d`](../components/collider3d.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `add_ball_collider(node, float)` | [`collider3d`](../components/collider3d.md) | Attach a sphere collider of the given radius. |
| `add_body(node, string)` | [`body3d`](../components/body3d.md) | Give the node a rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`). |
| `add_cuboid_collider(node, float, float, float)` | [`collider3d`](../components/collider3d.md) | Attach a box collider from its three half-extents. |
| `apply_impulse(node, float, float, float)` | [`body3d`](../components/body3d.md) | Add an instant change in momentum, as if the body were struck. |
| `linear_velocity(node) -> float, float, float` | [`body3d`](../components/body3d.md) | How fast the body is travelling, in units per second. |
| `overlaps(node) -> [node]` | [`collider3d`](../components/collider3d.md) | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
| `set_gravity(float, float, float)` | — | Set the 3D world's gravity, in units per second squared. |
| `set_linear_velocity(node, float, float, float)` | [`body3d`](../components/body3d.md) | Set how fast the body travels, in units per second. |

## Constants

| name | value |
| --- | --- |
| `BODY_DYNAMIC` | `dynamic` |
| `BODY_KINEMATIC` | `kinematic` |
| `BODY_STATIC` | `static` |
| `SHAPE_BALL` | `ball` |
| `SHAPE_CUBOID` | `cuboid` |
