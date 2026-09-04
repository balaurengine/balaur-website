---
title: "wheel3d component"
sidebar_label: "wheel3d"
description: "One wheel of the vehicle3d above it. Where the node sits on the chassis is where the wheel's ray starts; the rest is suspension tuning. Drive it with…"
custom_edit_url: null
---

# `wheel3d`

`3d` · `physics` · 11 properties · 3D

One wheel of the `vehicle3d` above it. Where the node sits on the chassis is where the wheel's ray starts; the rest is suspension tuning. Drive it with `physics3d.set_engine_force`, `set_brake` and `set_steering`.

In a scene, `wheel3d` is the node key that applies it. A script reaches the same properties through `node.wheel3d.get()` and `node.wheel3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `axle` | vec3 | `[-1,0,0]` | The axle the wheel turns about, in the chassis's own space |
| `compression` | float | `0.82` | Damping while the suspension is being squashed At least 0. |
| `damping` | float | `0.88` | Damping while the suspension is coming back At least 0. |
| `direction` | vec3 | `[0,-1,0]` | Which way the suspension pushes, in the chassis's own space: down |
| `friction_slip` | float | `10.5` | Grip along the wheel's rolling direction; lower slides more At least 0. |
| `max_force` | float | `6000` | The most force this suspension may push the chassis with At least 0. |
| `max_travel` | float | `5` | How far the suspension may move in total At least 0. |
| `radius` | float | `0.4` | The wheel's radius, which is how far off the ground it holds the ray's end At least 0.01. |
| `rest_length` | float | `0.3` | How long the suspension is with no weight on it At least 0. |
| `side_friction` | float | `1` | Grip sideways: what stops the car sliding out of a corner At least 0. |
| `stiffness` | float | `30` | Spring stiffness: higher is a stiffer, twitchier car At least 0. |

## Script functions

Methods of `node.wheel3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `set_brake(float)` | How hard this wheel brakes. |
| `set_engine_force(float)` | How hard this wheel drives, in newtons; negative reverses. |
| `set_steering(float)` | Turn this wheel, in radians. |
| `wheel_state() -> any` | What the last step did with this wheel: `#{ rotation, suspension_force, grounded, engine_force, brake, steering }`. |
