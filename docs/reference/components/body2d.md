---
title: "body2d component"
image: "/img/social/reference.png"
sidebar_label: "body2d"
description: "Makes the node a 2D rigid body rapier simulates, in the xy plane: dynamic falls and responds to forces, static never moves, kinematic is moved by script…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M210.26,210.26c-17.23,17.23-68-5.63-113.46-51.06S28.51,63,45.74,45.74s68,5.63,113.46,51.06S227.49,193,210.26,210.26Z" opacity="0.2"/><path d="M196.12,128c24.65-34.61,37.22-70.38,19.74-87.86S162.61,35.23,128,59.88C93.39,35.23,57.62,22.66,40.14,40.14S35.23,93.39,59.88,128c-24.65,34.61-37.22,70.38-19.74,87.86h0c5.63,5.63,13.15,8.14,21.91,8.14,18.48,0,42.48-11.17,66-27.88C151.47,212.83,175.47,224,194,224c8.76,0,16.29-2.52,21.91-8.14h0C233.34,198.38,220.77,162.61,196.12,128Zm8.43-76.55c7.64,7.64,2.48,32.4-18.52,63.28a300.33,300.33,0,0,0-21.19-23.57A300.33,300.33,0,0,0,141.27,70C172.15,49,196.91,43.8,204.55,51.45ZM176.29,128a289.14,289.14,0,0,1-22.76,25.53A289.14,289.14,0,0,1,128,176.29a289.14,289.14,0,0,1-25.53-22.76A289.14,289.14,0,0,1,79.71,128,298.62,298.62,0,0,1,128,79.71a289.14,289.14,0,0,1,25.53,22.76A289.14,289.14,0,0,1,176.29,128ZM51.45,51.45c2.2-2.21,5.83-3.35,10.62-3.35C73.89,48.1,92.76,55,114.72,70A304,304,0,0,0,91.16,91.16,300.33,300.33,0,0,0,70,114.73C49,83.85,43.81,59.09,51.45,51.45Zm0,153.1C43.81,196.91,49,172.15,70,141.27a300.33,300.33,0,0,0,21.19,23.57A304.18,304.18,0,0,0,114.73,186C83.85,207,59.09,212.2,51.45,204.55Zm153.1,0c-7.64,7.65-32.4,2.48-63.28-18.52a304.18,304.18,0,0,0,23.57-21.19A300.33,300.33,0,0,0,186,141.27C207,172.15,212.19,196.91,204.55,204.55ZM140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"/></svg></span>`body2d`

`2d` · `physics` · 18 properties · 2D

Makes the node a 2D rigid body rapier simulates, in the xy plane: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. Add a `collider2d` for it to collide with anything.

In a scene, `body2d` is the node key that applies it. A script reaches the same properties through `node.body2d.get()` and `node.body2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `angular_damping` | float | `0` | Drag on spin, in the same terms as linear_damping At least 0. |
| `can_sleep` | bool | `true` | Let the body stop being simulated once it has held still |
| `ccd` | bool | `false` | Sweep the body's whole path each step so a fast one cannot pass through a wall |
| `center_of_mass` | vec2 | `[0,0]` | Where the extra mass sits, in the node's own space; only read when mass is set |
| `dominance` | float | `0` | A body in a higher group is unpushable by a lower one; every non-dynamic body outranks them all Range -127–127. |
| `enabled` | bool | `true` | Simulate this body at all; a disabled body keeps its state and costs nothing |
| `fast_rotation` | bool | `false` | Allow a spin fast enough that rapier would otherwise clamp it |
| `gravity_scale` | float | `1` | Multiplier on world gravity for this body: 0 hangs in the air, negative floats up |
| `gyroscopic` | bool | `false` | Model the wobble a spinning body's own inertia gives it, as a thrown American football has |
| `inertia` | float | `0` | Resistance to spin; 0 lets rapier derive it from the mass At least 0. |
| `kind` | enum | `dynamic` | How 2D physics drives the node: simulated, immovable, moved by script, or moved by a velocity you set One of `dynamic`, `static`, `kinematic`, `kinematic_velocity`. Scene shorthand: `kind`'s value can be given as the component's whole value. |
| `linear_damping` | float | `0` | Drag on travel: how fast the body loses speed with nothing touching it At least 0. |
| `lock_rotation` | bool | `false` | Stop the body turning; how a 2D character stays upright |
| `lock_translation` | flags | `[]` | Axes the body may not move along One of `x`, `y`. |
| `mass` | float | `0` | Extra mass on top of what the colliders' density gives; 0 leaves the body at its collider mass At least 0. |
| `sleep_time` | float | `0.5` | Seconds of stillness before the body sleeps At least 0. |
| `soft_ccd` | float | `0` | Distance ahead the body predicts contacts, in units; cheaper than ccd for merely fast bodies At least 0. |
| `solver_iterations` | float | `0` | Extra solver iterations for this body alone, for the one stack that jitters At least 0. |

## Script functions

Methods of `node.body2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics2d`](../modules/physics2d.md):

| method | what it does |
| --- | --- |
| `add_body(string)` | Give the node a 2D rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`). |
| `add_force(float, float)` | Push the body until the force is reset; unlike an impulse this is spread over time. |
| `add_force_at_point(float, float, float, float)` | Push at a world point, which also turns the body. |
| `add_torque(float)` | Turn the body until the torque is reset. |
| `angular_velocity() -> float` | How fast the body is spinning, in radians per second. |
| `apply_impulse(float, float)` | Add an instant change in momentum, as if the body were struck. |
| `apply_impulse_at_point(float, float, float, float)` | Strike the body at a world point, which spins it as well as moves it. |
| `apply_torque_impulse(float)` | Add an instant change in angular momentum, as if the body were spun. |
| `body_kind() -> string` | Whether the body is dynamic, static, kinematic or kinematic_velocity. |
| `damping() -> float, float` | This body's linear and angular damping. |
| `dominance() -> float` | This body's dominance group. |
| `gravity_scale() -> float` | This body's gravity multiplier. |
| `is_ccd() -> bool` | Whether continuous collision detection is on for this body. |
| `is_enabled() -> bool` | Whether the body is being simulated. |
| `is_sleeping() -> bool` | Whether the body is asleep and being skipped. |
| `kinetic_energy() -> float` | The body's kinetic energy, for a rest test the solver agrees with. |
| `linear_velocity() -> float, float` | How fast the body is travelling, in units per second. |
| `locked_axes() -> bool, bool, bool` | Whether x, y and rotation are frozen. |
| `mass() -> float` | The body's total mass, colliders included. |
| `max_contact_impulse() -> float` | The hardest contact this body took in the last step, zero when nothing touched it. |
| `next_position() -> float, float` | The position a kinematic body has been told to move to. |
| `predict_position(float) -> float, float` | Where the body will be after `dt` seconds at its current velocity. |
| `reset_forces()` | Drop every force added since the last step. |
| `reset_torques()` | Drop every torque added since the last step. |
| `set_angular_velocity(float)` | Set how fast the body spins, in radians per second. |
| `set_body_kind(string)` | Change the body between dynamic, static and kinematic in place, keeping its velocity. |
| `set_ccd(bool)` | Sweep this body's whole path each step so it cannot pass through a wall. |
| `set_damping(float, float)` | Set linear and angular damping together. |
| `set_dominance(float)` | Set the group that decides which of two bodies can push the other. |
| `set_enabled(bool)` | Simulate this body or leave it out entirely, keeping its state. |
| `set_gravity_scale(float)` | Scale world gravity for this body alone. |
| `set_linear_velocity(float, float)` | Set how fast the body travels, in units per second. |
| `set_lock_rotation(bool)` | Freeze the body's spin: how a 2D character stays upright. |
| `set_lock_translation(bool, bool)` | Freeze the body's movement along x and y. |
| `sleep()` | Put the body to sleep now. |
| `teleport(float, float)` | Move the body to a world position at once, clearing its velocity: what assigning the node's position cannot do, because the step writes that back every tick. |
| `user_force() -> float, float` | The force the next step will integrate. |
| `user_torque() -> float` | The torque the next step will integrate. |
| `velocity_at_point(float, float) -> float, float` | How fast a world point on the body is moving, spin included. |
| `wake_up()` | Wake the body, so the next step moves it. |
