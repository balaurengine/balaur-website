---
title: "animation_clip asset type"
image: "/img/social/reference.png"
sidebar_label: "animation_clip"
description: "A clip keys node properties over time. length is in seconds and may be left out to end at the last key; loop is none (hold the last key), loop or…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--animation" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M32,176H224v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8ZM216,48H40a8,8,0,0,0-8,8V80H224V56A8,8,0,0,0,216,48Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,88h80v80H40Zm96-16V56h32V72Zm-16,0H88V56h32Zm0,112v16H88V184Zm16,0h32v16H136Zm0-16V88h80v80Zm80-96H184V56h32ZM72,56V72H40V56ZM40,184H72v16H40Zm176,16H184V184h32v16Z"/></svg></span>`animation_clip`

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
