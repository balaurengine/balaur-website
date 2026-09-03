---
title: "character2d"
custom_edit_url: null
---

# `character2d`

`2d` · `physics` · 12 properties · 2D

Moves a node the way a 2D player expects: `physics2d.move_character` slides it along walls, steps it up ledges, keeps it off slopes that are too steep and holds it to the ground over a crest. Needs a `collider2d`.

In a scene, `character2d` is the node key that applies it. A script reaches the same properties through `node.character2d.get()` and `node.character2d.set(table)`.

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
| `up` | vec2 | `[0,1]` | Which way is up for this character: the axis it stands along and measures slopes against |

## Script functions

Methods of `node.character2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics2d`](../modules/physics2d.md):

| method | what it does |
| --- | --- |
| `is_grounded() -> bool` | Whether the last move ended with ground under the character's feet. |
| `move_character(float, float) -> any` | Move the character by an offset, sliding along walls, climbing steps and staying on the ground: returns `#{ x, y, grounded, sliding, collisions }`. Call it from fixed_update. |
