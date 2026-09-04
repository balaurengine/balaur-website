---
title: "polygon component"
image: "/img/social/reference.png"
sidebar_label: "polygon"
description: "A filled, textured 2D polygon from a mesh asset's points and triangles, deformed by the rig skeleton names when the mesh carries skin weights."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M137,65A24,24,0,1,1,137,31,24,24,0,0,1,137,65ZM23,103A24,24,0,1,0,57,103,24,24,0,0,0,23,103Zm120,88A24,24,0,1,0,177,191,24,24,0,0,0,143,191ZM225,55A24,24,0,1,0,225,89,24,24,0,0,0,225,55Z" opacity="0.2"/><path d="M230.64,49.36a32,32,0,0,0-45.26,0h0a31.9,31.9,0,0,0-5.16,6.76L152,48.42A32,32,0,0,0,97.37,25.36h0a32.06,32.06,0,0,0-5.76,37.41L57.67,93.32a32.05,32.05,0,0,0-40.31,4.05h0a32,32,0,0,0,42.89,47.41l70,51.36a32,32,0,1,0,47.57-14.69l27.39-77.59q1.38.12,2.76.12a32,32,0,0,0,22.63-54.62Zm-122-12.69h0a16,16,0,1,1,0,22.64A16,16,0,0,1,108.68,36.67Zm-80,94.65a16,16,0,0,1,0-22.64h0a16,16,0,1,1,0,22.64Zm142.65,88a16,16,0,0,1-22.63-22.63h0a16,16,0,1,1,22.63,22.63Zm-8.55-43.18a32,32,0,0,0-23,7.08l-70-51.36a32.17,32.17,0,0,0-1.34-26.65l33.95-30.55a32,32,0,0,0,45.47-10.81L176,71.56a32,32,0,0,0,14.12,27Zm56.56-92.84A16,16,0,1,1,196.7,60.68h0a16,16,0,0,1,22.63,22.63Z"/></svg></span>`polygon`

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
