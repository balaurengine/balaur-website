---
title: "sound"
custom_edit_url: null
---

# `sound`

`audio` · 5 properties · Audio

In a scene, `sound` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `autoplay` | bool | `false` | Start playing when the node enters the scene |
| `file` | string | — | Audio file, project-relative; required to play |
| `loop` | bool | `false` | Restart the sound when it ends |
| `pitch` | float | `1` | Playback speed multiplier At least 0.01. |
| `volume` | float | `1` | Linear gain; 1 is the file's own level At least 0. |

## Script functions

Methods of `node.sound`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`audio`](../modules/audio.md):

- `play_on() -> int`
- `stop_on()`

Module-level, not on the handle:

- `audio::is_playing(int) -> bool`
- `audio::play(string, any?) -> int`
- `audio::set_pitch(int, float)`
- `audio::set_volume(int, float)`
- `audio::stop(int)`
- `audio::stop_all()`
