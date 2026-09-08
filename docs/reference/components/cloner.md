---
title: "cloner component"
image: "/img/social/reference.png"
sidebar_label: "cloner"
description: "Draw this node's whole subtree many times over -- along a line, around a ring, or through a grid -- in one call per mesh. The tree, physics and scripts…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--render" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"/></svg></span>`cloner`

`render` · 8 properties · Rendering

Draw this node's whole subtree many times over -- along a line, around a ring, or through a grid -- in one call per mesh. The tree, physics and scripts still see one node; `seed` and `random` scatter the copies.

In a scene, `cloner` is the node key that applies it. A script reaches each property below as a field on `node.cloner`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.cloner.get()` and `node.cloner.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `angle` | float | `0` | Degrees between copies on a ring; zero closes the ring evenly |
| `count` | int | `4` | How many copies, when mode is linear or radial At least 1. |
| `counts` | vec3 | `[3,1,3]` | How many along each axis, when mode is grid |
| `mode` | enum | `linear` | How the copies are laid out One of `linear`, `radial`, `grid`. |
| `radius` | float | `2` | How far out the ring sits, when mode is radial |
| `random` | float | `0` | How far a copy may wander in position, turn and size Range 0–1. |
| `seed` | int | `0` | The seed the scatter runs off; zero scatters nothing At least 0. |
| `step` | vec3 | `[1,0,0]` | The gap between copies, when mode is linear or grid |

## Script functions

Methods of `node.cloner`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `clones() -> any` | Where the node's cloner puts each copy, in the node's own space, as `#{ position, rotation, scale }`; an empty list when the node has no cloner. What a bake-to-nodes command spawns from. |
