---
title: "joint3d component"
image: "/img/social/reference.png"
sidebar_label: "joint3d"
description: "Holds this node's body to another one: a hinge, a slider, a rope, a spring, a ball socket, or a generic joint you lock axis by axis. Both ends need a…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M218.34,119.6,183.6,154.34a46.58,46.58,0,0,1-44.31,12.26c-.31.34-.62.67-.95,1L103.6,202.34A46.63,46.63,0,1,1,37.66,136.4L72.4,101.66A46.6,46.6,0,0,1,116.71,89.4c.31-.34.62-.67,1-1L152.4,53.66a46.63,46.63,0,0,1,65.94,65.94Z" opacity="0.2"/><path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,7.78,8.22H152a8,8,0,0,0,8-7.78A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"/></svg></span>`joint3d`

`3d` · `physics` · 18 properties · 3D

Holds this node's body to another one: a hinge, a slider, a rope, a spring, a ball socket, or a generic joint you lock axis by axis. Both ends need a `body3d`; a node without one stands for the nearest body above it, which is how one body carries several joints on child nodes.

In a scene, `joint3d` is the node key that applies it. A script reaches the same properties through `node.joint3d.get()` and `node.joint3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `anchor` | vec3 | `[0,0,0]` | Where the joint attaches on this node, in its own space |
| `axis` | vec3 | `[0,0,1]` | The axis a revolute joint turns about or a prismatic one slides along |
| `body` | node | — | The node at the joint's other end; this node is the first end |
| `break_force` | float | `0` | The pull that snaps the joint and calls on_joint_break; 0 never breaks At least 0. |
| `contacts` | bool | `false` | Let the two joined bodies collide with each other |
| `damping` | float | `1` | How quickly the motion settles, for a spring joint or a motor At least 0. |
| `enabled` | bool | `true` | Hold the two bodies together at all |
| `kind` | enum | `fixed` | How the two bodies may move relative to each other One of `fixed`, `revolute`, `prismatic`, `spherical`, `rope`, `spring`, `generic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |
| `length` | float | `0` | The rope's greatest length, or the spring's rest length At least 0. |
| `limits` | vec2 | `[0,0]` | How far the joint may travel, as a low and a high; equal values mean no limit |
| `locked_axes` | flags | `[]` | Which of the six freedoms a generic joint takes away One of `x`, `y`, `z`, `ang_x`, `ang_y`, `ang_z`. |
| `motor` | enum | `off` | Drive the joint towards a speed, towards a position, or not at all One of `off`, `velocity`, `position`. |
| `motor_max_force` | float | `0` | The most force the motor may use; 0 means as much as it takes At least 0. |
| `motor_model` | enum | `acceleration` | Whether the motor's strength is felt as an acceleration, ignoring mass, or as a force One of `acceleration`, `force`. |
| `motor_target` | float | `0` | The speed or the position the motor drives towards |
| `other_anchor` | vec3 | `[0,0,0]` | Where it attaches on the other node, in that node's space |
| `solver` | enum | `impulse` | impulse holds any arrangement, loops included; reduced never drifts and can be solved for inverse kinematics, but cannot close a loop One of `impulse`, `reduced`. |
| `stiffness` | float | `0` | Spring stiffness, for a spring joint or a position motor At least 0. |

## Script functions

Methods of `node.joint3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `add_joint(any)` | Tie this node's body to another with a joint, from a `joint3d` table: `kind`, `body`, `anchor`, `axis`, `limits`, and the rest of the component's own vocabulary. |
| `joint_impulse() -> float` | How hard the joint is pulling right now: what a breakable one is measured against. |
| `remove_joint()` | Undo the node's joint, leaving both bodies free. |
| `set_joint_limits(float, float)` | Set how far the joint may travel, in radians for a revolute one and units for a prismatic one. |
| `set_motor_position(float, float, float)` | Drive the joint towards an angle or a distance, with a spring's stiffness and damping. |
| `set_motor_velocity(float, float)` | Drive the joint towards a speed: how a wheel is powered or a door swings itself shut. |
| `solve_ik(float, float, float)` | Move a reduced-coordinates chain so its last link reaches a world position, leaving every joint inside its limits. |
