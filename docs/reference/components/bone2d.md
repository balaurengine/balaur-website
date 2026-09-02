---
title: "bone2d"
custom_edit_url: null
---

# `bone2d`

`2d` · `animation` · 4 properties · 2D

In a scene, `bone2d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `angle` | float | `0` | Gizmo direction of a tip bone, in radians; ignored while a child bone exists |
| `length` | float | `0` | Gizmo length of a tip bone; 0 draws to the first child bone At least 0. |
| `rest_position` | vec2 | `[0,0]` | Local rest translation |
| `rest_rotation` | float | `0` | Local rest rotation about z, in radians |
