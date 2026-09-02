---
title: "bone3d"
custom_edit_url: null
---

# `bone3d`

`3d` · `animation` · 4 properties · 3D

In a scene, `bone3d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `length` | float | `0` | Gizmo length of a tip bone; 0 draws to the first child bone At least 0. |
| `rest_position` | vec3 | `[0,0,0]` | Local rest translation |
| `rest_rotation` | vec3 | `[0,0,0]` | Local rest rotation, euler radians in the order rotation_euler uses |
| `rest_scale` | vec3 | `[1,1,1]` | Local rest scale |
