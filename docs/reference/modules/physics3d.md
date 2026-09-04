---
title: "physics3d module"
image: "/img/social/reference.png"
sidebar_label: "physics3d"
description: "The 3D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. physics holds what spans both worlds."
custom_edit_url: null
---

# `physics3d`

The 3D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds.

88 functions, 6 constants. Scripts reach it as `physics3d::`.

Acts on [`body3d`](../components/body3d.md), [`character3d`](../components/character3d.md), [`collider3d`](../components/collider3d.md), [`joint3d`](../components/joint3d.md), [`vehicle3d`](../components/vehicle3d.md), [`wheel3d`](../components/wheel3d.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `aabb(node) -> float, float, float, float, float, float` | [`collider3d`](../components/collider3d.md) | The world-space box the collider currently occupies, as its two opposite corners. |
| `active_bodies() -> any` | — | Every node whose body is awake this step: what a game loops over when it wants to touch only what is moving. |
| `add_ball_collider(node, float)` | [`collider3d`](../components/collider3d.md) | Attach a sphere collider of the given radius. |
| `add_body(node, string)` | [`body3d`](../components/body3d.md) | Give the node a rigid body of the given kind (`BODY_DYNAMIC`, `BODY_STATIC`, `BODY_KINEMATIC`, `BODY_KINEMATIC_VELOCITY`). |
| `add_cuboid_collider(node, float, float, float)` | [`collider3d`](../components/collider3d.md) | Attach a box collider from its three half-extents. |
| `add_force(node, float, float, float)` | [`body3d`](../components/body3d.md) | Push the body until the force is reset; unlike an impulse this is spread over time. |
| `add_force_at_point(node, float, float, float, float, float, float)` | [`body3d`](../components/body3d.md) | Push at a world point, which also turns the body. |
| `add_joint(node, any)` | [`joint3d`](../components/joint3d.md) | Tie this node's body to another with a joint, from a `joint3d` table: `kind`, `body`, `anchor`, `axis`, `limits`, and the rest of the component's own vocabulary. |
| `add_torque(node, float, float, float)` | [`body3d`](../components/body3d.md) | Turn the body until the torque is reset. |
| `angular_velocity(node) -> float, float, float` | [`body3d`](../components/body3d.md) | How fast the body is spinning, in radians per second about each axis. |
| `apply_impulse(node, float, float, float)` | [`body3d`](../components/body3d.md) | Add an instant change in momentum, as if the body were struck. |
| `apply_impulse_at_point(node, float, float, float, float, float, float)` | [`body3d`](../components/body3d.md) | Strike the body at a world point, which spins it as well as moves it. |
| `apply_torque_impulse(node, float, float, float)` | [`body3d`](../components/body3d.md) | Add an instant change in angular momentum, as if the body were spun. |
| `bodies() -> any` | — | Every node with a rigid body, sorted. |
| `body_kind(node) -> string` | [`body3d`](../components/body3d.md) | Whether the body is dynamic, static, kinematic or kinematic_velocity. |
| `box_hits(any) -> any` | — | Every collider whose bounds meet an axis-aligned box; cheaper and looser than shape_hits. |
| `closest_points(node, node) -> any` | — | The nearest point on each of two nodes' colliders. |
| `collider_mass(node) -> float` | [`collider3d`](../components/collider3d.md) | What this collider weighs, density and size together. |
| `collider_mesh(node) -> any` | [`collider3d`](../components/collider3d.md) | The collider's shape as points and triangles — including a voxel grid's — for drawing it or for spawning the pieces it broke into. |
| `collider_volume(node) -> float` | [`collider3d`](../components/collider3d.md) | How much space the shape encloses. |
| `contacts(node) -> any` | [`collider3d`](../components/collider3d.md) | Every contact point on this node's collider this step: `#{ node, point, normal, impulse }` each. Empty for a sensor, which has no contacts by definition. |
| `damping(node) -> float, float` | [`body3d`](../components/body3d.md) | This body's linear and angular damping. |
| `distance(node, node) -> any` | — | The gap between two nodes' colliders, zero when they touch or overlap. |
| `dominance(node) -> float` | [`body3d`](../components/body3d.md) | This body's dominance group. |
| `effective_dominance(node) -> float` | [`body3d`](../components/body3d.md) | The dominance rapier will use for this body: its own group, or the rank every non-dynamic body outranks with. |
| `gravity() -> float, float, float` | — | The 3D world's gravity. |
| `gravity_scale(node) -> float` | [`body3d`](../components/body3d.md) | This body's gravity multiplier. |
| `handles(node) -> any` | [`collider3d`](../components/collider3d.md) | The rapier handles behind this node — its body and its colliders — as `#{ body, colliders }` of index and generation pairs. For matching a log line against rapier's own output. |
| `intersects(node, node) -> any` | — | Whether two nodes' colliders overlap right now, sensor or not. |
| `is_ccd(node) -> bool` | [`body3d`](../components/body3d.md) | Whether continuous collision detection is on for this body. |
| `is_enabled(node) -> bool` | [`body3d`](../components/body3d.md) | Whether the body is being simulated. |
| `is_grounded(node) -> bool` | [`character3d`](../components/character3d.md) | Whether the last move ended with ground under the character's feet. |
| `is_moving(node) -> bool` | [`body3d`](../components/body3d.md) | Whether the body is awake and actually going somewhere. |
| `is_sleeping(node) -> bool` | [`body3d`](../components/body3d.md) | Whether the body is asleep and being skipped. |
| `joint_impulse(node) -> float` | [`joint3d`](../components/joint3d.md) | How hard the joint is pulling right now: what a breakable one is measured against. |
| `kinetic_energy(node) -> float` | [`body3d`](../components/body3d.md) | The body's kinetic energy, for a rest test the solver agrees with. |
| `linear_velocity(node) -> float, float, float` | [`body3d`](../components/body3d.md) | How fast the body is travelling, in units per second. |
| `locked_axes(node) -> bool, bool, bool, bool, bool, bool` | [`body3d`](../components/body3d.md) | Which translation and rotation axes are frozen. |
| `mass(node) -> float` | [`body3d`](../components/body3d.md) | The body's total mass, colliders included. |
| `max_contact_impulse(node) -> float` | [`collider3d`](../components/collider3d.md) | The hardest contact this node took in the last step, zero when nothing touched it: a damage threshold in one number. |
| `move_character(node, float, float, float) -> any` | [`character3d`](../components/character3d.md) | Move the character by an offset, sliding along walls, climbing steps and staying on the ground: returns `#{ x, y, z, grounded, sliding, collisions }`. Call it from fixed_update — it reads the world the step just wrote. |
| `nearest_point(any) -> any` | — | The closest point on any collider to a world point. |
| `next_position(node) -> float, float, float` | [`body3d`](../components/body3d.md) | The pose a kinematic body has been told to move to. |
| `overlaps(node) -> [node]` | [`collider3d`](../components/collider3d.md) | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
| `point_hits(any) -> any` | — | Every collider containing a world point. |
| `potential_energy(node) -> float` | [`body3d`](../components/body3d.md) | The body's gravitational potential energy over one step. |
| `predict_position(node, float) -> float, float, float` | [`body3d`](../components/body3d.md) | Where the body will be after `dt` seconds at its current velocity. |
| `predict_position_with_forces(node, float) -> float, float, float` | [`body3d`](../components/body3d.md) | The same, with the forces already applied taken into account: where a thrust or a spring will have put it. |
| `raycast(any) -> any` | — | The first collider a ray meets: `#{ from = [x, y, z], dir = [x, y, z], max = 100.0, filter = #{ exclude = node, only = "dynamic" } }`. Returns `#{ node, point, normal, distance }`, or nothing. |
| `raycast_all(any) -> any` | — | Every collider a ray meets, nearest first. |
| `remove_joint(node)` | [`joint3d`](../components/joint3d.md) | Undo the node's joint, leaving both bodies free. |
| `reset_forces(node)` | [`body3d`](../components/body3d.md) | Drop every force added since the last step. |
| `reset_torques(node)` | [`body3d`](../components/body3d.md) | Drop every torque added since the last step. |
| `set_angular_velocity(node, float, float, float)` | [`body3d`](../components/body3d.md) | Set how fast the body spins, in radians per second about each axis. |
| `set_body_kind(node, string)` | [`body3d`](../components/body3d.md) | Change the body between dynamic, static and kinematic in place, keeping its velocity. |
| `set_brake(node, float)` | [`wheel3d`](../components/wheel3d.md) | How hard this wheel brakes. |
| `set_ccd(node, bool)` | [`body3d`](../components/body3d.md) | Sweep this body's whole path each step so it cannot pass through a wall. |
| `set_collider(node, any)` | [`collider3d`](../components/collider3d.md) | Replace the node's collider from a `collider3d` table: `kind`, `radius`, `half_extents`, `friction`, and the rest of the component's own vocabulary. |
| `set_damping(node, float, float)` | [`body3d`](../components/body3d.md) | Set linear and angular damping together. |
| `set_dominance(node, float)` | [`body3d`](../components/body3d.md) | Set the group that decides which of two bodies can push the other. |
| `set_enabled(node, bool)` | [`body3d`](../components/body3d.md) | Simulate this body or leave it out entirely, keeping its state. |
| `set_engine_force(node, float)` | [`wheel3d`](../components/wheel3d.md) | How hard this wheel drives, in newtons; negative reverses. |
| `set_gravity(float, float, float)` | — | Set the 3D world's gravity, in units per second squared. |
| `set_gravity_scale(node, float)` | [`body3d`](../components/body3d.md) | Scale world gravity for this body alone. |
| `set_joint_limits(node, float, float)` | [`joint3d`](../components/joint3d.md) | Set how far the joint may travel, in radians for a revolute one and units for a prismatic one. |
| `set_linear_velocity(node, float, float, float)` | [`body3d`](../components/body3d.md) | Set how fast the body travels, in units per second. |
| `set_lock_rotation(node, bool, bool, bool)` | [`body3d`](../components/body3d.md) | Freeze the body's spin about each world axis: how an upright character stays upright. |
| `set_lock_translation(node, bool, bool, bool)` | [`body3d`](../components/body3d.md) | Freeze the body's movement along each world axis. |
| `set_motor_position(node, float, float, float)` | [`joint3d`](../components/joint3d.md) | Drive the joint towards an angle or a distance, with a spring's stiffness and damping. |
| `set_motor_velocity(node, float, float)` | [`joint3d`](../components/joint3d.md) | Drive the joint towards a speed: how a wheel is powered or a door swings itself shut. |
| `set_steering(node, float)` | [`wheel3d`](../components/wheel3d.md) | Turn this wheel, in radians. |
| `set_voxel(node, int, int, int, bool)` | [`collider3d`](../components/collider3d.md) | Fill or empty one cell of a voxel collider: digging a hole, or building a wall, while the game runs. |
| `shape_hits(any) -> any` | — | Every collider a shape overlaps where it stands: an explosion's reach, a melee arc. |
| `shapecast(any) -> any` | — | Sweep a shape along a direction until it hits something: a thick raycast, and how a camera avoids walls. |
| `sleep(node)` | [`body3d`](../components/body3d.md) | Put the body to sleep now. |
| `solve_ik(node, float, float, float)` | [`joint3d`](../components/joint3d.md) | Move a reduced-coordinates chain so its last link reaches a world position, leaving every joint inside its limits. |
| `swept_aabb(node) -> float, float, float, float, float, float` | [`collider3d`](../components/collider3d.md) | The box the collider covers over the next step, its motion included: what the broad phase actually tests. |
| `teleport(node, float, float, float)` | [`body3d`](../components/body3d.md) | Move the body to a world position at once, clearing its velocity: what assigning the node's position cannot do, because the step writes that back every tick. |
| `time_of_impact(node, node, any) -> any` | — | When two moving colliders would meet, given each one's velocity: `#{ velocity_a = [..], velocity_b = [..], max = 1.0 }`. Nothing when they never do. |
| `user_force(node) -> float, float, float` | [`body3d`](../components/body3d.md) | The force the next step will integrate. |
| `user_torque(node) -> float, float, float` | [`body3d`](../components/body3d.md) | The torque the next step will integrate. |
| `vehicle_speed(node) -> float` | [`vehicle3d`](../components/vehicle3d.md) | How fast the chassis is going along its forward axis, in units per second. |
| `velocity_at_point(node, float, float, float) -> float, float, float` | [`body3d`](../components/body3d.md) | How fast a world point on the body is moving, spin included. |
| `voxel(node, int, int, int) -> bool` | [`collider3d`](../components/collider3d.md) | Whether one cell of a voxel collider is filled. |
| `voxel_at(node, float, float, float) -> int, int, int` | [`collider3d`](../components/collider3d.md) | The cell a world position falls in, as three whole numbers. |
| `wake_all()` | — | Wake every sleeping body in the 3D world. |
| `wake_up(node)` | [`body3d`](../components/body3d.md) | Wake the body, so the next step moves it. |
| `wheel_state(node) -> any` | [`wheel3d`](../components/wheel3d.md) | What the last step did with this wheel: `#{ rotation, suspension_force, grounded, engine_force, brake, steering }`. |

## Constants

| name | value |
| --- | --- |
| `BODY_DYNAMIC` | `dynamic` |
| `BODY_KINEMATIC` | `kinematic` |
| `BODY_KINEMATIC_VELOCITY` | `kinematic_velocity` |
| `BODY_STATIC` | `static` |
| `SHAPE_BALL` | `ball` |
| `SHAPE_CUBOID` | `cuboid` |
