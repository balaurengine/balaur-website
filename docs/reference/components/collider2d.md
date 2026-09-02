---
title: "collider2d"
custom_edit_url: null
---

# `collider2d`

`2d` · `physics` · 8 properties · 2D

The shape the 2D physics world sees for this node, and the surface it presents: friction, bounciness and density. With a `body2d` it moves with the body; on its own it is static geometry a scene can be built from. A sensor reports overlaps without pushing anything.

In a scene, `collider2d` is the node key that applies it. A script reaches the same properties through `node.collider2d.get()` and `node.collider2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `density` | float | `1` | Mass per area, so the shape's size sets its mass At least 0.001. |
| `friction` | float | `0.5` | Surface friction; 0 is ice At least 0. |
| `half_extents` | vec2 | `[0.5,0.5]` | Half-sizes of the rect, when kind is rect |
| `height` | float | `1` | Length along y of the straight part, when kind is capsule At least 0.01. |
| `kind` | enum | `rect` | Collision shape One of `circle`, `rect`, `capsule`. |
| `radius` | float | `0.5` | Circle radius, when kind is circle At least 0.01. |
| `restitution` | float | `0` | Bounciness: 0 is a dead stop, 1 a full rebound Range 0–1. |
| `sensor` | bool | `false` | Detects overlaps without colliding: bodies pass through and are reported |

## Script functions

Methods of `node.collider2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics2d`](../modules/physics2d.md):

| method | what it does |
| --- | --- |
| `add_collider(any)` | Attach a 2D collider from a `collider2d` table: `kind`, `radius`, `half_extents`, `friction`, and the rest of the component's own vocabulary. |
| `overlaps() -> [node]` | The nodes this one currently intersects; rapier reports a pair only when one of the two colliders is a sensor. |
