---
title: "modifier2d component"
sidebar_label: "modifier2d"
description: "Aims a 2D bone at a target node every frame, after the clip has posed the rig: look_at turns one bone toward the target, two_bone_ik bends a root, middle…"
custom_edit_url: null
---

# `modifier2d`

`2d` · `animation` · 5 properties · 2D

Aims a 2D bone at a target node every frame, after the clip has posed the rig: `look_at` turns one bone toward the target, `two_bone_ik` bends a root, middle and tip chain so the tip reaches it.

In a scene, `modifier2d` is the node key that applies it. A script reaches the same properties through `node.modifier2d.get()` and `node.modifier2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `bone` | string | — | Node path to the driven bone, relative to this node; empty means this node. For two_bone_ik, the root of the chain |
| `enabled` | bool | `true` | Whether the modifier runs; off leaves the clip's pose alone |
| `flip` | bool | `false` | Bend the two-bone chain the other way |
| `kind` | enum | `look_at` | Aim one bone at the target, or bend a root, middle, tip chain so the tip reaches it One of `look_at`, `two_bone_ik`. |
| `target` | string | — | Node path to the point to aim at, relative to this node |
