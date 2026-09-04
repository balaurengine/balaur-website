---
title: "wheel3d component"
image: "/img/social/reference.png"
sidebar_label: "wheel3d"
description: "One wheel of the vehicle3d above it. Where the node sits on the chassis is where the wheel's ray starts; the rest is suspension tuning. Drive it with…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M164,224H92c-28.72,0-52-43-52-96S63.28,32,92,32h72c-28.72,0-52,43-52,96S135.28,224,164,224Zm4-136c-8.84,0-16,17.91-16,40s7.16,40,16,40,16-17.91,16-40S176.84,88,168,88Z" opacity="0.2"/><path d="M149.26,159.26C155.09,173.82,163.5,176,168,176s12.91-2.18,18.74-16.74c3.39-8.48,5.26-19.58,5.26-31.26s-1.87-22.78-5.26-31.26C180.91,82.18,172.5,80,168,80s-12.91,2.18-18.74,16.74C145.87,105.22,144,116.32,144,128S145.87,150.78,149.26,159.26ZM168,96.2c2.62,2.06,8,13,8,31.8s-5.38,29.74-8,31.8c-2.62-2.06-8-13-8-31.8S165.38,98.26,168,96.2ZM232,216H196.41C213.12,197.73,224,165.47,224,128c0-58.32-26.35-104-60-104H92C58.35,24,32,69.68,32,128S58.35,232,92,232H232a8,8,0,0,0,0-16ZM193.74,63.93C202.93,80.91,208,103.67,208,128s-5.07,47.09-14.26,64.07C185.38,207.5,174.82,216,164,216s-21.38-8.5-29.74-23.93C125.07,175.09,120,152.33,120,128s5.07-47.09,14.26-64.07C142.62,48.5,153.18,40,164,40S185.38,48.5,193.74,63.93ZM48,128c0-2.5.07-5,.17-7.44L80,97.83l24.43,17.45c-.28,4.16-.43,8.41-.43,12.72a179.89,179.89,0,0,0,3.07,33.5l-22.42-16a8,8,0,0,0-9.3,0l-23.74,17A161,161,0,0,1,48,128ZM62.26,63.93C70.62,48.5,81.18,40,92,40h39.59c-11.9,13-20.84,33.12-25,57.16L84.65,81.49a8,8,0,0,0-9.3,0L50.49,99.25C52.85,86,56.83,74,62.26,63.93Zm0,128.14a100.08,100.08,0,0,1-5.94-13.32L80,161.83l33.94,24.24c4.6,12,10.6,22.22,17.65,29.93H92C81.18,216,70.62,207.5,62.26,192.07Z"/></svg></span>`wheel3d`

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
