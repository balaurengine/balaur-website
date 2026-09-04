---
title: "shape2d component"
sidebar_label: "shape2d"
description: "An untextured 2D primitive drawn at the node -- circle, rect, capsule or a polyline traced through a mesh asset's points -- sized in world units."
custom_edit_url: null
---

# `shape2d`

`2d` · `render` · 9 properties · 2D

An untextured 2D primitive drawn at the node -- circle, rect, capsule or a polyline traced through a mesh asset's points -- sized in world units.

In a scene, `shape2d` is the node key that applies it. A script reaches the same properties through `node.shape2d.get()` and `node.shape2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `closed` | bool | `false` | Join the last point back to the first, making a polygon outline |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `half_extents` | vec2 | `[0.5,0.5]` | Half-sizes of the rect, when kind is rect |
| `height` | float | `1` | Length along y of the straight part, when kind is capsule At least 0.01. |
| `kind` | enum | `rect` | Rendered 2D shape One of `circle`, `rect`, `capsule`, `polyline`. |
| `material` | asset · [`material`](../assets/material.md) | — | The material this draws with; empty draws with the built-in one |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Points of a polyline, taken from a mesh asset's vertices |
| `radius` | float | `0.5` | Radius, when kind is circle or capsule At least 0.01. |
| `width` | float | `0.02` | Line thickness in world units, when kind is polyline At least 0.001. |

Asset types this component references: [`material`](../assets/material.md), [`mesh`](../assets/mesh.md).

## Script functions

Methods of `node.shape2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `color() -> float, float, float, float` | The node's tint as r, g, b, a channel floats; opaque white when the node draws nothing at all. |
| `set_circle(float)` | Draw the node as a circle of the given radius in world units, replacing any other 2D shape. |
| `set_color(float, float, float, float?)` | Tint whatever the node draws, as r, g, b channel floats and an optional alpha, one meaning opaque. |
| `set_rect(float, float)` | Draw the node as a rectangle from its two half-extents, in world units, replacing any other 2D shape. |
| `shape2d() -> string, float, float` | The 2D shape's kind and its two dimensions in world units; empty and zeros when the node has no 2D shape. |
