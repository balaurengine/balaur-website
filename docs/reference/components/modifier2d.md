---
title: "modifier2d"
custom_edit_url: null
---

# `modifier2d`

`2d` · `animation` · 5 properties · 2D

In a scene, `modifier2d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `bone` | string | — | Node path to the driven bone, relative to this node; empty means this node. For two_bone_ik, the root of the chain |
| `enabled` | bool | `true` | Whether the modifier runs; off leaves the clip's pose alone |
| `flip` | bool | `false` | Bend the two-bone chain the other way |
| `kind` | enum | `look_at` | Aim one bone at the target, or bend a root, middle, tip chain so the tip reaches it One of `look_at`, `two_bone_ik`. |
| `target` | string | — | Node path to the point to aim at, relative to this node |
