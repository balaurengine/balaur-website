---
title: "animation"
custom_edit_url: null
---

# `animation`

`animation` · 4 properties · Animation

In a scene, `animation` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `autoplay` | string | — | Clip to start when the scene loads; empty starts nothing |
| `library` | asset · [`animation_clip`](../assets/animation_clip.md) | — | The clip library this node plays from |
| `root` | string | — | Node path the clip's tracks resolve against; empty means this node |
| `speed` | float | `1` | Playback rate for every clip on this node |

Asset types this component references: [`animation_clip`](../assets/animation_clip.md).
