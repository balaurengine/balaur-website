---
title: "camera component"
image: "/img/social/reference.png"
sidebar_label: "camera"
description: "The view the scene is drawn from, following the node's global pose: look_at aims the 3D camera, zoom scales the 2D one in logical pixels per world unit.…"
custom_edit_url: null
---

# `camera`

`3d` · `render` · 8 properties · 3D

The view the scene is drawn from, following the node's global pose: `look_at` aims the 3D camera, `zoom` scales the 2D one in logical pixels per world unit. The last `current` camera of a kind, in tree order, drives that view.

In a scene, `camera` is the node key that applies it. A script reaches the same properties through `node.camera.get()` and `node.camera.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `ambient` | color | `[0,0,0,1]` | Light every 2D surface gets before any `light2d`; only a `2d` camera's is read |
| `bloom_intensity` | float | `0.6` | How much of the bloom is added back over the frame At least 0. |
| `bloom_threshold` | float | `1` | Brightness a pixel has to pass to bloom At least 0. |
| `current` | bool | `true` | Whether this camera drives the view; the last current one wins |
| `kind` | enum | `3d` | Which camera this node drives One of `3d`, `2d`. |
| `look_at` | vec3 | `[0,0,0]` | World point the 3D camera looks at |
| `post` | flags | `[]` | Screen-space effects the frame resolves through; `ssao`, `ssr` and `dof` are 3D only One of `bloom`, `ssao`, `ssr`, `dof`. |
| `zoom` | float | `60` | 2D zoom in logical pixels per world unit At least 1. |
