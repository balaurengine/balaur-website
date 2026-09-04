---
title: "tilemap component"
image: "/img/social/reference.png"
sidebar_label: "tilemap"
description: "A grid of tiles cut from one tileset atlas and centred on the node, one character per cell, drawn at pixels_per_unit tile-texture pixels per world unit."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z" opacity="0.2"/><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,80H136V56h64ZM120,56v64H56V56ZM56,136h64v64H56Zm144,64H136V136h64v64Z"/></svg></span>`tilemap`

`2d` · `render` · 3 properties · 2D

A grid of tiles cut from one `tileset` atlas and centred on the node, one character per cell, drawn at `pixels_per_unit` tile-texture pixels per world unit.

In a scene, `tilemap` is the node key that applies it. A script reaches the same properties through `node.tilemap.get()` and `node.tilemap.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `cells` | string | — | Rows of tile characters, one row per line: . is empty, 0-9 then a-z index into the tileset |
| `pixels_per_unit` | float | `100` | Tile-texture pixels per world unit At least 0.01. |
| `tileset` | asset · [`tileset`](../assets/tileset.md) | — | The tileset naming the texture and tile grid |

Asset types this component references: [`tileset`](../assets/tileset.md).
