---
title: "Reference"
sidebar_position: 0
slug: /reference
custom_edit_url: null
---

# Reference

Every component, asset type and script module in the engine, read from a booted engine rather than the source, so nothing here can drift from what a scene or a script actually sees.

- A **component** is what gives a node a capability; its page lists the properties a scene sets and a script reads or writes.
- An **asset type** is the content an asset-typed property names, in a file or inline; its page shows the definition table.
- A **script module** is what a script calls; its page lists functions and constants.

## Components

### 2D

| component | tags | properties |
| --- | --- | --- |
| [`body2d`](./components/body2d.md) | `2d` · `physics` | 1 |
| [`bone2d`](./components/bone2d.md) | `2d` · `animation` | 4 |
| [`collider2d`](./components/collider2d.md) | `2d` · `physics` | 8 |
| [`modifier2d`](./components/modifier2d.md) | `2d` · `animation` | 5 |
| [`polygon`](./components/polygon.md) | `2d` · `render` · `animation` | 5 |
| [`shape2d`](./components/shape2d.md) | `2d` · `render` | 8 |
| [`sprite`](./components/sprite.md) | `2d` · `render` | 10 |
| [`tilemap`](./components/tilemap.md) | `2d` · `render` | 3 |

### 3D

| component | tags | properties |
| --- | --- | --- |
| [`body3d`](./components/body3d.md) | `3d` · `physics` | 1 |
| [`bone3d`](./components/bone3d.md) | `3d` · `animation` | 4 |
| [`camera`](./components/camera.md) | `3d` · `render` | 4 |
| [`collider3d`](./components/collider3d.md) | `3d` · `physics` | 14 |
| [`mesh`](./components/mesh.md) | `3d` · `render` | 3 |
| [`shape3d`](./components/shape3d.md) | `3d` · `render` | 5 |

### Rendering

| component | tags | properties |
| --- | --- | --- |
| [`particles`](./components/particles.md) | `render` | 9 |

### Animation

| component | tags | properties |
| --- | --- | --- |
| [`animation`](./components/animation.md) | `animation` | 4 |

### Audio

| component | tags | properties |
| --- | --- | --- |
| [`sound`](./components/sound.md) | `audio` | 5 |

### UI

| component | tags | properties |
| --- | --- | --- |
| [`widget`](./components/widget.md) | `ui` | 12 |

## Asset types

| type | files | used by |
| --- | --- | --- |
| [`animation_clip`](./assets/animation_clip.md) | `animations/` | `animation.library` |
| [`heightfield`](./assets/heightfield.md) | `terrain/` | `collider3d.heightfield` |
| [`material`](./assets/material.md) | `materials/` | `sprite.material` |
| [`mesh`](./assets/mesh.md) | `models/` | `collider3d.mesh`, `mesh.source`, `polygon.mesh`, `shape2d.mesh` |
| [`tileset`](./assets/tileset.md) | `tilesets/` | `tilemap.tileset` |

## Script modules

| module | functions | constants |
| --- | ---: | ---: |
| [`animation`](./modules/animation.md) | 14 | 0 |
| [`assets`](./modules/assets.md) | 6 | 0 |
| [`audio`](./modules/audio.md) | 8 | 0 |
| [`debugger`](./modules/debugger.md) | 9 | 4 |
| [`engine`](./modules/engine.md) | 7 | 0 |
| [`fs`](./modules/fs.md) | 8 | 0 |
| [`gamend`](./modules/gamend.md) | 9 | 0 |
| [`http`](./modules/http.md) | 1 | 0 |
| [`input`](./modules/input.md) | 19 | 190 |
| [`json`](./modules/json.md) | 2 | 0 |
| [`log`](./modules/log.md) | 5 | 0 |
| [`math`](./modules/math.md) | 24 | 3 |
| [`node`](./modules/node.md) | 30 | 0 |
| [`physics`](./modules/physics.md) | 5 | 0 |
| [`physics2d`](./modules/physics2d.md) | 10 | 5 |
| [`physics3d`](./modules/physics3d.md) | 8 | 5 |
| [`render`](./modules/render.md) | 33 | 0 |
| [`rng`](./modules/rng.md) | 4 | 0 |
| [`scene`](./modules/scene.md) | 12 | 0 |
| [`script`](./modules/script.md) | 3 | 0 |
| [`skeleton`](./modules/skeleton.md) | 3 | 0 |
| [`task`](./modules/task.md) | 1 | 0 |
| [`toml`](./modules/toml.md) | 2 | 0 |
| [`ui`](./modules/ui.md) | 44 | 14 |
| [`websocket`](./modules/websocket.md) | 3 | 0 |
