---
title: "physics3d"
custom_edit_url: null
---

# `physics3d`

8 functions, 5 constants. Scripts reach it as `physics3d::`.

Acts on [`body3d`](../components/body3d.md), [`collider3d`](../components/collider3d.md).

## Functions

Argument kinds are the script values a call passes; `node` is a node handle, `any` a table or value of any kind.

- `add_ball_collider(node, float)`
- `add_body(node, string)`
- `add_cuboid_collider(node, float, float, float)`
- `apply_impulse(node, float, float, float)`
- `linear_velocity(node) -> float, float, float`
- `overlaps(node) -> [node]`
- `set_gravity(float, float, float)`
- `set_linear_velocity(node, float, float, float)`

## Constants

| name | value |
| --- | --- |
| `BODY_DYNAMIC` | `dynamic` |
| `BODY_KINEMATIC` | `kinematic` |
| `BODY_STATIC` | `static` |
| `SHAPE_BALL` | `ball` |
| `SHAPE_CUBOID` | `cuboid` |
