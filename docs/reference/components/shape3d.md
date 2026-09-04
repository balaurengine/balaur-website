---
title: "shape3d component"
image: "/img/social/reference.png"
sidebar_label: "shape3d"
description: "An untextured 3D primitive drawn at the node -- ball, cuboid, capsule, cylinder, cone or plane -- sized in world units and tinted by color."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M64,64l40,120H24ZM200,76a44,44,0,1,0-44,44A44,44,0,0,0,200,76Zm-64,76v56h88V152Z" opacity="0.2"/><path d="M224,144H136a8,8,0,0,0-8,8v56a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V152A8,8,0,0,0,224,144Zm-8,56H144V160h72ZM71.59,61.47a8,8,0,0,0-15.18,0l-40,120A8,8,0,0,0,24,192h80a8,8,0,0,0,7.59-10.53ZM35.1,176,64,89.3,92.9,176ZM208,76a52,52,0,1,0-52,52A52.06,52.06,0,0,0,208,76Zm-88,0a36,36,0,1,1,36,36A36,36,0,0,1,120,76Z"/></svg></span>`shape3d`

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
