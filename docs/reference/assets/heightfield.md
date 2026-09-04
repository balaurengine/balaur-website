---
title: "heightfield asset type"
image: "/img/social/reference.png"
sidebar_label: "heightfield"
description: "A grid of heights for terrain: rows by columns samples in heights, row-major, one value per grid point. The count has to match the grid."
custom_edit_url: null
---

# `heightfield`

Files live in `terrain/`. Used by [`collider2d`](../components/collider2d.md) · `heightfield`, [`collider3d`](../components/collider3d.md) · `heightfield`.

A grid of heights for terrain: `rows` by `columns` samples in `heights`,
row-major, one value per grid point. The count has to match the grid.

```toml
[[assets]]
id = "valley"
type = "heightfield"
rows = 3
columns = 3
heights = [0, 0, 0, 0, -1, 0, 0, 0, 0]
```
