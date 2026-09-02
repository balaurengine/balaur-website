---
title: "body2d"
custom_edit_url: null
---

# `body2d`

`2d` · `physics` · 1 property · 2D

In a scene, `body2d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `kind` | enum | `dynamic` | How 2D physics drives the node: simulated, immovable, or moved by script One of `dynamic`, `static`, `kinematic`. Scene shorthand: `kind`'s value can be given as the component's whole value. |
