---
title: "audio module"
image: "/img/social/reference.png"
sidebar_label: "audio"
description: "Sound playback: a file plays under an integer handle, with volume, pitch and loop options, and the sound component gives a node a sound of its own. Give…"
custom_edit_url: null
---

# `audio`

Sound playback: a file plays under an integer handle, with `volume`, `pitch` and `loop` options, and the `sound` component gives a node a sound of its own. Give a `play` a `position` and it is heard from where the `listener` is. With no output device every call still works and nothing is heard.

19 functions, 0 constants. Scripts reach it as `audio::`.

Acts on [`sound`](../components/sound.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `bus_volume(string) -> float` | — | One bus's own gain, without its parents'. |
| `buses() -> any` | — | Every audio bus, declared in `[audio.buses]` or made by setting a volume, in name order. |
| `distance_gain(int) -> any` | — | The gain the distance to the listener is costing a positional handle right now: 1 up close, 0 out of range. |
| `emitter_position(int) -> any` | — | Where a handle played with a `position` is; nil for a flat or unknown one. |
| `events() -> any` | — | Every sound named in `audio/events.toml`, in name order. |
| `is_playing(int) -> bool` | — | Whether a handle's sound is still audible; false once it ends, and always false with no output device. |
| `listener() -> any` | — | Where the ears are: the current `listener` node's world position, or what `set_listener` last put there. |
| `pan(int) -> any` | — | Where a positional handle sits between the speakers: -1 hard left, 0 centred, 1 hard right. |
| `play(string, any?) -> int` | — | Start the audio file at a path and return the handle `stop`, `set_volume`, `set_pitch` and `is_playing` take. The options table takes `volume`, `pitch`, `loop`, `bus`, and a `position` with `min_distance`, `max_distance` and `doppler`. |
| `play_event(string, any?) -> any` | — | Play a named sound: the next of its variations in turn, at its own volume and pitch, through its own bus. A `position` in the options table places it. Nil for a name nothing declared. |
| `play_on(node) -> int` | [`sound`](../components/sound.md) | Start the node's own `sound` from the top, replacing what it had going, and return the new handle. |
| `set_bus_volume(string, float)` | — | Set one bus's gain and re-apply it to everything already playing on it — which is what a volume slider is. |
| `set_emitter_position(int, any, any?, any?)` | — | Move what a handle plays from, so a sound follows something the script is driving; the frame takes its doppler from how far it moved. |
| `set_listener(any, any?, any?)` | — | Put the ears at a point by hand, for a game whose view is not a node; a `listener` node in the scene takes it back on the next frame. |
| `set_pitch(int, float)` | — | Set a playing handle's speed multiplier, which carries its pitch with it. |
| `set_volume(int, float)` | — | Set a playing handle's linear gain, where 1 is the file's own level. |
| `stop(int)` | — | Silence the sound a handle names; a finished, stopped or unknown handle is left alone. |
| `stop_all()` | — | Silence everything at once and clear the playback every `sound` component was holding. |
| `stop_on(node)` | [`sound`](../components/sound.md) | Silence what the node's `sound` started; a node carrying none is left alone. |
