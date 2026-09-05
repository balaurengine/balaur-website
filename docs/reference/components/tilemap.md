---
title: "tilemap component"
image: "/img/social/reference.png"
sidebar_label: "tilemap"
description: "A grid of tiles cut from one tileset atlas and centred on the node, one character per cell, drawn at pixels_per_unit tile-texture pixels per world unit."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z" opacity="0.2"/><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,80H136V56h64ZM120,56v64H56V56ZM56,136h64v64H56Zm144,64H136V136h64v64Z"/></svg></span>`tilemap`

`2d` · `render` · 4 properties · 2D

A grid of tiles cut from one `tileset` atlas and centred on the node, one character per cell, drawn at `pixels_per_unit` tile-texture pixels per world unit.

In a scene, `tilemap` is the node key that applies it. A script reaches the same properties through `node.tilemap.get()` and `node.tilemap.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `cells` | string | — | Rows of tile characters, one row per line: . is empty, 0-9 then a-z index into the tileset. Also accepted: a list of rows of tile ids, -1 for empty, for a tileset past 36 tiles |
| `material` | asset · [`material`](../assets/material.md) | — | The material the whole map draws with; empty draws with the built-in one |
| `pixels_per_unit` | float | `100` | Tile-texture pixels per world unit At least 0.01. |
| `tileset` | asset · [`tileset`](../assets/tileset.md) | — | The tileset naming the texture and tile grid |

Asset types this component references: [`material`](../assets/material.md), [`tileset`](../assets/tileset.md).

## Script functions

Methods of `node.tilemap`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `cell(int, int) -> int` | The tile at a column and row, or -1 for an empty cell or one past the edge. |
| `set_cell(int, int, int)` | Put one tile at a column and row, counted from the top left; below zero clears the cell, and a cell past the edge grows the map. The mesh rebuilds on the next frame. |
