---
title: "modifier3d component"
image: "/img/social/reference.png"
sidebar_label: "modifier3d"
description: "The 3D twin of modifier2d, over bone3d: look_at, two_bone_ik, fabrik, ccdik, jiggle and follow, posing bones after the clip has run -- follow moves the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,80a24,24,0,1,1-24-24A24,24,0,0,1,128,80Zm40,72a24,24,0,1,0,24,24A24,24,0,0,0,168,152Z" opacity="0.2"/><path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"/></svg></span>`modifier3d`

`3d` · `animation` · 16 properties · 3D

The 3D twin of `modifier2d`, over `bone3d`: `look_at`, `two_bone_ik`, `fabrik`, `ccdik`, `jiggle` and `follow`, posing bones after the clip has run -- `follow` moves the node rather than a bone, so a camera trails what it watches without a script. A chain solver turns each bone by the shortest arc onto the solved point, so a bone's twist about its own aim is left as the clip wrote it.

In a scene, `modifier3d` is the node key that applies it. A script reaches each property below as a field on `node.modifier3d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.modifier3d.get()` and `node.modifier3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `angle_limit` | float | `0` | How far a ccdik bone may turn from its rest, in radians; 0 leaves it free |
| `bone` | string | — | Node path to the driven bone, relative to this node; empty means this node. For a chain solver, its root |
| `chain` | int | `0` | How many bones the chain holds, counting the driven one; 0 walks to the deepest tip |
| `damping` | float | `0.75` | How much of a jiggle bone's speed survives a tick, 0 to 1 |
| `enabled` | bool | `true` | Whether the modifier runs; off leaves the clip's pose alone |
| `flip` | bool | `false` | Bend a two-bone chain the other way |
| `gravity` | vec3 | `[0,-6,0]` | Pull on a jiggle bone while `use_gravity` is on |
| `iterations` | int | `10` | Solver passes for fabrik and ccdik |
| `kind` | enum | `look_at` | Aim one bone at the target, bend a two-bone chain to it, reach with a chain of any length (fabrik or ccdik), let a chain lag behind the pose (jiggle), or trail the target at an offset (follow) One of `look_at`, `two_bone_ik`, `fabrik`, `ccdik`, `jiggle`, `follow`. |
| `lag` | float | `0` | Seconds a follow node takes to close most of the gap to its target; 0 pins it there |
| `mass` | float | `0.75` | What gravity weighs against stiffness on a jiggle bone |
| `offset` | vec3 | `[0,0,0]` | Where a follow node sits relative to its target, in world units |
| `stiffness` | float | `3` | How hard a jiggle bone is pulled back to the pose |
| `target` | string | — | Node path to the point to aim at, relative to this node. Unused by jiggle |
| `tolerance` | float | `0.01` | How close to the target ends a fabrik or ccdik solve early |
| `use_gravity` | bool | `false` | Whether a jiggle chain is pulled by `gravity` |
