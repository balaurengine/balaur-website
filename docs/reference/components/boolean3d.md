---
title: "boolean3d component"
image: "/img/social/reference.png"
sidebar_label: "boolean3d"
description: "Draws the node as its children combined by op: union, difference or intersection. The children stay in the tree, hidden and editable."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"/></svg></span>`boolean3d`

`3d` · `render` · 1 property · 3D

Draws the node as its children combined by `op`: `union`, `difference` or `intersection`. The children stay in the tree, hidden and editable.

In a scene, `boolean3d` is the node key that applies it. A script reaches each property below as a field on `node.boolean3d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.boolean3d.get()` and `node.boolean3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `op` | enum | `union` | How the children are combined, in the order they are declared One of `union`, `difference`, `intersection`. |

## Script functions

Methods of `node.boolean3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `built_mesh() -> any` | The triangles the node's boolean settled on, as `#{ positions, indices }` ready to be written out as a `mesh` asset; nil when the node draws no built geometry. |
