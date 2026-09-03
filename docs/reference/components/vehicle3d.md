---
title: "vehicle3d"
custom_edit_url: null
---

# `vehicle3d`

`3d` · `physics` · 2 properties · 3D

Makes this node's body a car chassis, driven by the `wheel3d` children under it. Rapier casts a ray down from each wheel and pushes the chassis along a spring, which is how driving games model cars: it never jams and never tunnels.

In a scene, `vehicle3d` is the node key that applies it. A script reaches the same properties through `node.vehicle3d.get()` and `node.vehicle3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `forward_axis` | float | `2` | Which of the chassis's own axes points forward Range 0–2. |
| `up_axis` | float | `1` | Which of the chassis's own axes points up: 0 for x, 1 for y, 2 for z Range 0–2. |

## Script functions

Methods of `node.vehicle3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `vehicle_speed() -> float` | How fast the chassis is going along its forward axis, in units per second. |
