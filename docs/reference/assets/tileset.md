---
title: "tileset asset type"
image: "/img/social/reference.png"
sidebar_label: "tileset"
description: "An image cut into equal tiles for the tilemap component: texture names the image, tile_size is one tile in pixels — a number, or [w, h] for a sheet whose…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,64V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H216A8,8,0,0,1,224,64Z" opacity="0.2"/><path d="M216,48H40A16,16,0,0,0,24,64V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM104,144V112h48v32Zm48,16v32H104V160ZM40,112H88v32H40Zm64-16V64h48V96Zm64,16h48v32H168Zm48-16H168V64h48ZM88,64V96H40V64ZM40,160H88v32H40Zm176,32H168V160h48v32Z"/></svg></span>`tileset`

Files live in `tilesets/`. Used by [`tilemap`](../components/tilemap.md) · `tileset`.

An image cut into equal tiles for the `tilemap` component: `texture` names
the image, `tile_size` is one tile in pixels — a number, or `[w, h]` for a
sheet whose tiles are not square — and `columns` is how many tiles one row of
the image holds. `spacing` is the gutter between tiles and `margin` the border
around the sheet, both zero by default. Tile indices count row by row from the
top left.

A `[tiles.<id>]` table says what one tile is. `collision` is `"full"` for a
solid cell, or a list of polygons in tile pixels with y down from the tile's
top-left corner; `one_way` makes a platform a body passes through from below.
A tile with no table of its own is the plain quad it always was.

A `[[terrains]]` entry paints by value and lets the sheet pick the tiles.
`mode` is `"rules"`, `"sides"`, `"corners"`, `"corners_and_sides"` or
`"quarters"`, and `first_tile` is where the block starts. `"quarters"` draws a
cell as four quarter quads, each chosen by the two cells beside that corner
and the one across it, from five tiles -- fill, horizontal edge, vertical
edge, outer corner, inner corner. That is how a five-tile sheet covers all 47
neighbourhoods; a sheet that keeps the five somewhere else names them with
`quarters = [...]`.

```toml
[[assets]]
id = "dungeon"
type = "tileset"
texture = "art/dungeon.png"
tile_size = 16
columns = 8

[tiles.3]
collision = "full"

[tiles.7]
collision = [[[0, 16], [16, 16], [16, 8]]]
```
