---
title: "character3d component"
image: "/img/social/reference.png"
sidebar_label: "character3d"
description: "Moves a node the way a player expects rather than the way physics would: physics3d.move_character slides it along walls, steps it up ledges, keeps it off…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M176,56a24,24,0,1,1-24-24A24,24,0,0,1,176,56Z" opacity="0.2"/><path d="M152,88a32,32,0,1,0-32-32A32,32,0,0,0,152,88Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,152,40Zm67.31,100.68c-.61.28-7.49,3.28-19.67,3.28-13.85,0-34.55-3.88-60.69-20a169.31,169.31,0,0,1-15.41,32.34,104.29,104.29,0,0,1,31.31,15.81C173.92,186.65,184,207.35,184,232a8,8,0,0,1-16,0c0-41.7-34.69-56.71-54.14-61.85-.55.7-1.12,1.41-1.69,2.1-19.64,23.8-44.25,36.18-71.63,36.18A92.29,92.29,0,0,1,31.2,208,8,8,0,0,1,32.8,192c25.92,2.59,48.47-7.49,67-30,12.49-15.14,21-33.61,25.25-47C86.13,92.34,61.27,111.63,61,111.84A8,8,0,1,1,51,99.36c1.5-1.2,37.22-29,89.51,6.57,45.47,30.91,71.93,20.31,72.18,20.19a8,8,0,1,1,6.63,14.56Z"/></svg></span>`character3d`

`3d` · `physics` · 12 properties · 3D

Moves a node the way a player expects rather than the way physics would: `physics3d.move_character` slides it along walls, steps it up ledges, keeps it off slopes that are too steep and holds it to the ground over a crest. Needs a `collider3d`; a `body3d` of kind kinematic lets it push what it walks into.

In a scene, `character3d` is the node key that applies it. A script reaches the same properties through `node.character3d.get()` and `node.character3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `autostep` | float | `0.3` | The tallest step the character climbs without jumping; 0 turns stepping off At least 0. |
| `autostep_dynamic` | bool | `false` | Climb onto dynamic bodies too, not only static and kinematic ones |
| `autostep_min_width` | float | `0.2` | How much clear ground a step needs on top before it may be climbed At least 0. |
| `lengths` | enum | `absolute` | Whether offset, autostep and snap_to_ground are in world units or as a fraction of the character's own height One of `absolute`, `relative`. |
| `max_climb_angle` | float | `45` | The steepest slope the character may walk up, in degrees Range 0–90. |
| `min_slide_angle` | float | `30` | The shallowest slope the character slides back down, in degrees Range 0–90. |
| `normal_nudge` | float | `0.0001` | A tiny push along the contact normal that stops the character catching on seams At least 0. |
| `offset` | float | `0.01` | A gap kept between the character and everything else, so the solver never has to push it out of a wall At least 0. |
| `push_bodies` | bool | `true` | Push dynamic bodies the character walks into, rather than passing through them |
| `slide` | bool | `true` | Slide along what is in the way instead of stopping dead against it |
| `snap_to_ground` | float | `0.2` | How far below its feet the character looks for ground to stay stuck to over a crest; 0 turns snapping off At least 0. |
| `up` | vec3 | `[0,1,0]` | Which way is up for this character: the axis it stands along and measures slopes against |

## Script functions

Methods of `node.character3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `is_grounded() -> bool` | Whether the last move ended with ground under the character's feet. |
| `move_character(float, float, float) -> any` | Move the character by an offset, sliding along walls, climbing steps and staying on the ground: returns `#{ x, y, z, grounded, sliding, collisions }`. Call it from fixed_update — it reads the world the step just wrote. |
