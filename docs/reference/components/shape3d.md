---
title: "shape3d component"
image: "/img/social/reference.png"
sidebar_label: "shape3d"
description: "An untextured 3D primitive drawn at the node -- ball, cuboid, capsule, cylinder, cone or plane -- sized in world units and tinted by color."
custom_edit_url: null
---

# `shape3d`

`3d` · `render` · 6 properties · 3D

An untextured 3D primitive drawn at the node -- ball, cuboid, capsule, cylinder, cone or plane -- sized in world units and tinted by `color`.

In a scene, `shape3d` is the node key that applies it. A script reaches the same properties through `node.shape3d.get()` and `node.shape3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `half_extents` | vec3 | `[0.5,0.5,0.5]` | Half-sizes of the cuboid, when kind is cuboid |
| `height` | float | `1` | Length along y, for capsule, cylinder and cone At least 0.01. |
| `kind` | enum | `cuboid` | Rendered 3D shape One of `ball`, `cuboid`, `capsule`, `cylinder`, `cone`, `plane`. |
| `material` | asset · [`material`](../assets/material.md) | — | The material this draws with; empty draws with the built-in one |
| `radius` | float | `0.5` | Radius, for every kind but cuboid At least 0.01. |

Asset types this component references: [`material`](../assets/material.md).

## Script functions

Methods of `node.shape3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `color() -> float, float, float, float` | The node's tint as r, g, b, a channel floats; opaque white when the node draws nothing at all. |
| `set_ball(float)` | Draw the node as a sphere of the given radius in world units, replacing any other 3D shape. |
| `set_color(float, float, float, float?)` | Tint whatever the node draws, as r, g, b channel floats and an optional alpha, one meaning opaque. |
| `set_cuboid(float, float, float)` | Draw the node as a box from its three half-extents, in world units, replacing any other 3D shape. |
| `shape3d() -> string, float, float, float` | The 3D shape's kind and its three dimensions in world units; empty and zeros when the node has no 3D shape. |
