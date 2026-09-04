---
title: "occluder2d component"
image: "/img/social/reference.png"
sidebar_label: "occluder2d"
description: "The outline this node blocks 2D light with. Left empty it follows the node's collider2d, or failing that its circle, capsule, rect or sprite shape, so…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M227.89,147.89A96,96,0,1,1,108.11,28.11,96.09,96.09,0,0,0,227.89,147.89Z" opacity="0.2"/><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"/></svg></span>`occluder2d`

`2d` · `render` · 2 properties · 2D

The outline this node blocks 2D light with. Left empty it follows the node's `collider2d`, or failing that its circle, capsule, rect or sprite shape, so the thing a player sees is the thing that casts the shadow. Every edge casts, so an occluder stands in its own shadow: a node that should stay lit wants a smaller outline or a light with `shadows = false`.

In a scene, `occluder2d` is the node key that applies it. A script reaches the same properties through `node.occluder2d.get()` and `node.occluder2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `closed` | bool | `true` | Whether the last point joins the first, making the outline a loop |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Outline points in order, [x, y] in the node's space; empty derives the outline from the node's `collider2d`, then from its 2D shape |

Asset types this component references: [`mesh`](../assets/mesh.md).

## Script functions

Methods of `node.occluder2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `outline() -> [float]` | The outline this node blocks 2D light with, in world space: x then y for each point in turn, with the first repeated at the end when the outline is closed. Empty on a node with no `occluder2d`. |
