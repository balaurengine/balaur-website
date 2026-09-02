---
title: "animation"
custom_edit_url: null
---

# `animation`

`animation` · 4 properties · Animation

In a scene, `animation` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `autoplay` | string | — | Clip to start when the scene loads; empty starts nothing |
| `library` | asset · [`animation_clip`](../assets/animation_clip.md) | — | The clip library this node plays from |
| `root` | string | — | Node path the clip's tracks resolve against; empty means this node |
| `speed` | float | `1` | Playback rate for every clip on this node |

Asset types this component references: [`animation_clip`](../assets/animation_clip.md).

## Script functions

Methods of `node.animation`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`animation`](../modules/animation.md):

- `current() -> string?`
- `define(string, any)`
- `is_playing() -> bool`
- `just_finished() -> string?`
- `pause()`
- `play(string, any?)`
- `queue(string)`
- `resume()`
- `seek(float)`
- `time() -> float`
- `tween(any) -> int`
- `tween_to(string, any, float, string?) -> int`

Module-level, not on the handle:

- `animation::is_running(any) -> bool`
- `animation::stop(any)`
