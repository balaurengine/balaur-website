---
title: "tileset asset type"
sidebar_label: "tileset"
description: "An image cut into equal tiles for the tilemap component: texture names the image, tile_size is the pixel length of one tile edge and columns is how many…"
custom_edit_url: null
---

# `tileset`

Files live in `tilesets/`. Used by [`tilemap`](../components/tilemap.md) · `tileset`.

An image cut into equal tiles for the `tilemap` component: `texture` names
the image, `tile_size` is the pixel length of one tile edge and `columns` is
how many tiles one row of the image holds. Tile indices count row by row
from the top left.

```toml
[[assets]]
id = "dungeon"
type = "tileset"
texture = "art/dungeon.png"
tile_size = 16
columns = 8
```
