---
title: "polygon component"
sidebar_label: "polygon"
description: "A filled, textured 2D polygon from a mesh asset's points and triangles, deformed by the rig skeleton names when the mesh carries skin weights."
custom_edit_url: null
---

# `polygon`

`2d` · `render` · `animation` · 5 properties · 2D

A filled, textured 2D polygon from a `mesh` asset's points and triangles, deformed by the rig `skeleton` names when the mesh carries skin weights.

In a scene, `polygon` is the node key that applies it. A script reaches the same properties through `node.polygon.get()` and `node.polygon.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[1,1,1,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Vertices, triangulation, UVs and skin weights; positions are [x, y] in the node's space |
| `pixels_per_unit` | float | `100` | Texture pixels per world unit, for the default UV mapping At least 0.01. |
| `skeleton` | string | — | Node path to the rig root, relative to this node; empty means this node |
| `texture` | string | — | Image file, project-relative; empty draws the tint alone |

Asset types this component references: [`mesh`](../assets/mesh.md).

## Script functions

Methods of `node.polygon`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `color() -> float, float, float, float` | The node's tint as r, g, b, a channel floats; opaque white when the node draws nothing at all. |
| `set_color(float, float, float, float?)` | Tint whatever the node draws, as r, g, b channel floats and an optional alpha, one meaning opaque. |
