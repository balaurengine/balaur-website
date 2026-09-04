---
title: "camera component"
image: "/img/social/reference.png"
sidebar_label: "camera"
description: "The view the scene is drawn from, following the node's global pose: look_at aims the 3D camera, zoom scales the 2D one in logical pixels per world unit.…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,72V184a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H192A8,8,0,0,1,200,72Z" opacity="0.2"/><path d="M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z"/></svg></span>`camera`

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
