---
title: "body3d component"
image: "/img/social/reference.png"
sidebar_label: "body3d"
description: "Makes the node a 3D rigid body rapier simulates: dynamic falls and responds to forces, static never moves, kinematic is moved by script or animation and…"
custom_edit_url: null
---

# `body3d`

`3d` · `physics` · 18 properties · 3D

Makes the node a 3D rigid body rapier simulates: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. On its own a body has no shape; add a `collider3d` for it to collide with anything.

In a scene, `body3d` is the node key that applies it. A script reaches the same properties through `node.body3d.get()` and `node.body3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `angular_damping` | float | `0` | Drag on spin, in the same terms as linear_damping At least 0. |
| `can_sleep` | bool | `true` | Let the body stop being simulated once it has held still |
| `ccd` | bool | `false` | Sweep the body's whole path each step so a fast one cannot pass through a wall |
| `center_of_mass` | vec3 | `[0,0,0]` | Where the extra mass sits, in the node's own space; only read when mass is set |
| `dominance` | float | `0` | A body in a higher group is unpushable by a lower one; every non-dynamic body outranks them all Range -127–127. |
| `enabled` | bool | `true` | Simulate this body at all; a disabled body keeps its state and costs nothing |
| `fast_rotation` | bool | `false` | Allow a spin fast enough that rapier would otherwise clamp it |
| `gravity_scale` | float | `1` | Multiplier on world gravity for this body: 0 hangs in the air, negative floats up |
| `gyroscopic` | bool | `false` | Model the wobble a spinning body's own inertia gives it, as a thrown American football has |
| `inertia` | vec3 | `[0,0,0]` | Resistance to spin about each axis; 0 lets rapier derive it from the mass |
| `kind` | enum | `dynamic` | How physics drives the node: simulated, immovable, moved by script, or moved by a velocity you set One of `dynamic`, `static`, `kinematic`, `kinematic_velocity`. Scene shorthand: `kind`'s value can be given as the component's whole value. |
| `linear_damping` | float | `0` | Drag on travel: how fast the body loses speed with nothing touching it At least 0. |
| `lock_rotation` | flags | `[]` | World axes the body may not turn about; locking all three keeps a character upright One of `x`, `y`, `z`. |
| `lock_translation` | flags | `[]` | World axes the body may not move along One of `x`, `y`, `z`. |
| `mass` | float | `0` | Extra mass on top of what the colliders' density gives; 0 leaves the body at its collider mass At least 0. |
| `sleep_time` | float | `0.5` | Seconds of stillness before the body sleeps At least 0. |
| `soft_ccd` | float | `0` | Distance ahead the body predicts contacts, in units; cheaper than ccd for merely fast bodies At least 0. |
| `solver_iterations` | float | `0` | Extra solver iterations for this body alone, for the one stack that jitters At least 0. |

## Script functions

Methods of `node.body3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `add_body(string)` | Give the node a rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`, `BODY_KINEMATIC_VELOCITY`). |
| `add_force(float, float, float)` | Push the body until the force is reset; unlike an impulse this is spread over time. |
| `add_force_at_point(float, float, float, float, float, float)` | Push at a world point, which also turns the body. |
| `add_torque(float, float, float)` | Turn the body until the torque is reset. |
| `angular_velocity() -> float, float, float` | How fast the body is spinning, in radians per second about each axis. |
| `apply_impulse(float, float, float)` | Add an instant change in momentum, as if the body were struck. |
| `apply_impulse_at_point(float, float, float, float, float, float)` | Strike the body at a world point, which spins it as well as moves it. |
| `apply_torque_impulse(float, float, float)` | Add an instant change in angular momentum, as if the body were spun. |
| `body_kind() -> string` | Whether the body is dynamic, static, kinematic or kinematic_velocity. |
| `damping() -> float, float` | This body's linear and angular damping. |
| `dominance() -> float` | This body's dominance group. |
| `effective_dominance() -> float` | The dominance rapier will use for this body: its own group, or the rank every non-dynamic body outranks with. |
| `gravity_scale() -> float` | This body's gravity multiplier. |
| `is_ccd() -> bool` | Whether continuous collision detection is on for this body. |
| `is_enabled() -> bool` | Whether the body is being simulated. |
| `is_moving() -> bool` | Whether the body is awake and actually going somewhere. |
| `is_sleeping() -> bool` | Whether the body is asleep and being skipped. |
| `kinetic_energy() -> float` | The body's kinetic energy, for a rest test the solver agrees with. |
| `linear_velocity() -> float, float, float` | How fast the body is travelling, in units per second. |
| `locked_axes() -> bool, bool, bool, bool, bool, bool` | Which translation and rotation axes are frozen. |
| `mass() -> float` | The body's total mass, colliders included. |
| `next_position() -> float, float, float` | The pose a kinematic body has been told to move to. |
| `potential_energy() -> float` | The body's gravitational potential energy over one step. |
| `predict_position(float) -> float, float, float` | Where the body will be after `dt` seconds at its current velocity. |
| `predict_position_with_forces(float) -> float, float, float` | The same, with the forces already applied taken into account: where a thrust or a spring will have put it. |
| `reset_forces()` | Drop every force added since the last step. |
| `reset_torques()` | Drop every torque added since the last step. |
| `set_angular_velocity(float, float, float)` | Set how fast the body spins, in radians per second about each axis. |
| `set_body_kind(string)` | Change the body between dynamic, static and kinematic in place, keeping its velocity. |
| `set_ccd(bool)` | Sweep this body's whole path each step so it cannot pass through a wall. |
| `set_damping(float, float)` | Set linear and angular damping together. |
| `set_dominance(float)` | Set the group that decides which of two bodies can push the other. |
| `set_enabled(bool)` | Simulate this body or leave it out entirely, keeping its state. |
| `set_gravity_scale(float)` | Scale world gravity for this body alone. |
| `set_linear_velocity(float, float, float)` | Set how fast the body travels, in units per second. |
| `set_lock_rotation(bool, bool, bool)` | Freeze the body's spin about each world axis: how an upright character stays upright. |
| `set_lock_translation(bool, bool, bool)` | Freeze the body's movement along each world axis. |
| `sleep()` | Put the body to sleep now. |
| `teleport(float, float, float)` | Move the body to a world position at once, clearing its velocity: what assigning the node's position cannot do, because the step writes that back every tick. |
| `user_force() -> float, float, float` | The force the next step will integrate. |
| `user_torque() -> float, float, float` | The torque the next step will integrate. |
| `velocity_at_point(float, float, float) -> float, float, float` | How fast a world point on the body is moving, spin included. |
| `wake_up()` | Wake the body, so the next step moves it. |
