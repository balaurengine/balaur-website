---
title: "tileset asset type"
image: "/img/social/reference.png"
sidebar_label: "tileset"
description: "An image cut into equal tiles for tilemap: texture, tile_size in pixels and columns per row. [tiles.<id>] gives a tile collision; [[terrains]] auto-tiles…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,64V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H216A8,8,0,0,1,224,64Z" opacity="0.2"/><path d="M216,48H40A16,16,0,0,0,24,64V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM104,144V112h48v32Zm48,16v32H104V160ZM40,112H88v32H40Zm64-16V64h48V96Zm64,16h48v32H168Zm48-16H168V64h48ZM88,64V96H40V64ZM40,160H88v32H40Zm176,32H168V160h48v32Z"/></svg></span>`tileset`

Files live in `tilesets/`. Used by [`tilemap`](../components/tilemap.md) · `tileset`.

An image cut into equal tiles for `tilemap`: `texture`, `tile_size` in pixels and `columns` per row. `[tiles.<id>]` gives a tile `collision`; `[[terrains]]` auto-tiles by `mode`.

```toml
type = "tileset"
texture = "art/dungeon.png"
tile_size = 16                   # or [w, h]
columns = 8
spacing = 0                      # gutter between tiles
margin = 0                       # border around the sheet

[tiles.3]                        # tile ids count row by row from the top left
collision = "full"

[tiles.7]
collision = [[[0, 16], [16, 16], [16, 8]]]   # polygons in tile pixels, y down
one_way = true                   # a platform a body passes through from below

[[terrains]]                     # paints by value and picks the tiles
name = "grass"
value = 1
mode = "quarters"                # rules, sides, corners, corners_and_sides or quarters
first_tile = 16
# quarters = [fill, horizontal edge, vertical edge, outer corner, inner corner] tile ids, when they do not follow first_tile
```
