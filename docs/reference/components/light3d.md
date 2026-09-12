---
title: "light3d component"
image: "/img/social/reference.png"
sidebar_label: "light3d"
description: "A 3D light placed and aimed by the node. kind is directional, point or spot; the first light3d in a scene retires the engine's default key light."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"/></svg></span>`light3d`

`3d` · `render` · 8 properties · 3D

A 3D light placed and aimed by the node. `kind` is `directional`, `point` or `spot`; the first `light3d` in a scene retires the engine's default key light.

In a scene, `light3d` is the node key that applies it. A script reaches each property below as a field on `node.light3d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.light3d.get()` and `node.light3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[1,1,1,1]` | Light colour, as channel floats or #rrggbb / #rrggbbaa |
| `inner` | float | `20` | Half-angle of a spot light's full-brightness cone, in degrees Range 0–179. |
| `intensity` | float | `3` | Brightness multiplier; over 1 blows past white At least 0. |
| `kind` | enum | `directional` | A point light fades to nothing at `radius`, a directional one lights the whole scene, a spot one throws a cone the node aims One of `directional`, `point`, `spot`. |
| `layers` | int | `-1` | Light-layer bitmask; a node is lit when its own `layers` share a bit with these. -1 is every layer |
| `outer` | float | `35` | Half-angle a spot light fades to nothing at, in degrees Range 0–179. |
| `radius` | float | `30` | How far a point or spot light reaches, in world units At least 0. |
| `shadows` | bool | `true` | Whether this light casts shadows from the nodes that say they cast |
