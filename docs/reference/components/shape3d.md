---
title: "shape3d component"
image: "/img/social/reference.png"
sidebar_label: "shape3d"
description: "An untextured 3D primitive drawn at the node -- ball, cuboid, capsule, cylinder, cone, plane, torus, pyramid, prism or tube -- sized in world units and…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M64,64l40,120H24ZM200,76a44,44,0,1,0-44,44A44,44,0,0,0,200,76Zm-64,76v56h88V152Z" opacity="0.2"/><path d="M224,144H136a8,8,0,0,0-8,8v56a8,8,0,0,0,8,8h88a8,8,0,0,0,8-8V152A8,8,0,0,0,224,144Zm-8,56H144V160h72ZM71.59,61.47a8,8,0,0,0-15.18,0l-40,120A8,8,0,0,0,24,192h80a8,8,0,0,0,7.59-10.53ZM35.1,176,64,89.3,92.9,176ZM208,76a52,52,0,1,0-52,52A52.06,52.06,0,0,0,208,76Zm-88,0a36,36,0,1,1,36,36A36,36,0,0,1,120,76Z"/></svg></span>`shape3d`

`3d` · `render` · 14 properties · 3D

An untextured 3D primitive drawn at the node -- ball, cuboid, capsule, cylinder, cone, plane, torus, pyramid, prism or tube -- sized in world units and tinted by `color`. Built as a mesh, so a collider fitted to it collides what is drawn.

In a scene, `shape3d` is the node key that applies it. A script reaches each property below as a field on `node.shape3d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.shape3d.get()` and `node.shape3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `corner_radius` | float | `0` | How far the edges are rounded off, when kind is cuboid; zero is a square edge At least 0. |
| `half_extents` | vec3 | `[0.5,0.5,0.5]` | Half-sizes, when kind is cuboid, plane or pyramid |
| `height` | float | `1` | Length along y, for capsule, cylinder, cone, prism and tube At least 0.01. |
| `inner_radius` | float | `0.25` | Radius of the hole, when kind is tube At least 0.01. |
| `kind` | enum | `cuboid` | Rendered 3D shape One of `ball`, `cuboid`, `capsule`, `cylinder`, `cone`, `plane`, `torus`, `pyramid`, `prism`, `tube`. |
| `layers` | int | `-1` | Light-layer bitmask; a `light3d` lights this when their masks share a bit. -1 is every layer |
| `material` | asset · [`material`](../assets/material.md) | — | The material this draws with; empty draws with the built-in one |
| `radius` | float | `0.5` | Radius, for every kind but cuboid, plane and pyramid At least 0.01. |
| `rings` | int | `16` | Cuts along the axis, for ball, capsule and torus At least 3. |
| `segments` | int | `32` | Cuts around the axis, or across a plane At least 3. |
| `shadows` | bool | `true` | Whether this casts a shadow from the lights that cast |
| `sides` | int | `4` | Flat faces, when kind is pyramid or prism At least 3. |
| `tube_radius` | float | `0.2` | Thickness of the ring, when kind is torus At least 0.01. |

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
