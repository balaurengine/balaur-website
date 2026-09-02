---
title: "camera"
custom_edit_url: null
---

# `camera`

`3d` · `render` · 4 properties · 3D

In a scene, `camera` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `current` | bool | `true` | Whether this camera drives the view; the last current one wins |
| `kind` | enum | `3d` | Which camera this node drives One of `3d`, `2d`. |
| `look_at` | vec3 | `[0,0,0]` | World point the 3D camera looks at |
| `zoom` | float | `60` | 2D zoom in logical pixels per world unit At least 1. |
