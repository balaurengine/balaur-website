---
title: "physics2d module"
image: "/img/social/reference.png"
sidebar_label: "physics2d"
description: "The 2D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. physics holds what spans both worlds."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M210.26,210.26c-17.23,17.23-68-5.63-113.46-51.06S28.51,63,45.74,45.74s68,5.63,113.46,51.06S227.49,193,210.26,210.26Z" opacity="0.2"/><path d="M196.12,128c24.65-34.61,37.22-70.38,19.74-87.86S162.61,35.23,128,59.88C93.39,35.23,57.62,22.66,40.14,40.14S35.23,93.39,59.88,128c-24.65,34.61-37.22,70.38-19.74,87.86h0c5.63,5.63,13.15,8.14,21.91,8.14,18.48,0,42.48-11.17,66-27.88C151.47,212.83,175.47,224,194,224c8.76,0,16.29-2.52,21.91-8.14h0C233.34,198.38,220.77,162.61,196.12,128Zm8.43-76.55c7.64,7.64,2.48,32.4-18.52,63.28a300.33,300.33,0,0,0-21.19-23.57A300.33,300.33,0,0,0,141.27,70C172.15,49,196.91,43.8,204.55,51.45ZM176.29,128a289.14,289.14,0,0,1-22.76,25.53A289.14,289.14,0,0,1,128,176.29a289.14,289.14,0,0,1-25.53-22.76A289.14,289.14,0,0,1,79.71,128,298.62,298.62,0,0,1,128,79.71a289.14,289.14,0,0,1,25.53,22.76A289.14,289.14,0,0,1,176.29,128ZM51.45,51.45c2.2-2.21,5.83-3.35,10.62-3.35C73.89,48.1,92.76,55,114.72,70A304,304,0,0,0,91.16,91.16,300.33,300.33,0,0,0,70,114.73C49,83.85,43.81,59.09,51.45,51.45Zm0,153.1C43.81,196.91,49,172.15,70,141.27a300.33,300.33,0,0,0,21.19,23.57A304.18,304.18,0,0,0,114.73,186C83.85,207,59.09,212.2,51.45,204.55Zm153.1,0c-7.64,7.65-32.4,2.48-63.28-18.52a304.18,304.18,0,0,0,23.57-21.19A300.33,300.33,0,0,0,186,141.27C207,172.15,212.19,196.91,204.55,204.55ZM140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"/></svg></span>`physics2d`

The 2D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds.

62 functions, 47 constants. Scripts reach it as `physics2d::`.

Acts on [`body2d`](../components/body2d.md), [`character2d`](../components/character2d.md), [`collider2d`](../components/collider2d.md), [`joint2d`](../components/joint2d.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `add_body(node, string)` | [`body2d`](../components/body2d.md) | Give the node a 2D rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`). |
| `add_collider(node, any)` | [`collider2d`](../components/collider2d.md) | Attach a 2D collider from a `collider2d` table: `kind`, `radius`, `half_extents`, `friction`, and the rest of the component's own vocabulary. |
| `add_force(node, float, float)` | [`body2d`](../components/body2d.md) | Push the body until the force is reset; unlike an impulse this is spread over time. |
| `add_force_at_point(node, float, float, float, float)` | [`body2d`](../components/body2d.md) | Push at a world point, which also turns the body. |
| `add_joint(node, any)` | [`joint2d`](../components/joint2d.md) | Tie this node's body to another with a 2D joint, from a `joint2d` table. |
| `add_torque(node, float)` | [`body2d`](../components/body2d.md) | Turn the body until the torque is reset. |
| `angular_velocity(node) -> float` | [`body2d`](../components/body2d.md) | How fast the body is spinning, in radians per second. |
| `apply_impulse(node, float, float)` | [`body2d`](../components/body2d.md) | Add an instant change in momentum, as if the body were struck. |
| `apply_impulse_at_point(node, float, float, float, float)` | [`body2d`](../components/body2d.md) | Strike the body at a world point, which spins it as well as moves it. |
| `apply_torque_impulse(node, float)` | [`body2d`](../components/body2d.md) | Add an instant change in angular momentum, as if the body were spun. |
| `body_kind(node) -> string` | [`body2d`](../components/body2d.md) | Whether the body is dynamic, static, kinematic or kinematic_velocity. |
| `box_hits(any) -> any` | — | Every collider whose bounds meet an axis-aligned box. |
| `damping(node) -> float, float` | [`body2d`](../components/body2d.md) | This body's linear and angular damping. |
| `distance(node, node) -> any` | — | The gap between two nodes' colliders, zero when they touch. |
| `dominance(node) -> float` | [`body2d`](../components/body2d.md) | This body's dominance group. |
| `gravity() -> float, float` | — | The 2D world's gravity. |
| `gravity_scale(node) -> float` | [`body2d`](../components/body2d.md) | This body's gravity multiplier. |
| `intersects(node, node) -> any` | — | Whether two nodes' colliders overlap right now, sensor or not. |
| `is_ccd(node) -> bool` | [`body2d`](../components/body2d.md) | Whether continuous collision detection is on for this body. |
| `is_enabled(node) -> bool` | [`body2d`](../components/body2d.md) | Whether the body is being simulated. |
| `is_grounded(node) -> bool` | [`character2d`](../components/character2d.md) | Whether the last move ended with ground under the character's feet. |
| `is_sleeping(node) -> bool` | [`body2d`](../components/body2d.md) | Whether the body is asleep and being skipped. |
| `joint_impulse(node) -> float` | [`joint2d`](../components/joint2d.md) | How hard the joint is pulling right now. |
| `kinetic_energy(node) -> float` | [`body2d`](../components/body2d.md) | The body's kinetic energy, for a rest test the solver agrees with. |
| `linear_velocity(node) -> float, float` | [`body2d`](../components/body2d.md) | How fast the body is travelling, in units per second. |
| `locked_axes(node) -> bool, bool, bool` | [`body2d`](../components/body2d.md) | Whether x, y and rotation are frozen. |
| `mass(node) -> float` | [`body2d`](../components/body2d.md) | The body's total mass, colliders included. |
| `max_contact_impulse(node) -> float` | [`body2d`](../components/body2d.md) | The hardest contact this body took in the last step, zero when nothing touched it. |
| `move_character(node, float, float) -> any` | [`character2d`](../components/character2d.md) | Move the character by an offset, sliding along walls, climbing steps and staying on the ground: returns `#{ x, y, grounded, sliding, collisions }`. Call it from fixed_update. |
| `nearest_point(any) -> any` | — | The closest point on any collider to a world point. |
| `next_position(node) -> float, float` | [`body2d`](../components/body2d.md) | The position a kinematic body has been told to move to. |
| `overlaps(node) -> [node]` | [`collider2d`](../components/collider2d.md) | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
| `point_hits(any) -> any` | — | Every collider containing a world point: what a mouse click asks. |
| `predict_position(node, float) -> float, float` | [`body2d`](../components/body2d.md) | Where the body will be after `dt` seconds at its current velocity. |
| `raycast(any) -> any` | — | The first collider a ray meets: `#{ from = [x, y], dir = [x, y], max = 100.0, filter = #{ exclude = node } }`. Returns `#{ node, point, normal, distance }`, or nothing. |
| `raycast_all(any) -> any` | — | Every collider a ray meets, nearest first. |
| `remove_joint(node)` | [`joint2d`](../components/joint2d.md) | Undo the node's joint, leaving both bodies free. |
| `reset_forces(node)` | [`body2d`](../components/body2d.md) | Drop every force added since the last step. |
| `reset_torques(node)` | [`body2d`](../components/body2d.md) | Drop every torque added since the last step. |
| `set_angular_velocity(node, float)` | [`body2d`](../components/body2d.md) | Set how fast the body spins, in radians per second. |
| `set_body_kind(node, string)` | [`body2d`](../components/body2d.md) | Change the body between dynamic, static and kinematic in place, keeping its velocity. |
| `set_ccd(node, bool)` | [`body2d`](../components/body2d.md) | Sweep this body's whole path each step so it cannot pass through a wall. |
| `set_damping(node, float, float)` | [`body2d`](../components/body2d.md) | Set linear and angular damping together. |
| `set_dominance(node, float)` | [`body2d`](../components/body2d.md) | Set the group that decides which of two bodies can push the other. |
| `set_enabled(node, bool)` | [`body2d`](../components/body2d.md) | Simulate this body or leave it out entirely, keeping its state. |
| `set_gravity(float, float)` | — | Set the 2D world's gravity, in units per second squared. |
| `set_gravity_scale(node, float)` | [`body2d`](../components/body2d.md) | Scale world gravity for this body alone. |
| `set_joint_limits(node, float, float)` | [`joint2d`](../components/joint2d.md) | Set how far the joint may travel. |
| `set_linear_velocity(node, float, float)` | [`body2d`](../components/body2d.md) | Set how fast the body travels, in units per second. |
| `set_lock_rotation(node, bool)` | [`body2d`](../components/body2d.md) | Freeze the body's spin: how a 2D character stays upright. |
| `set_lock_translation(node, bool, bool)` | [`body2d`](../components/body2d.md) | Freeze the body's movement along x and y. |
| `set_motor_position(node, float, float, float)` | [`joint2d`](../components/joint2d.md) | Drive the joint towards an angle or a distance, with a spring's stiffness and damping. |
| `set_motor_velocity(node, float, float)` | [`joint2d`](../components/joint2d.md) | Drive the joint towards a speed: how a wheel is powered. |
| `shape_hits(any) -> any` | — | Every collider a shape overlaps where it stands. |
| `shapecast(any) -> any` | — | Sweep a shape along a direction until it hits something: a thick raycast. |
| `sleep(node)` | [`body2d`](../components/body2d.md) | Put the body to sleep now. |
| `teleport(node, float, float)` | [`body2d`](../components/body2d.md) | Move the body to a world position at once, clearing its velocity: what assigning the node's position cannot do, because the step writes that back every tick. |
| `user_force(node) -> float, float` | [`body2d`](../components/body2d.md) | The force the next step will integrate. |
| `user_torque(node) -> float` | [`body2d`](../components/body2d.md) | The torque the next step will integrate. |
| `velocity_at_point(node, float, float) -> float, float` | [`body2d`](../components/body2d.md) | How fast a world point on the body is moving, spin included. |
| `wake_all()` | — | Wake every sleeping body in the 2D world. |
| `wake_up(node)` | [`body2d`](../components/body2d.md) | Wake the body, so the next step moves it. |

## Constants

| name | value |
| --- | --- |
| `AXIS_ANG_X` | `ang_x` |
| `AXIS_X` | `x` |
| `AXIS_Y` | `y` |
| `BODY_DYNAMIC` | `dynamic` |
| `BODY_KINEMATIC` | `kinematic` |
| `BODY_KINEMATIC_VELOCITY` | `kinematic_velocity` |
| `BODY_STATIC` | `static` |
| `COLLIDE_DYNAMIC_DYNAMIC` | `dynamic_dynamic` |
| `COLLIDE_DYNAMIC_KINEMATIC` | `dynamic_kinematic` |
| `COLLIDE_DYNAMIC_STATIC` | `dynamic_static` |
| `COLLIDE_KINEMATIC_KINEMATIC` | `kinematic_kinematic` |
| `COLLIDE_KINEMATIC_STATIC` | `kinematic_static` |
| `COLLIDE_STATIC_STATIC` | `static_static` |
| `COMBINE_AVERAGE` | `average` |
| `COMBINE_CLAMPED_SUM` | `clamped_sum` |
| `COMBINE_GEOMETRIC_MEAN` | `geometric_mean` |
| `COMBINE_MAX` | `max` |
| `COMBINE_MIN` | `min` |
| `COMBINE_MULTIPLY` | `multiply` |
| `EVENT_COLLISION` | `collision` |
| `EVENT_CONTACT_FORCE` | `contact_force` |
| `JOINT_FIXED` | `fixed` |
| `JOINT_GENERIC` | `generic` |
| `JOINT_PIN_SLOT` | `pin_slot` |
| `JOINT_PRISMATIC` | `prismatic` |
| `JOINT_REVOLUTE` | `revolute` |
| `JOINT_ROPE` | `rope` |
| `JOINT_SPRING` | `spring` |
| `LENGTHS_ABSOLUTE` | `absolute` |
| `LENGTHS_RELATIVE` | `relative` |
| `MOTOR_MODEL_ACCELERATION` | `acceleration` |
| `MOTOR_MODEL_FORCE` | `force` |
| `MOTOR_OFF` | `off` |
| `MOTOR_POSITION` | `position` |
| `MOTOR_VELOCITY` | `velocity` |
| `SHAPE_CAPSULE` | `capsule` |
| `SHAPE_CIRCLE` | `circle` |
| `SHAPE_CONVEX_HULL` | `convex_hull` |
| `SHAPE_HALFSPACE` | `halfspace` |
| `SHAPE_HEIGHTFIELD` | `heightfield` |
| `SHAPE_POLYLINE` | `polyline` |
| `SHAPE_RECT` | `rect` |
| `SHAPE_SEGMENT` | `segment` |
| `SHAPE_TRIANGLE` | `triangle` |
| `SHAPE_TRIMESH` | `trimesh` |
| `SOLVER_IMPULSE` | `impulse` |
| `SOLVER_REDUCED` | `reduced` |
