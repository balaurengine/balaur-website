---
title: "shape2d component"
image: "/img/social/reference.png"
sidebar_label: "shape2d"
description: "An untextured 2D primitive drawn at the node -- circle, rect, capsule or a polyline traced through a mesh asset's points -- sized in world units."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M64,64l40,120H24ZM200,76a44,44,0,1,0-44,44A44,44,0,0,0,200,76Zm-64,76v56h88V152Z" opacity="0.2"/><path d="M224,144H136a8,8,0,0,0-8,8v56a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V152A8,8,0,0,0,224,144Zm-8,56H144V160h72ZM71.59,61.47a8,8,0,0,0-15.18,0l-40,120A8,8,0,0,0,24,192h80a8,8,0,0,0,7.59-10.53ZM35.1,176,64,89.3,92.9,176ZM208,76a52,52,0,1,0-52,52A52.06,52.06,0,0,0,208,76Zm-88,0a36,36,0,1,1,36,36A36,36,0,0,1,120,76Z"/></svg></span>`shape2d`

`2d` · `render` · 11 properties · 2D

An untextured 2D primitive drawn at the node -- circle, rect, capsule or a polyline traced through a mesh asset's points -- sized in world units.

In a scene, `shape2d` is the node key that applies it. A script reaches the same properties through `node.shape2d.get()` and `node.shape2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `closed` | bool | `false` | Join the last point back to the first, making a polygon outline |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `gradient` | color | `[0,0,0,0]` | The colour a polyline fades to at its far end, from `color` at its start; a zero alpha means no gradient |
| `half_extents` | vec2 | `[0.5,0.5]` | Half-sizes of the rect, when kind is rect |
| `height` | float | `1` | Length along y of the straight part, when kind is capsule At least 0.01. |
| `kind` | enum | `rect` | Rendered 2D shape One of `circle`, `rect`, `capsule`, `polyline`. |
| `material` | asset · [`material`](../assets/material.md) | — | The material this draws with; empty draws with the built-in one |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Points of a polyline, taken from a mesh asset's vertices |
| `radius` | float | `0.5` | Radius, when kind is circle or capsule At least 0.01. |
| `texture` | string | — | An image drawn along a polyline, repeating once per world unit of its length |
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
