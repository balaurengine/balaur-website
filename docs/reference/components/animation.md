---
title: "animation"
custom_edit_url: null
---

# `animation`

`animation` · 4 properties · Animation

Plays animation clips on a node: the library to play them from, one to start when the scene loads, and the rate every clip on the node runs at. The `animation` script module drives the playhead from there.

In a scene, `animation` is the node key that applies it. A script reaches the same properties through `node.animation.get()` and `node.animation.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `autoplay` | string | — | Clip to start when the scene loads; empty starts nothing |
| `library` | asset · [`animation_clip`](../assets/animation_clip.md) | — | The clip library this node plays from |
| `root` | string | — | Node path the clip's tracks resolve against; empty means this node |
| `speed` | float | `1` | Playback rate for every clip on this node |

Asset types this component references: [`animation_clip`](../assets/animation_clip.md).

## Script functions

Methods of `node.animation`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`animation`](../modules/animation.md):

| method | what it does |
| --- | --- |
| `current() -> string?` | The clip playing or paused on this node, and nil once it has ended, been stopped, or never started. |
| `define(string, any)` | Give this node a clip of its own under that name, from a definition table shaped like a scene file's. |
| `is_playing() -> bool` | Whether a clip is advancing on this node; a paused, stopped, finished or absent one answers false. |
| `just_finished() -> string?` | The clip that ended on this node during the last step, and nil on every other frame. |
| `pause()` | Hold the playhead where it is, keeping the clip current so `resume` has something to go back to. |
| `play(string, any?)` | Start the clip of that name on this node; the trailing options table takes `speed` (a multiplier) and `from_start`. |
| `queue(string)` | Play the clip of that name once the current one ends; a looping clip never ends, so a queue behind one never drains. |
| `resume()` | Carry on from where `pause` left off; a stopped, finished or never-started node is left alone. |
| `seek(float)` | Move the playhead to a number of seconds and pose the node there, even on a paused or ended clip. |
| `stop()` | End the clip on a node, or the tween a handle names, leaving the pose where it is; `resume` cannot revive it. |
| `time() -> float` | Seconds of playback since the current clip started, before wrapping; a stopped clip keeps where it stopped. |
