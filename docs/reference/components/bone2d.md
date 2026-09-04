---
title: "bone2d component"
sidebar_label: "bone2d"
description: "Makes the node a 2D bone: the rest position and rotation about z a rig returns to, plus the length and angle its gizmo is drawn with. A skin names its…"
custom_edit_url: null
---

# `bone2d`

`2d` · `animation` · 4 properties · 2D

Makes the node a 2D bone: the rest position and rotation about z a rig returns to, plus the length and angle its gizmo is drawn with. A skin names its rig by node path and deforms by the bones under it, in tree order.

In a scene, `bone2d` is the node key that applies it. A script reaches the same properties through `node.bone2d.get()` and `node.bone2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `angle` | float | `0` | Gizmo direction of a tip bone, in radians; ignored while a child bone exists |
| `length` | float | `0` | Gizmo length of a tip bone; 0 draws to the first child bone At least 0. |
| `rest_position` | vec2 | `[0,0]` | Local rest translation |
| `rest_rotation` | float | `0` | Local rest rotation about z, in radians |

## Script functions

Methods of `node.bone2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`skeleton`](../modules/skeleton.md):

| method | what it does |
| --- | --- |
| `apply_rest()` | Move every bone under the node back to its rest transform. |
| `bones()` | The bones under the node in tree order, the order a skin numbers them in, the node itself first when it is one. |
| `overwrite_rest()` | Record every bone's current transform under the node as its new rest pose. |
