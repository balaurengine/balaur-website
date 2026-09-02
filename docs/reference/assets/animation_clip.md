---
title: "animation_clip"
custom_edit_url: null
---

# `animation_clip`

Files live in `animations/`. Used by [`animation`](../components/animation.md) · `library`.

A clip keys node properties over time. `length` is in seconds and may be
left out to end at the last key; `loop` is `none` (hold the last key),
`loop` or `pingpong`. Each track names a `target` node path relative to the
playing node (empty means that node), a `property` (`position`,
`rotation_euler`, `rotation`, `scale` or `<component>/<property>`), an
`interp` (`step`, `linear`, `cubic`) and its `keys`, each `{ t, value }` with
an optional `ease`. A track with no `property` is a method track whose keys
call the node's script. A file holds one clip, or several under
`[clips.<name>]`, addressed as `file.toml#name`.

```toml
type = "animation_clip"

[clips.patrol]
length = 4.0
loop = "pingpong"

[[clips.patrol.tracks]]
property = "position"
interp = "linear"
keys = [
  { t = 0.0, value = [-2.5, 0.25, -2.0] },
  { t = 4.0, value = [-2.5, 0.25, 2.0], ease = "in_out_sine" },
]
```
