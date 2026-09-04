---
title: "vehicle3d component"
image: "/img/social/reference.png"
sidebar_label: "vehicle3d"
description: "Makes this node's body a car chassis, driven by the wheel3d children under it. Rapier casts a ray down from each wheel and pushes the chassis along a…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M184,176h40v24a8,8,0,0,1-8,8H192a8,8,0,0,1-8-8ZM32,200a8,8,0,0,0,8,8H64a8,8,0,0,0,8-8V176H32ZM194.11,44.75A8,8,0,0,0,186.8,40H69.2a8,8,0,0,0-7.31,4.75L32,112H224Z" opacity="0.2"/><path d="M240,104H229.2L201.42,41.5A16,16,0,0,0,186.8,32H69.2a16,16,0,0,0-14.62,9.5L26.8,104H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V184h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V120h8a8,8,0,0,0,0-16ZM69.2,48H186.8l24.89,56H44.31ZM64,200H40V184H64Zm128,0V184h24v16Zm24-32H40V120H216ZM56,144a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,144Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,144Z"/></svg></span>`vehicle3d`

`3d` · `physics` · 2 properties · 3D

Makes this node's body a car chassis, driven by the `wheel3d` children under it. Rapier casts a ray down from each wheel and pushes the chassis along a spring, which is how driving games model cars: it never jams and never tunnels.

In a scene, `vehicle3d` is the node key that applies it. A script reaches the same properties through `node.vehicle3d.get()` and `node.vehicle3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `forward_axis` | float | `2` | Which of the chassis's own axes points forward Range 0–2. |
| `up_axis` | float | `1` | Which of the chassis's own axes points up: 0 for x, 1 for y, 2 for z Range 0–2. |

## Script functions

Methods of `node.vehicle3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`physics3d`](../modules/physics3d.md):

| method | what it does |
| --- | --- |
| `vehicle_speed() -> float` | How fast the chassis is going along its forward axis, in units per second. |
