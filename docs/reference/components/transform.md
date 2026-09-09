---
title: "transform component"
image: "/img/social/reference.png"
sidebar_label: "transform"
description: "Where the node sits in its parent's space, how it is turned and how big it is. A node without one is at its parent: propagate_transforms hands the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg></span>`transform`

`2d` · `3d` · 3 properties · 2D

Where the node sits in its parent's space, how it is turned and how big it is. A node without one is at its parent: `propagate_transforms` hands the parent's world transform straight down, which is what a node that only groups or only draws UI wants.

In a scene, `transform` is the node key that applies it. A script reaches each property below as a field on `node.transform`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.transform.get()` and `node.transform.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `position` | vec3 | `[0,0,0]` | Where the node sits in its parent's space |
| `rotation_euler` | vec3 | `[0,0,0]` | Local rotation as euler angles in radians, x then y then z |
| `scale` | vec3 | `[1,1,1]` | Size relative to the parent's |
