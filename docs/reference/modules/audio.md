---
title: "audio"
custom_edit_url: null
---

# `audio`

8 functions, 0 constants. Scripts reach it as `audio::`.

Acts on [`sound`](../components/sound.md).

## Functions

Argument kinds are the script values a call passes; `node` is a node handle, `any` a table or value of any kind.

- `is_playing(int) -> bool`
- `play(string, any?) -> int`
- `play_on(node) -> int`
- `set_pitch(int, float)`
- `set_volume(int, float)`
- `stop(int)`
- `stop_all()`
- `stop_on(node)`
