---
title: "animation module"
image: "/img/social/reference.png"
sidebar_label: "animation"
description: "Clip playback on a node's animation component: play, pause, seek and query. tween builds a short clip from a table of steps and returns a handle."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--animation" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M32,176H224v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8ZM216,48H40a8,8,0,0,0-8,8V80H224V56A8,8,0,0,0,216,48Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,88h80v80H40Zm96-16V56h32V72Zm-16,0H88V56h32Zm0,112v16H88V184Zm16,0h32v16H136Zm0-16V88h80v80Zm80-96H184V56h32ZM72,56V72H40V56ZM40,184H72v16H40Zm176,16H184V184h32v16Z"/></svg></span>`animation`

Clip playback on a node's `animation` component: play, pause, seek and query. `tween` builds a short clip from a table of steps and returns a handle.

20 functions, 78 constants. Scripts reach it as `animation::`.

Acts on [`animation`](../components/animation.md), [`state_machine`](../components/state_machine.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `current(node) -> string?` | [`animation`](../components/animation.md) | The clip playing or paused on this node, and nil once it has ended, been stopped, or never started. |
| `define(node, string, any)` | [`animation`](../components/animation.md) | Give this node a clip of its own under that name, from a definition table shaped like a scene file's. |
| `ease_names() -> any` | — | Every curve an `ease` takes, by name: the bare `linear`, then twelve transitions in four modes each. |
| `is_playing(node) -> bool` | [`animation`](../components/animation.md) | Whether a clip is advancing on this node; a paused, stopped, finished or absent one answers false. |
| `is_tween_running(any) -> bool` | — | Whether a handle still names a running tween; one that finished, was stopped, or lost its node answers false. Takes a tween handle, where `is_playing` takes a node and asks about its clip. |
| `jump(node, string)` | [`state_machine`](../components/state_machine.md) | Cut the state machine to the named state on the next step, with no fade. |
| `just_finished(node) -> string?` | [`animation`](../components/animation.md) | The clip that ended on this node during the last step, and nil on every other frame. |
| `pause(node)` | [`animation`](../components/animation.md) | Hold the playhead where it is, keeping the clip current so `resume` has something to go back to. |
| `play(node, string, any?)` | [`animation`](../components/animation.md) | Start the clip of that name on this node; the trailing options table takes `speed` (a multiplier), `from_start`, `fade` (seconds to blend out of the clip before), `ease` (the fade's curve, an `EASE_*` constant), and `retarget` (a `bone_map` reference, so this rig can play another rig's clips). |
| `queue(node, string)` | [`animation`](../components/animation.md) | Play the clip of that name once the current one ends; a looping clip never ends, so a queue behind one never drains. |
| `resume(node)` | [`animation`](../components/animation.md) | Carry on from where `pause` left off; a stopped, finished or never-started node is left alone. |
| `seek(node, float)` | [`animation`](../components/animation.md) | Move the playhead to a number of seconds and pose the node there, even on a paused or ended clip. |
| `set_condition(node, string, bool)` | [`state_machine`](../components/state_machine.md) | Turn on or off a condition that `auto` transitions wait on. |
| `state(node) -> any` | [`state_machine`](../components/state_machine.md) | The state the machine is in, or nil before it has entered one. |
| `stop(any)` | — | End the clip on a node, or the tween a handle names, leaving the pose where it is; `resume` cannot revive it. |
| `time(node) -> float` | [`animation`](../components/animation.md) | Seconds of playback since the current clip started, before wrapping; a stopped clip keeps where it stopped. |
| `travel(node, string)` | [`state_machine`](../components/state_machine.md) | Head for the named state through the cheapest chain of transitions, each costing its priority and fading as it says; a state no transition reaches is cut to directly. |
| `tween(node, any) -> int` | — | Generate a clip on the node from a table of steps and run it, returning the handle `stop` and `is_tween_running` take. The table also takes `delay` in seconds, `then = <handle>` to wait for another tween, `loops` and `speed`; a step's `call` names a method or passes a function; the node's `on_tween_finished(handle)` is called when it runs out. |
| `tween_value(any, any, float, string?) -> int` | — | A tween over a number, or a list of up to four, that drives no node: read it each frame with `tween_value_of` and write it wherever you like. Returns a handle `stop` takes. |
| `tween_value_of(any) -> any` | — | Where a value tween has got to, in the shape it was started with; nil once it is over. |

## Constants

| name | value |
| --- | --- |
| `ADVANCE_AUTO` | `auto` |
| `ADVANCE_DISABLED` | `disabled` |
| `ADVANCE_ENABLED` | `enabled` |
| `EASE_IN_BACK` | `in_back` |
| `EASE_IN_BOUNCE` | `in_bounce` |
| `EASE_IN_CIRC` | `in_circ` |
| `EASE_IN_CUBIC` | `in_cubic` |
| `EASE_IN_ELASTIC` | `in_elastic` |
| `EASE_IN_EXPO` | `in_expo` |
| `EASE_IN_LINEAR` | `in_linear` |
| `EASE_IN_OUT_BACK` | `in_out_back` |
| `EASE_IN_OUT_BOUNCE` | `in_out_bounce` |
| `EASE_IN_OUT_CIRC` | `in_out_circ` |
| `EASE_IN_OUT_CUBIC` | `in_out_cubic` |
| `EASE_IN_OUT_ELASTIC` | `in_out_elastic` |
| `EASE_IN_OUT_EXPO` | `in_out_expo` |
| `EASE_IN_OUT_LINEAR` | `in_out_linear` |
| `EASE_IN_OUT_QUAD` | `in_out_quad` |
| `EASE_IN_OUT_QUART` | `in_out_quart` |
| `EASE_IN_OUT_QUINT` | `in_out_quint` |
| `EASE_IN_OUT_SINE` | `in_out_sine` |
| `EASE_IN_OUT_SPRING` | `in_out_spring` |
| `EASE_IN_QUAD` | `in_quad` |
| `EASE_IN_QUART` | `in_quart` |
| `EASE_IN_QUINT` | `in_quint` |
| `EASE_IN_SINE` | `in_sine` |
| `EASE_IN_SPRING` | `in_spring` |
| `EASE_LINEAR` | `linear` |
| `EASE_OUT_BACK` | `out_back` |
| `EASE_OUT_BOUNCE` | `out_bounce` |
| `EASE_OUT_CIRC` | `out_circ` |
| `EASE_OUT_CUBIC` | `out_cubic` |
| `EASE_OUT_ELASTIC` | `out_elastic` |
| `EASE_OUT_EXPO` | `out_expo` |
| `EASE_OUT_IN_BACK` | `out_in_back` |
| `EASE_OUT_IN_BOUNCE` | `out_in_bounce` |
| `EASE_OUT_IN_CIRC` | `out_in_circ` |
| `EASE_OUT_IN_CUBIC` | `out_in_cubic` |
| `EASE_OUT_IN_ELASTIC` | `out_in_elastic` |
| `EASE_OUT_IN_EXPO` | `out_in_expo` |
| `EASE_OUT_IN_LINEAR` | `out_in_linear` |
| `EASE_OUT_IN_QUAD` | `out_in_quad` |
| `EASE_OUT_IN_QUART` | `out_in_quart` |
| `EASE_OUT_IN_QUINT` | `out_in_quint` |
| `EASE_OUT_IN_SINE` | `out_in_sine` |
| `EASE_OUT_IN_SPRING` | `out_in_spring` |
| `EASE_OUT_LINEAR` | `out_linear` |
| `EASE_OUT_QUAD` | `out_quad` |
| `EASE_OUT_QUART` | `out_quart` |
| `EASE_OUT_QUINT` | `out_quint` |
| `EASE_OUT_SINE` | `out_sine` |
| `EASE_OUT_SPRING` | `out_spring` |
| `EVENT_ANIMATION_FINISHED` | `animation_finished` |
| `EVENT_STATE_FINISHED` | `state_finished` |
| `EVENT_STATE_STARTED` | `state_started` |
| `INTERP_CUBIC` | `cubic` |
| `INTERP_LINEAR` | `linear` |
| `INTERP_STEP` | `step` |
| `LOOP_LOOP` | `loop` |
| `LOOP_NONE` | `none` |
| `LOOP_PINGPONG` | `pingpong` |
| `MODIFIER_CCDIK` | `ccdik` |
| `MODIFIER_FABRIK` | `fabrik` |
| `MODIFIER_FOLLOW` | `follow` |
| `MODIFIER_JIGGLE` | `jiggle` |
| `MODIFIER_LOOK_AT` | `look_at` |
| `MODIFIER_TWO_BONE_IK` | `two_bone_ik` |
| `PROPERTY_DEFORM` | `polygon/deform` |
| `PROPERTY_POSITION` | `position` |
| `PROPERTY_ROTATION` | `rotation` |
| `PROPERTY_ROTATION_EULER` | `rotation_euler` |
| `PROPERTY_SCALE` | `scale` |
| `PROPERTY_TINT` | `tint` |
| `PROPERTY_VISIBLE` | `visible` |
| `STATE_END` | `end` |
| `SWITCH_AT_END` | `at_end` |
| `SWITCH_IMMEDIATE` | `immediate` |
| `SWITCH_SYNC` | `sync` |
