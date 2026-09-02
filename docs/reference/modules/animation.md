---
title: "animation"
custom_edit_url: null
---

# `animation`

Clip playback on a node's `animation` component — starting, holding, seeking — and tweens, short clips generated from a table of steps and addressed by the handle they hand back.

14 functions, 0 constants. Scripts reach it as `animation::`.

Acts on [`animation`](../components/animation.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `current(node) -> string?` | [`animation`](../components/animation.md) | The clip playing or paused on this node, and nil once it has ended, been stopped, or never started. |
| `define(node, string, any)` | [`animation`](../components/animation.md) | Give this node a clip of its own under that name, from a definition table shaped like a scene file's. |
| `is_playing(node) -> bool` | [`animation`](../components/animation.md) | Whether a clip is advancing on this node; a paused, stopped, finished or absent one answers false. |
| `is_running(any) -> bool` | — |  |
| `just_finished(node) -> string?` | [`animation`](../components/animation.md) | The clip that ended on this node during the last step, and nil on every other frame. |
| `pause(node)` | [`animation`](../components/animation.md) | Stop between ticks, holding the simulation still while the frame loop keeps drawing. |
| `play(node, string, any?)` | [`animation`](../components/animation.md) | Run the loaded session, one recorded tick per frame. |
| `queue(node, string)` | [`animation`](../components/animation.md) | Play the clip of that name once the current one ends; a looping clip never ends, so a queue behind one never drains. |
| `resume(node)` | [`animation`](../components/animation.md) | Carry on from where `pause` left off; a stopped, finished or never-started node is left alone. |
| `seek(node, float)` | [`animation`](../components/animation.md) | Run recorded ticks until playback reaches the given tick; forward only. |
| `stop(any)` | [`animation`](../components/animation.md) | Close the recording, naming why it ended, and return the file it wrote. |
| `time(node) -> float` | [`animation`](../components/animation.md) | Seconds of engine time since the app started, accumulated as a float. |
| `tween(node, any) -> int` | — | Generate a clip on the node from a table of steps and run it, returning the handle `stop` and `is_tween_running` take. |
| `tween_to(node, string, any, float, string?) -> int` | — | Move one property of the node to a value over a number of seconds on an optional easing curve, returning a handle. |
