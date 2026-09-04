---
title: "Reference — components, asset types and script modules"
image: "/img/social/reference.png"
sidebar_label: "Reference"
sidebar_position: 0
slug: "/reference"
description: "Every component, asset type and script module in the Balaur game engine, read from a booted engine so nothing can drift from what a scene or a script sees."
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
| [`body2d`](./components/body2d.md) | 18 | Makes the node a 2D rigid body rapier simulates, in the xy plane: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. Add a `collider2d` for it to collide with anything. |
| [`bone2d`](./components/bone2d.md) | 4 | Makes the node a 2D bone: the rest position and rotation about z a rig returns to, plus the length and angle its gizmo is drawn with. A skin names its rig by node path and deforms by the bones under it, in tree order. |
| [`character2d`](./components/character2d.md) | 12 | Moves a node the way a 2D player expects: `physics2d.move_character` slides it along walls, steps it up ledges, keeps it off slopes that are too steep and holds it to the ground over a crest. Needs a `collider2d`. |
| [`collider2d`](./components/collider2d.md) | 33 | The shape the node collides with in 2D. On a node with a `body2d` it is that body's shape; on a node without one it is immovable world geometry. A collider on a child node belongs to the nearest body above it, which is how one body carries several shapes. |
| [`joint2d`](./components/joint2d.md) | 18 | Holds this node's body to another one in 2D: a hinge, a slider, a rope, a spring, or a generic joint you lock axis by axis. Both ends need a `body2d`. |
| [`light2d`](./components/light2d.md) | 5 | A 2D light: the node's position places it, its rotation aims a directional one, and everything drawn under it — sprites, polygons, tiles, a 3D scene behind them — is multiplied by the light map the scene's lights build. A scene with no `light2d` draws exactly as it does unlit; the first one added makes everything else fall to the camera's `ambient`. Debug lines and particles draw after the light map and stay unlit. |
| [`modifier2d`](./components/modifier2d.md) | 5 | Aims a 2D bone at a target node every frame, after the clip has posed the rig: `look_at` turns one bone toward the target, `two_bone_ik` bends a root, middle and tip chain so the tip reaches it. |
| [`occluder2d`](./components/occluder2d.md) | 2 | The outline this node blocks 2D light with. Left empty it follows the node's `collider2d`, or failing that its circle, capsule, rect or sprite shape, so the thing a player sees is the thing that casts the shadow. Every edge casts, so an occluder stands in its own shadow: a node that should stay lit wants a smaller outline or a light with `shadows = false`. |
| [`polygon`](./components/polygon.md) | 5 | A filled, textured 2D polygon from a `mesh` asset's points and triangles, deformed by the rig `skeleton` names when the mesh carries skin weights. |
| [`shape2d`](./components/shape2d.md) | 9 | An untextured 2D primitive drawn at the node -- circle, rect, capsule or a polyline traced through a mesh asset's points -- sized in world units. |
| [`sprite`](./components/sprite.md) | 10 | A textured 2D quad at the node, sized from its image at `pixels_per_unit` texture pixels per world unit. A `columns` x `rows` sheet makes it a flipbook `frame` steps through. |
| [`tilemap`](./components/tilemap.md) | 3 | A grid of tiles cut from one `tileset` atlas and centred on the node, one character per cell, drawn at `pixels_per_unit` tile-texture pixels per world unit. |

### 3D

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`body3d`](./components/body3d.md) | 18 | Makes the node a 3D rigid body rapier simulates: `dynamic` falls and responds to forces, `static` never moves, `kinematic` is moved by script or animation and pushes what it meets. On its own a body has no shape; add a `collider3d` for it to collide with anything. |
| [`bone3d`](./components/bone3d.md) | 4 | Makes the node a 3D bone: the rest position, euler rotation and scale a rig returns to, plus the length its gizmo is drawn with. A skinned mesh names its rig by node path and deforms by the bones under it, in tree order. |
| [`camera`](./components/camera.md) | 8 | The view the scene is drawn from, following the node's global pose: `look_at` aims the 3D camera, `zoom` scales the 2D one in logical pixels per world unit. The last `current` camera of a kind, in tree order, drives that view. |
| [`character3d`](./components/character3d.md) | 12 | Moves a node the way a player expects rather than the way physics would: `physics3d.move_character` slides it along walls, steps it up ledges, keeps it off slopes that are too steep and holds it to the ground over a crest. Needs a `collider3d`; a `body3d` of kind kinematic lets it push what it walks into. |
| [`collider3d`](./components/collider3d.md) | 40 | The shape the node collides with in 3D. On a node with a `body3d` it is that body's shape; on a node without one it is immovable world geometry. A collider on a child node belongs to the nearest body above it, which is how one body carries several shapes. |
| [`joint3d`](./components/joint3d.md) | 18 | Holds this node's body to another one: a hinge, a slider, a rope, a spring, a ball socket, or a generic joint you lock axis by axis. Both ends need a `body3d`. |
| [`mesh`](./components/mesh.md) | 4 | Authored 3D geometry from a `mesh` asset, drawn at the node and deformed by the rig `skeleton` names when the asset carries a skin. |
| [`shape3d`](./components/shape3d.md) | 6 | An untextured 3D primitive drawn at the node -- ball, cuboid, capsule, cylinder, cone or plane -- sized in world units and tinted by `color`. |
| [`vehicle3d`](./components/vehicle3d.md) | 2 | Makes this node's body a car chassis, driven by the `wheel3d` children under it. Rapier casts a ray down from each wheel and pushes the chassis along a spring, which is how driving games model cars: it never jams and never tunnels. |
| [`wheel3d`](./components/wheel3d.md) | 11 | One wheel of the `vehicle3d` above it. Where the node sits on the chassis is where the wheel's ray starts; the rest is suspension tuning. Drive it with `physics3d.set_engine_force`, `set_brake` and `set_steering`. |

### Rendering

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`particles`](./components/particles.md) | 9 | A purely visual 2D emitter at the node: rate, lifetime, speed, cone and gravity. The live particles and the randomness scattering them are backend state the simulation never sees. |

### Animation

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`animation`](./components/animation.md) | 4 | Plays animation clips on a node: the library to play them from, one to start when the scene loads, and the rate every clip on the node runs at. The `animation` script module drives the playhead from there. |

### Audio

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`listener`](./components/listener.md) | 1 | The ears a positional sound is heard from: its distance to this node sets its volume, and its offset across this node's right sets its pan. The last `current` listener applied wins; with no listener in the scene at all, every sound plays flat. |
| [`sound`](./components/sound.md) | 10 | A sound of the node's own: which file, at what volume and pitch, looping or not. `audio.play_on` and `audio.stop_on` trigger it, and `autoplay` starts it when the node enters the scene. A `positional` sound is heard from where the node is, relative to the `listener`. |

### UI

| component | properties | what it gives a node |
| --- | ---: | --- |
| [`widget`](./components/widget.md) | 23 | A HUD element the widget layer draws every frame: a label, button or panel anchored to a screen corner or the center, offset in design pixels. A button records its click in `clicked` and calls the node's `on_click` method. |

## Asset types

| type | files | used by |
| --- | --- | --- |
| [`animation_clip`](./assets/animation_clip.md) | `animations/` | `animation.library` |
| [`heightfield`](./assets/heightfield.md) | `terrain/` | `collider2d.heightfield`, `collider3d.heightfield` |
| [`material`](./assets/material.md) | `materials/` | `mesh.material`, `shape2d.material`, `shape3d.material`, `sprite.material` |
| [`mesh`](./assets/mesh.md) | `models/` | `collider2d.mesh`, `collider3d.mesh`, `mesh.source`, `occluder2d.mesh`, `polygon.mesh`, `shape2d.mesh` |
| [`tileset`](./assets/tileset.md) | `tilesets/` | `tilemap.tileset` |
| [`voxels`](./assets/voxels.md) | `terrain/` | `collider3d.voxels` |
| [`widget_theme`](./assets/widget_theme.md) | `themes/` | `widget.theme` |

## Script modules

| module | functions | what it is for |
| --- | ---: | --- |
| [`animation`](./modules/animation.md) | 14 | Clip playback on a node's `animation` component — starting, holding, seeking — and tweens, short clips generated from a table of steps and addressed by the handle they hand back. |
| [`apple`](./modules/apple.md) | 18 | Apple platform services that `platform.*` does not cover. `identity` fetches what a server needs to verify a Game Center player — url, signature, salt and timestamp — and answers on a later tick as a map carrying `kind`, both to the node's `on_apple` method and to whoever awaits the id. Achievements, leaderboards, sign-in and cloud saves are `platform.*`, which speaks Game Center here. |
| [`assets`](./modules/assets.md) | 7 | Asset definitions by reference: a project-relative file path, `file#entry` for one entry inside it, or `#id` for a block the scene declares. A script gets the definition table, not the parsed object the owning plugin builds from it. |
| [`audio`](./modules/audio.md) | 19 | Sound playback: a file plays under an integer handle, with `volume`, `pitch` and `loop` options, and the `sound` component gives a node a sound of its own. Give a `play` a `position` and it is heard from where the `listener` is. With no output device every call still works and nothing is heard. |
| [`debugger`](./modules/debugger.md) | 9 | Breakpoints, the pause a stopped script sits in, and the ways out of it. The same machinery the editor's Debugger dock and the Debug Adapter Protocol server drive, so an outside editor and the built-in one see one debugger. |
| [`engine`](./modules/engine.md) | 8 | The running app itself: the clock a frame reads, the command line it was started with, the directory it may write to, and the way out. |
| [`fs`](./modules/fs.md) | 8 | Files on disk, project-relative unless the path is absolute, so a script cannot wander the filesystem by accident. This is the disk itself: a packed build's contents are reached through `assets` and `scene.source`. |
| [`gamend`](./modules/gamend.md) | 9 | The Gamend backend: a session, its REST API, and a realtime socket carrying topics and server hooks. Every call returns an id to await, and each result also reaches the handler method of the node it was given (`on_gamend_event` unless `on_event` names another) as a map tagged with a `kind`. |
| [`geometry3d`](./modules/geometry3d.md) | 6 | Mesh operations that stand outside the simulation: hulls, convex decomposition, voxelisation, cutting and boolean intersection. A mesh is an asset's name or a table of `points` and `indices`. |
| [`http`](./modules/http.md) | 1 | HTTP calls, off the frame: the reply arrives on a later tick as a map with `status`, `headers` and `body`, or with `error`, both to the node's `on_response` method and to whoever awaits the returned id. Options are `method`, `headers`, `body` and a `timeout` in seconds, which falls back to the project's `[http] timeout`. |
| [`input`](./modules/input.md) | 38 | One frame of input: the keyboard, mouse, touch screen and gamepads as they stand now, plus the edges — what went down or came up this frame. Nothing feeds it in a headless run, where every query answers neutrally rather than failing. |
| [`json`](./modules/json.md) | 2 | JSON text to and from script values, for talking to anything outside the engine. Unlike TOML it has null, so nil survives a round trip. |
| [`log`](./modules/log.md) | 5 | The three levels a script writes at, and the buffer behind them. Scripted lines go through the engine's own `tracing` stream, so they land beside engine ones. |
| [`math`](./modules/math.md) | 24 | Deterministic float maths, backed by pure-Rust `libm`: the same inputs give the same bits on every platform. A script uses these rather than the language's own float methods, which reach for the platform's libm and drift between machines. |
| [`node`](./modules/node.md) | 31 | What every node has: its name and path, its transform in local and world space, its children, its components and its script. Each operation takes the node as its first argument, so scripts normally call them as methods on a node value (`this.node.position()`). |
| [`physics`](./modules/physics.md) | 13 | What spans both physics worlds at once: pausing, sleeping and clearing. Bodies and colliders live in `physics2d` and `physics3d`. |
| [`physics2d`](./modules/physics2d.md) | 62 | The 2D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds. |
| [`physics3d`](./modules/physics3d.md) | 88 | The 3D rigid-body world: bodies and colliders on nodes, their velocities, and overlap queries. `physics` holds what spans both worlds. |
| [`platform`](./modules/platform.md) | 11 | Store services every platform shares: sign-in, achievements, leaderboards and cloud saves. A call returns an id and answers on a later tick, as a map carrying `kind` — `signed_in`, `done`, `scores`, `read`, `failed` or `unsupported` — both to the node's `on_platform` method and to whoever awaits the id. With no store loaded every call answers `unsupported`, so a script written against this runs anywhere. What only one platform has lives in that platform's own module. |
| [`render`](./modules/render.md) | 42 | What a frame is made of: the shape, sprite, mesh or emitter a node draws, the 2D and 3D cameras, the OS window, and the backdrop and debug lines drawn around the scene. |
| [`replay`](./modules/replay.md) | 17 | Record what a running game is fed and play it back. A recording holds each tick's input, network arrivals and events, not the world they produced, so a session is small and replays by re-running the game against the same input. The editor's Session dock drives these, and so does `balaur run --record`. |
| [`rng`](./modules/rng.md) | 4 | The engine's one deterministic PCG32 stream: the same seed draws the same numbers on every platform, and a replay reproduces every draw a recorded session made. |
| [`rollback`](./modules/rollback.md) | 2 | Rollback netcode from a script's side. The session decides each tick's inputs before the tick runs — the real one where it has arrived, a repeat of the player's last one where it has not — and `input` reads whichever it settled on. A tick may run more than once: when a late input contradicts a prediction, the engine restores the tick before it and simulates forward again, so anything a script does with an effect outside the simulation has to ask `is_resimulating` first. |
| [`save`](./modules/save.md) | 5 | Save games: a table in, a table out, stored per user rather than in the project. Nothing here is engine state — a save is whatever the game puts in it — so what the engine decides is only where it lives, that a half-written file cannot replace a good one, and what version it was written at. `[save] version` in `project.toml` sets that version and `[save] migrate` names the script whose `migrate_save(version, data)` brings an older file forward, one version per call. |
| [`scene`](./modules/scene.md) | 13 | The node tree: its root, lookup by path, spawning and instancing. Also the component and preset vocabulary an editor builds its palette from. |
| [`script`](./modules/script.md) | 6 | Loading other scripts, inspecting what they declare, and calling into them without a failure taking the frame down. |
| [`skeleton`](./modules/skeleton.md) | 3 | Bones under a rig node: the rest pose a rig returns to, and the tree order a skin numbers its joints in. A bone is any node carrying `bone2d` or `bone3d`; there is no skeleton component. |
| [`strings`](./modules/strings.md) | 5 | Localization: one `strings/<locale>.toml` per language, keys to strings. `[locale]` in `project.toml` sets the locale a run starts in and the one a missing key falls back to. A key neither has comes back as itself — visible in the game, which is how a missing string gets noticed rather than showing as a blank label. |
| [`task`](./modules/task.md) | 1 | Waiting inside an async handler: `init` and event handlers may await, `update` is deliberately synchronous. |
| [`toml`](./modules/toml.md) | 2 | TOML text to and from script tables: the format scene files, asset definitions and component properties are all written in. |
| [`ui`](./modules/ui.md) | 50 | Immediate-mode UI, redrawn from a script's `draw_ui` every frame: panels, layout containers and the design system's widget shapes. HUD elements that live in the scene tree are the `widget` component instead. |
| [`websocket`](./modules/websocket.md) | 3 | A long-lived connection carrying text or binary frames. Its events are a stream, not a result: each one reaches the connecting node's handler method (`on_websocket_event` unless `on_event` names another) as a map `{ socket, kind, .. }` with kind `open`, `message` (with `text`), `binary` (with `bytes`), `closed` or `error`, and nothing awaits a socket id. |
