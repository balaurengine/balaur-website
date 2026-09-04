---
title: "sound component"
image: "/img/social/reference.png"
sidebar_label: "sound"
description: "A sound of the node's own: which file, at what volume and pitch, looping or not. audio.play_on and audio.stop_on trigger it, and autoplay starts it when…"
custom_edit_url: null
---

# `sound`

`audio` · 10 properties · Audio

A sound of the node's own: which file, at what volume and pitch, looping or not. `audio.play_on` and `audio.stop_on` trigger it, and `autoplay` starts it when the node enters the scene. A `positional` sound is heard from where the node is, relative to the `listener`.

In a scene, `sound` is the node key that applies it. A script reaches the same properties through `node.sound.get()` and `node.sound.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `autoplay` | bool | `false` | Start playing when the node enters the scene |
| `bus` | string | — | Audio bus this plays through; empty is `master` |
| `doppler` | float | `0` | How much the closing speed bends the pitch; 0 is off, 1 physical At least 0. |
| `file` | string | — | Audio file, project-relative; required to play |
| `loop` | bool | `false` | Restart the sound when it ends |
| `max_distance` | float | `50` | Silent beyond this distance from the listener At least 0.001. |
| `min_distance` | float | `1` | Full volume within this distance of the listener At least 0.001. |
| `pitch` | float | `1` | Playback speed multiplier At least 0.01. |
| `positional` | bool | `false` | Place the sound where the node is, heard from the `listener` |
| `volume` | float | `1` | Linear gain; 1 is the file's own level At least 0. |

## Script functions

Methods of `node.sound`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`audio`](../modules/audio.md):

| method | what it does |
| --- | --- |
| `play_on() -> int` | Start the node's own `sound` from the top, replacing what it had going, and return the new handle. |
| `stop_on()` | Silence what the node's `sound` started; a node carrying none is left alone. |
