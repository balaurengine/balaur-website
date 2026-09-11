---
title: "material component"
image: "/img/social/reference.png"
sidebar_label: "material"
description: "The material this node and everything under it draw with, unless a renderable names its own. A shape's, sprite's, mesh's or tile map's own material is…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--render" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"/></svg></span>`material`

`render` · 1 property · Rendering

The material this node and everything under it draw with, unless a renderable names its own. A shape's, sprite's, mesh's or tile map's own `material` is that node's alone; this is the one that inherits. Goes on any node, one that draws nothing included.

In a scene, `material` is the node key that applies it. A script reaches each property below as a field on `node.material`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.material.get()` and `node.material.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `source` | asset · [`material`](../assets/material.md) | — | The material asset; empty takes the parent's |

Asset types this component references: [`material`](../assets/material.md).
