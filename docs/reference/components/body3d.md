---
title: "body3d"
custom_edit_url: null
---

# `body3d`

`3d` · `physics` · 1 property · 3D

In a scene, `body3d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `kind` | enum | `dynamic` | How physics drives the node: simulated, immovable, or moved by script One of `dynamic`, `static`, `kinematic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |
