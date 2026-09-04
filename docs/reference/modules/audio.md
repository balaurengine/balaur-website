---
title: "audio module"
image: "/img/social/reference.png"
sidebar_label: "audio"
description: "Sound playback: a file plays under an integer handle, with volume, pitch and loop options, and the sound component gives a node a sound of its own. With…"
custom_edit_url: null
---

# `audio`

Sound playback: a file plays under an integer handle, with `volume`, `pitch` and `loop` options, and the `sound` component gives a node a sound of its own. With no output device every call still works and nothing is heard.

8 functions, 0 constants. Scripts reach it as `audio::`.

Acts on [`sound`](../components/sound.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `is_playing(int) -> bool` | — | Whether a handle's sound is still audible; false once it ends, and always false with no output device. |
| `play(string, any?) -> int` | — | Start the audio file at a path and return the handle `stop`, `set_volume`, `set_pitch` and `is_playing` take. |
| `play_on(node) -> int` | [`sound`](../components/sound.md) | Start the node's own `sound` from the top, replacing what it had going, and return the new handle. |
| `set_pitch(int, float)` | — | Set a playing handle's speed multiplier, which carries its pitch with it. |
| `set_volume(int, float)` | — | Set a playing handle's linear gain, where 1 is the file's own level. |
| `stop(int)` | — | Silence the sound a handle names; a finished, stopped or unknown handle is left alone. |
| `stop_all()` | — | Silence everything at once and clear the playback every `sound` component was holding. |
| `stop_on(node)` | [`sound`](../components/sound.md) | Silence what the node's `sound` started; a node carrying none is left alone. |
