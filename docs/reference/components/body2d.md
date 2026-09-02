---
title: "body2d"
custom_edit_url: null
---

# `body2d`

`2d` · `physics` · 1 property · 2D

Makes the node a 2D rigid body rapier simulates: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. On its own a body has no shape; add a `collider2d` for it to collide with anything.

In a scene, `body2d` is the node key that applies it. A script reaches the same properties through `node.body2d.get()` and `node.body2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `kind` | enum | `dynamic` | How 2D physics drives the node: simulated, immovable, or moved by script One of `dynamic`, `static`, `kinematic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |

## Script functions

Methods of `node.body2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics2d`](../modules/physics2d.md):

| method | what it does |
| --- | --- |
| `add_body(string)` | Give the node a 2D rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`). |
| `angular_velocity() -> float` | How fast the body is spinning, in radians per second. |
| `apply_impulse(float, float)` | Add an instant change in momentum, as if the body were struck. |
| `linear_velocity() -> float, float` | How fast the body is travelling, in units per second. |
| `max_contact_impulse() -> float` | The hardest contact this body took in the last step, zero when nothing touched it. |
| `set_angular_velocity(float)` | Set how fast the body spins, in radians per second. |
| `set_linear_velocity(float, float)` | Set how fast the body travels, in units per second. |
