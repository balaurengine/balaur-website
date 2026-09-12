---
title: "tile_collision component"
image: "/img/social/reference.png"
sidebar_label: "tile_collision"
description: "Collision for the node's tilemap cells: every tile the tileset marks solid, one shape per behaviour, with the material keys a collider2d takes."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg></span>`tile_collision`

`2d` · `physics` · 17 properties · 2D

Collision for the node's `tilemap` cells: every tile the tileset marks solid, one shape per behaviour, with the material keys a `collider2d` takes.

In a scene, `tile_collision` is the node key that applies it. A script reaches each property below as a field on `node.tile_collision`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.tile_collision.get()` and `node.tile_collision.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `active_collisions` | flags | `["dynamic_dynamic","dynamic_kinematic","dynamic_static"]` | Which pairs of body kinds this collider is tested against; a sensor watching kinematic platforms needs more than the default One of `dynamic_dynamic`, `dynamic_kinematic`, `dynamic_static`, `kinematic_kinematic`, `kinematic_static`, `static_static`. |
| `contact_force_threshold` | float | `0` | How hard a contact must be before on_contact_force is called At least 0. |
| `contact_skin` | float | `0` | A margin the solver treats as already touching; stops thin shapes tunnelling and jittering At least 0. |
| `density` | float | `1` | Mass per volume, so the shape's size sets its mass At least 0.001. |
| `enabled` | bool | `true` | Collide at all; a disabled collider keeps its shape and costs nothing |
| `events` | flags | `[]` | What this collider reports to its node's script: on_collision_start and on_collision_stop, or on_contact_force One of `collision`, `contact_force`. |
| `friction` | float | `0.5` | Surface friction; 0 is ice At least 0. |
| `friction_combine` | enum | `average` | How this surface's friction combines with the other one's One of `average`, `min`, `multiply`, `max`, `clamped_sum`, `geometric_mean`. |
| `layers` | flags | `["0"]` | The layers this collider is on One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `mask` | flags | `[]` | The layers it collides with; empty means every layer One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `mass` | float | `0` | Mass in kilograms, overriding what density works out to; 0 keeps the density At least 0. |
| `one_way` | bool | `false` | A platform bodies pass through from below and land on from above |
| `restitution` | float | `0` | Bounciness: 0 is a dead stop, 1 a full rebound Range 0–1. |
| `restitution_combine` | enum | `average` | How this surface's bounciness combines with the other one's One of `average`, `min`, `multiply`, `max`, `clamped_sum`, `geometric_mean`. |
| `sensor` | bool | `false` | Detects overlaps without colliding: bodies pass through and are reported |
| `solver_layers` | flags | `["0"]` | Layers for the solver alone: a pair can be detected but not resolved One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
| `solver_mask` | flags | `[]` | Which solver layers this one pushes against; empty means all of them One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`. |
