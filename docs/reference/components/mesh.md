---
title: "mesh"
custom_edit_url: null
---

# `mesh`

`3d` · `render` · 4 properties · 3D

Authored 3D geometry from a `mesh` asset, drawn at the node and deformed by the rig `skeleton` names when the asset carries a skin.

In a scene, `mesh` is the node key that applies it. A script reaches the same properties through `node.mesh.get()` and `node.mesh.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `material` | asset · [`material`](../assets/material.md) | — | The material this draws with; empty draws with the built-in one |
| `skeleton` | string | — | Node path to the rig a skinned mesh deforms with, relative to this node; empty means this node |
| `source` | asset · [`mesh`](../assets/mesh.md) | — | The mesh asset this node draws |
| `texture` | string | — | Image file, project-relative; empty draws the colour alone |

Asset types this component references: [`material`](../assets/material.md), [`mesh`](../assets/mesh.md).
