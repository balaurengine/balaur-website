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
