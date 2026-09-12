---
title: "tilemap component"
image: "/img/social/reference.png"
sidebar_label: "tilemap"
description: "A grid of tiles from one tileset asset, centred on the node. cells holds one character per cell; pixels_per_unit is tile pixels per world unit."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z" opacity="0.2"/><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,80H136V56h64ZM120,56v64H56V56ZM56,136h64v64H56Zm144,64H136V136h64v64Z"/></svg></span>`tilemap`

`2d` · `render` · 8 properties · 2D

A grid of tiles from one `tileset` asset, centred on the node. `cells` holds one character per cell; `pixels_per_unit` is tile pixels per world unit.

In a scene, `tilemap` is the node key that applies it. A script reaches each property below as a field on `node.tilemap`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.tilemap.get()` and `node.tilemap.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `cells` | string | — | Rows of tile characters, one row per line: . is empty, 0-9 then a-z index into the tileset. Also accepted: a list of rows of tile ids, -1 for empty, for a tileset past 36 tiles; or the name of a .cells file holding those rows, for a level too big to read in a scene |
| `flags` | string | — | How each cell is turned, as rows of numbers beside `cells`: 1 mirrors it left to right, 2 top to bottom, 4 across its diagonal |
| `material` | asset · [`material`](../assets/material.md) | — | The material the whole map draws with; empty draws with the built-in one |
| `origin` | vec2 | `[0,0]` | The column and row of the first cell: a map grows in any direction by moving this, and cell 0,0 always has its top-left corner on the node |
| `pixels_per_unit` | float | `100` | Tile-texture pixels per world unit At least 0.01. |
| `seed` | int | `0` | Which way the variation falls where a rule offers alternates; the same seed lays a map out the same way every time At least 0. |
| `terrain` | string | — | What was painted, as rows of terrain values, when the map autotiles: the cells are resolved from this through the tileset's rules |
| `tileset` | asset · [`tileset`](../assets/tileset.md) | — | The tileset naming the texture and tile grid |

Asset types this component references: [`material`](../assets/material.md), [`tileset`](../assets/tileset.md).

## Script functions

Methods of `node.tilemap`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `cell(int, int) -> int` | The tile at a column and row, or -1 for an empty cell or one past the edge. |
| `set_cell(int, int, int)` | Put one tile at a column and row; a tile below zero clears the cell, and a cell outside the map grows it in that direction. The mesh rebuilds on the next frame. |
| `set_terrain(int, int, int)` | Paint a terrain value at a column and row and let the tileset's rules pick the tiles, for that cell and the ring around it; below zero clears it. |
| `terrain(int, int) -> int` | The terrain value painted at a column and row, or -1 where nothing was painted. |
| `tile_data(int, int) -> any` | What the tileset says about the tile at a column and row -- its `[tiles.<id>.data]` table -- or nil where the cell is empty or the tile carries none. |
