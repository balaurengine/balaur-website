---
title: "animation_clip asset type"
image: "/img/social/reference.png"
sidebar_label: "animation_clip"
description: "A clip keys node properties over time. loop is none, loop or pingpong; each track names a target, a property, an interp and its keys."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--animation" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M32,176H224v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8ZM216,48H40a8,8,0,0,0-8,8V80H224V56A8,8,0,0,0,216,48Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,88h80v80H40Zm96-16V56h32V72Zm-16,0H88V56h32Zm0,112v16H88V184Zm16,0h32v16H136Zm0-16V88h80v80Zm80-96H184V56h32ZM72,56V72H40V56ZM40,184H72v16H40Zm176,16H184V184h32v16Z"/></svg></span>`animation_clip`

Files live in `animations/`. Used by [`animation`](../components/animation.md) · `library`.

A clip keys node properties over time. `loop` is `none`, `loop` or `pingpong`; each track names a `target`, a `property`, an `interp` and its `keys`.

```toml
type = "animation_clip"

[clips.patrol]           # one clip per file, or several, addressed as file.toml#patrol
length = 4.0             # seconds; left out, the clip ends at its last key
loop = "pingpong"        # none, loop or pingpong

[[clips.patrol.tracks]]
target = ""              # node path relative to the playing node; empty is that node
property = "position"    # rotation_euler, rotation, scale, visible, tint or <component>/<property>
interp = "linear"        # step, linear or cubic
keys = [
  { t = 0.0, value = [-2.5, 0.25, -2.0] },
  { t = 4.0, value = [-2.5, 0.25, 2.0], ease = "in_out_sine" },
]

[[clips.patrol.tracks]]  # no property: a method track, each key a call on the node's script
keys = [{ t = 2.0, call = "on_halfway" }]
```
