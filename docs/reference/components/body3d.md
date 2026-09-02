---
title: "body3d"
custom_edit_url: null
---

# `body3d`

`3d` · `physics` · 1 property · 3D

Makes the node a 3D rigid body rapier simulates: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. On its own a body has no shape; add a `collider3d` for it to collide with anything.

In a scene, `body3d` is the node key that applies it. A script reaches the same properties through `node.body3d.get()` and `node.body3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `kind` | enum | `dynamic` | How physics drives the node: simulated, immovable, or moved by script One of `dynamic`, `static`, `kinematic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |

## Script functions

Methods of `node.body3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `add_body(string)` | Give the node a rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`). |
| `apply_impulse(float, float, float)` | Add an instant change in momentum, as if the body were struck. |
| `linear_velocity() -> float, float, float` | How fast the body is travelling, in units per second. |
| `set_linear_velocity(float, float, float)` | Set how fast the body travels, in units per second. |
