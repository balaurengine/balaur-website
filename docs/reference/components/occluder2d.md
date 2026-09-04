---
title: "occluder2d component"
image: "/img/social/reference.png"
sidebar_label: "occluder2d"
description: "The outline this node blocks 2D light with. Left empty it follows the node's collider2d, or failing that its circle, capsule, rect or sprite shape, so…"
custom_edit_url: null
---

# `occluder2d`

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
