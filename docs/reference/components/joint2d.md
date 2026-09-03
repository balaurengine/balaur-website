---
title: "joint2d"
custom_edit_url: null
---

# `joint2d`

`2d` · `physics` · 18 properties · 2D

Holds this node's body to another one in 2D: a hinge, a slider, a rope, a spring, or a generic joint you lock axis by axis. Both ends need a `body2d`.

In a scene, `joint2d` is the node key that applies it. A script reaches the same properties through `node.joint2d.get()` and `node.joint2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `anchor` | vec2 | `[0,0]` | Where the joint attaches on this node, in its own space |
| `axis` | vec2 | `[1,0]` | The direction a prismatic joint slides along |
| `body` | node | — | The node at the joint's other end; this node is the first end |
| `break_force` | float | `0` | The pull that snaps the joint and calls on_joint_break; 0 never breaks At least 0. |
| `contacts` | bool | `false` | Let the two joined bodies collide with each other |
| `damping` | float | `1` | How quickly the motion settles, for a spring joint or a motor At least 0. |
| `enabled` | bool | `true` | Hold the two bodies together at all |
| `kind` | enum | `fixed` | How the two bodies may move relative to each other One of `fixed`, `revolute`, `prismatic`, `rope`, `spring`, `pin_slot`, `generic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |
| `length` | float | `0` | The rope's greatest length, or the spring's rest length At least 0. |
| `limits` | vec2 | `[0,0]` | How far the joint may travel, as a low and a high; equal values mean no limit |
| `locked_axes` | flags | `[]` | Which of the three freedoms a generic joint takes away One of `x`, `y`, `ang_x`. |
| `motor` | enum | `off` | Drive the joint towards a speed, towards a position, or not at all One of `off`, `velocity`, `position`. |
| `motor_max_force` | float | `0` | The most force the motor may use; 0 means as much as it takes At least 0. |
| `motor_model` | enum | `acceleration` | Whether the motor's strength is felt as an acceleration, ignoring mass, or as a force One of `acceleration`, `force`. |
| `motor_target` | float | `0` | The speed or the position the motor drives towards |
| `other_anchor` | vec2 | `[0,0]` | Where it attaches on the other node, in that node's space |
| `solver` | enum | `impulse` | impulse holds any arrangement, loops included; reduced never drifts and can be solved for inverse kinematics, but cannot close a loop One of `impulse`, `reduced`. |
| `stiffness` | float | `0` | Spring stiffness, for a spring joint or a position motor At least 0. |

## Script functions

Methods of `node.joint2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics2d`](../modules/physics2d.md):

| method | what it does |
| --- | --- |
| `add_joint(any)` | Tie this node's body to another with a 2D joint, from a `joint2d` table. |
| `joint_impulse() -> float` | How hard the joint is pulling right now. |
| `remove_joint()` | Undo the node's joint, leaving both bodies free. |
| `set_joint_limits(float, float)` | Set how far the joint may travel. |
| `set_motor_position(float, float, float)` | Drive the joint towards an angle or a distance, with a spring's stiffness and damping. |
| `set_motor_velocity(float, float)` | Drive the joint towards a speed: how a wheel is powered. |
