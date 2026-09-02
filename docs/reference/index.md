---
title: "Reference"
sidebar_position: 0
slug: /reference
custom_edit_url: null
---

# Reference

Every component, asset type and script module in the engine, read from a booted engine rather than the source, so nothing here can drift from what a scene or a script actually sees.

- A **component** is what gives a node a capability; its page lists the properties a scene sets and the functions a script calls on it.
- An **asset type** is the content an asset-typed property names, in a file or inline; its page shows the definition table.
- A **script module** is what a script calls; its page lists functions and constants.

## Components

### 2D

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`body2d`](./components/body2d.md) | 1 | Makes the node a 2D rigid body rapier simulates: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. On its own a body has no shape; add a `collider2d` for it to collide with anything. |
| [`bone2d`](./components/bone2d.md) | 4 | Makes the node a 2D bone: the rest position and rotation about z a rig returns \ to, plus the length and angle its gizmo is drawn with. A skin names its rig by \ node path and deforms by the bones under it, in tree order. |
| [`collider2d`](./components/collider2d.md) | 8 | The shape the 2D physics world sees for this node, and the surface it presents: friction, bounciness and density. With a `body2d` it moves with the body; on its own it is static geometry a scene can be built from. A sensor reports overlaps without pushing anything. |
| [`modifier2d`](./components/modifier2d.md) | 5 | Aims a 2D bone at a target node every frame, after the clip has posed the rig: \ `look_at` turns one bone toward the target, `two_bone_ik` bends a root, middle \ and tip chain so the tip reaches it. |
| [`polygon`](./components/polygon.md) | 5 | A filled, textured 2D polygon from a `mesh` asset's points and triangles, deformed by the rig `skeleton` names when the mesh carries skin weights. |
| [`shape2d`](./components/shape2d.md) | 8 | An untextured 2D primitive drawn at the node -- circle, rect, capsule or a polyline traced through a mesh asset's points -- sized in world units. |
| [`sprite`](./components/sprite.md) | 10 | A textured 2D quad at the node, sized from its image at `pixels_per_unit` texture pixels per world unit. A `columns` x `rows` sheet makes it a flipbook `frame` steps through. |
| [`tilemap`](./components/tilemap.md) | 3 | A grid of tiles cut from one `tileset` atlas and centred on the node, one character per cell, drawn at `pixels_per_unit` tile-texture pixels per world unit. |

### 3D

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`body3d`](./components/body3d.md) | 1 | Makes the node a 3D rigid body rapier simulates: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. On its own a body has no shape; add a `collider3d` for it to collide with anything. |
| [`bone3d`](./components/bone3d.md) | 4 | Makes the node a 3D bone: the rest position, euler rotation and scale a rig \ returns to, plus the length its gizmo is drawn with. A skinned mesh names its \ rig by node path and deforms by the bones under it, in tree order. |
| [`camera`](./components/camera.md) | 4 | The view the scene is drawn from, following the node's global pose: `look_at` aims the 3D camera, `zoom` scales the 2D one in logical pixels per world unit. The last `current` camera of a kind, in tree order, drives that view. |
| [`collider3d`](./components/collider3d.md) | 14 | The shape the 3D physics world sees for this node, and the surface it presents: friction, bounciness and density. With a `body3d` it moves with the body; on its own it is static geometry a scene can be built from. A sensor reports overlaps without pushing anything. |
| [`mesh`](./components/mesh.md) | 3 |  |
| [`shape3d`](./components/shape3d.md) | 5 | An untextured 3D primitive drawn at the node -- ball, cuboid, capsule, cylinder, cone or plane -- sized in world units and tinted by `color`. |

### Rendering

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`particles`](./components/particles.md) | 9 | A purely visual 2D emitter at the node: rate, lifetime, speed, cone and gravity. The live particles and the randomness scattering them are backend state the simulation never sees. |

### Animation

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`animation`](./components/animation.md) | 4 | Plays animation clips on a node: the library to play them from, one to start \ when the scene loads, and the rate every clip on the node runs at. The \ `animation` script module drives the playhead from there. |

### Audio

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`sound`](./components/sound.md) | 5 | A sound of the node's own: which file, at what volume and pitch, \ looping or not. `audio.play_on` and `audio.stop_on` trigger it, and \ `autoplay` starts it when the node enters the scene. |

### UI

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`widget`](./components/widget.md) | 12 | A HUD element the widget layer draws every frame: a label, button or panel \ anchored to a screen corner or the center, offset in design pixels. A button \ records its click in `clicked` and calls the node's `on_click` method. |

## Asset types

| type | files | used by |
| --- | --- | --- |
| [`animation_clip`](./assets/animation_clip.md) | `animations/` | `animation.library` |
| [`heightfield`](./assets/heightfield.md) | `terrain/` | `collider3d.heightfield` |
| [`material`](./assets/material.md) | `materials/` | `sprite.material` |
| [`mesh`](./assets/mesh.md) | `models/` | `collider3d.mesh`, `mesh.source`, `polygon.mesh`, `shape2d.mesh` |
| [`tileset`](./assets/tileset.md) | `tilesets/` | `tilemap.tileset` |

## Script modules

| module | functions | what it is for |
| --- | ---: | --- |
| [`animation`](./modules/animation.md) | 14 | Clip playback on a node's `animation` component — starting, holding, seeking — and tweens, short clips generated from a table of steps and addressed by the handle they hand back. |
| [`assets`](./modules/assets.md) | 6 |  |
| [`audio`](./modules/audio.md) | 8 | Sound playback: a file plays under an integer handle, with `volume`, `pitch` and `loop` options, and the `sound` component gives a node a sound of its own. With no output device every call still works and nothing is heard. |
| [`debugger`](./modules/debugger.md) | 9 | Breakpoints, the pause a stopped script sits in, and the ways out of it. The same machinery the editor's Debugger dock and the Debug Adapter Protocol server drive, so an outside editor and the built-in one see one debugger. |
| [`engine`](./modules/engine.md) | 7 |  |
| [`fs`](./modules/fs.md) | 8 |  |
| [`gamend`](./modules/gamend.md) | 9 | The Gamend backend: a session, its REST API, and a realtime socket carrying topics and server hooks. Every call returns an id to await, and each result also reaches the handler method of the node it was given (`on_gamend_event` unless `on_event` names another) as a map tagged with a `kind`. |
| [`http`](./modules/http.md) | 1 |  |
| [`input`](./modules/input.md) | 19 | One frame of input: the keyboard, mouse, touch screen and gamepads as they stand now, plus the edges — what went down or came up this frame. Nothing feeds it in a headless run, where every query answers neutrally rather than failing. |
| [`json`](./modules/json.md) | 2 |  |
| [`log`](./modules/log.md) | 5 |  |
| [`math`](./modules/math.md) | 24 | Deterministic float maths, backed by pure-Rust `libm`: the same inputs give the same bits on every platform. A script uses these rather than the language's own float methods, which reach for the platform's libm and drift between machines. |
| [`node`](./modules/node.md) | 30 | What every node has: its name and path, its transform in local and world space, its children, its components and its script. Each operation takes the node as its first argument, so scripts normally call them as methods on a node value (`this.node.position()`). |
| [`physics`](./modules/physics.md) | 5 | The 3D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds. |
| [`physics2d`](./modules/physics2d.md) | 10 | The 2D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds. |
| [`physics3d`](./modules/physics3d.md) | 8 |  |
| [`render`](./modules/render.md) | 33 | What a frame is made of: the shape, sprite, mesh or emitter a node draws, the 2D and 3D cameras, the OS window, and the backdrop and debug lines drawn around the scene. |
| [`rng`](./modules/rng.md) | 4 |  |
| [`scene`](./modules/scene.md) | 12 |  |
| [`script`](./modules/script.md) | 3 |  |
| [`skeleton`](./modules/skeleton.md) | 3 |  |
| [`task`](./modules/task.md) | 1 |  |
| [`toml`](./modules/toml.md) | 2 |  |
| [`ui`](./modules/ui.md) | 44 | Immediate-mode UI, redrawn from a script's `draw_ui` every frame: panels, layout containers and the design system's widget shapes. HUD elements that live in the scene tree are the `widget` component instead. |
| [`websocket`](./modules/websocket.md) | 3 |  |
