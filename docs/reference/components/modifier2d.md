---
title: "modifier2d component"
image: "/img/social/reference.png"
sidebar_label: "modifier2d"
description: "Aims a 2D bone at a target node every frame, after the clip has posed the rig: look_at turns one bone toward the target, two_bone_ik bends a root, middle…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,80a24,24,0,1,1-24-24A24,24,0,0,1,128,80Zm40,72a24,24,0,1,0,24,24A24,24,0,0,0,168,152Z" opacity="0.2"/><path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"/></svg></span>`modifier2d`

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
