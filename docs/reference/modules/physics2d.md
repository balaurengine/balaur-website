---
title: "physics2d"
custom_edit_url: null
---

# `physics2d`

10 functions, 5 constants. Scripts reach it as `physics2d::`.

Acts on [`body2d`](../components/body2d.md), [`collider2d`](../components/collider2d.md).

## Functions

Argument kinds are the script values a call passes; `node` is a node handle, `any` a table or value of any kind.

- `add_body(node, string)`
- `add_collider(node, any)`
- `angular_velocity(node) -> float`
- `apply_impulse(node, float, float)`
- `linear_velocity(node) -> float, float`
- `max_contact_impulse(node) -> float`
- `overlaps(node) -> [node]`
- `set_angular_velocity(node, float)`
- `set_gravity(float, float)`
- `set_linear_velocity(node, float, float)`

## Constants

| name | value |
| --- | --- |
| `BODY_DYNAMIC` | `dynamic` |
| `BODY_KINEMATIC` | `kinematic` |
| `BODY_STATIC` | `static` |
| `SHAPE_CIRCLE` | `circle` |
| `SHAPE_RECT` | `rect` |
