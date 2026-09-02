---
title: "mesh"
custom_edit_url: null
---

# `mesh`

`3d` · `render` · 3 properties · 3D

In a scene, `mesh` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `skeleton` | string | — | Node path to the rig a skinned mesh deforms with, relative to this node; empty means this node |
| `source` | asset · [`mesh`](../assets/mesh.md) | — | The mesh asset this node draws |
| `texture` | string | — | Image file, project-relative; empty draws the colour alone |

Asset types this component references: [`mesh`](../assets/mesh.md).
