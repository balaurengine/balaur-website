---
title: "sound component"
image: "/img/social/reference.png"
sidebar_label: "sound"
description: "A sound of the node's own: which file, at what volume and pitch, looping or not. audio.play_on and audio.stop_on trigger it, and autoplay starts it when…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--audio" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M80,88v80H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8Z" opacity="0.2"/><path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"/></svg></span>`sound`

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
