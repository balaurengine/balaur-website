---
title: "voxels asset type"
image: "/img/social/reference.png"
sidebar_label: "voxels"
description: "A voxel grid for a collider: size is one cell in world units, cells the filled coordinates. Coordinates are signed, so a grid has no origin corner, and…"
custom_edit_url: null
---

# `voxels`

Files live in `terrain/`. Used by [`collider3d`](../components/collider3d.md) · `voxels`.

A voxel grid for a collider: `size` is one cell in world units, `cells` the
filled coordinates. Coordinates are signed, so a grid has no origin corner,
and `physics3d.set_voxel` may add or remove a cell at run time.

```toml
[[assets]]
id = "pillar"
type = "voxels"
size = [1.0, 1.0, 1.0]
cells = [[0, 0, 0], [0, 1, 0], [0, 2, 0]]
```
