---
title: "boolean2d component"
image: "/img/social/reference.png"
sidebar_label: "boolean2d"
description: "Draw this node as its 2D children combined -- joined, cut out of one another, or only where they overlap. The children stay in the tree, hidden and…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg></span>`boolean2d`

`2d` · `render` · 1 property · 2D

Draw this node as its 2D children combined -- joined, cut out of one another, or only where they overlap. The children stay in the tree, hidden and editable.

In a scene, `boolean2d` is the node key that applies it. A script reaches each property below as a field on `node.boolean2d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.boolean2d.get()` and `node.boolean2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `op` | enum | `union` | How the children are combined, in the order they are declared One of `union`, `difference`, `intersection`. |
