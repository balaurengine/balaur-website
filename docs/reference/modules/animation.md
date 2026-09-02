---
title: "animation"
custom_edit_url: null
---

# `animation`

14 functions, 0 constants. Scripts reach it as `animation::`.

Acts on [`animation`](../components/animation.md).

## Functions

Argument kinds are the script values a call passes; `node` is a node handle, `any` a table or value of any kind.

- `current(node) -> string?`
- `define(node, string, any)`
- `is_playing(node) -> bool`
- `is_running(any) -> bool`
- `just_finished(node) -> string?`
- `pause(node)`
- `play(node, string, any?)`
- `queue(node, string)`
- `resume(node)`
- `seek(node, float)`
- `stop(any)`
- `time(node) -> float`
- `tween(node, any) -> int`
- `tween_to(node, string, any, float, string?) -> int`
