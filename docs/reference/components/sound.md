---
title: "sound"
custom_edit_url: null
---

# `sound`

`audio` · 5 properties · Audio

A sound of the node's own: which file, at what volume and pitch, \
                  looping or not. `audio.play_on` and `audio.stop_on` trigger it, and \
                  `autoplay` starts it when the node enters the scene.

In a scene, `sound` is the node key that applies it. A script reaches the same properties through `node.sound.get()` and `node.sound.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `autoplay` | bool | `false` | Start playing when the node enters the scene |
| `file` | string | — | Audio file, project-relative; required to play |
| `loop` | bool | `false` | Restart the sound when it ends |
| `pitch` | float | `1` | Playback speed multiplier At least 0.01. |
| `volume` | float | `1` | Linear gain; 1 is the file's own level At least 0. |

## Script functions

Methods of `node.sound`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`audio`](../modules/audio.md):

| method | what it does |
| --- | --- |
| `play_on() -> int` | Start the node's own `sound` from the top, replacing what it had going, and return the new handle. |
| `stop_on()` | Silence what the node's `sound` started; a node carrying none is left alone. |
