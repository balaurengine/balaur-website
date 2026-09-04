---
title: "animation module"
image: "/img/social/reference.png"
sidebar_label: "animation"
description: "Clip playback on a node's animation component — starting, holding, seeking — and tweens, short clips generated from a table of steps and addressed by the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--animation" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M32,176H224v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8ZM216,48H40a8,8,0,0,0-8,8V80H224V56A8,8,0,0,0,216,48Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,88h80v80H40Zm96-16V56h32V72Zm-16,0H88V56h32Zm0,112v16H88V184Zm16,0h32v16H136Zm0-16V88h80v80Zm80-96H184V56h32ZM72,56V72H40V56ZM40,184H72v16H40Zm176,16H184V184h32v16Z"/></svg></span>`animation`

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
| `is_tween_running(any) -> bool` | — | Whether a handle still names a running tween; one that finished, was stopped, or lost its node answers false. Takes a tween handle, where `is_playing` takes a node and asks about its clip. |
| `just_finished(node) -> string?` | [`animation`](../components/animation.md) | The clip that ended on this node during the last step, and nil on every other frame. |
| `pause(node)` | [`animation`](../components/animation.md) | Hold the playhead where it is, keeping the clip current so `resume` has something to go back to. |
| `play(node, string, any?)` | [`animation`](../components/animation.md) | Start the clip of that name on this node; the trailing options table takes `speed` (a multiplier) and `from_start`. |
| `queue(node, string)` | [`animation`](../components/animation.md) | Play the clip of that name once the current one ends; a looping clip never ends, so a queue behind one never drains. |
| `resume(node)` | [`animation`](../components/animation.md) | Carry on from where `pause` left off; a stopped, finished or never-started node is left alone. |
| `seek(node, float)` | [`animation`](../components/animation.md) | Move the playhead to a number of seconds and pose the node there, even on a paused or ended clip. |
| `stop(any)` | [`animation`](../components/animation.md) | End the clip on a node, or the tween a handle names, leaving the pose where it is; `resume` cannot revive it. |
| `time(node) -> float` | [`animation`](../components/animation.md) | Seconds of playback since the current clip started, before wrapping; a stopped clip keeps where it stopped. |
| `tween(node, any) -> int` | — | Generate a clip on the node from a table of steps and run it, returning the handle `stop` and `is_tween_running` take. |
| `tween_to(node, string, any, float, string?) -> int` | — | Move one property of the node to a value over a number of seconds on an optional easing curve, returning a handle. |
