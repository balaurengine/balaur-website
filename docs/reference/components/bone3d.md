---
title: "bone3d"
custom_edit_url: null
---

# `bone3d`

`3d` · `animation` · 4 properties · 3D

Makes the node a 3D bone: the rest position, euler rotation and scale a rig \
                  returns to, plus the length its gizmo is drawn with. A skinned mesh names its \
                  rig by node path and deforms by the bones under it, in tree order.

In a scene, `bone3d` is the node key that applies it. A script reaches the same properties through `node.bone3d.get()` and `node.bone3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `length` | float | `0` | Gizmo length of a tip bone; 0 draws to the first child bone At least 0. |
| `rest_position` | vec3 | `[0,0,0]` | Local rest translation |
| `rest_rotation` | vec3 | `[0,0,0]` | Local rest rotation, euler radians in the order rotation_euler uses |
| `rest_scale` | vec3 | `[1,1,1]` | Local rest scale |

## Script functions

Methods of `node.bone3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`skeleton`](../modules/skeleton.md):

| method | what it does |
| --- | --- |
| `apply_rest` | Move every bone under the node back to its rest transform. |
| `bones` | The bones under the node in tree order, the order a skin numbers them in, the node itself first when it is one. |
| `overwrite_rest` | Record every bone's current transform under the node as its new rest pose. |
