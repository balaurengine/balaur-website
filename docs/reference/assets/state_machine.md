---
title: "state_machine asset type"
image: "/img/social/reference.png"
sidebar_label: "state_machine"
description: "Switches an animation player between clips. start is the first state, [states] maps states to clips, each [[transitions]] entry names from, to, fade…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`state_machine`

Files live in `animations/`. Used by [`state_machine`](../components/state_machine.md) · `machine`.

Switches an animation player between clips. `start` is the first state, `[states]` maps states to clips, each `[[transitions]]` entry names `from`, `to`, `fade`, `advance`, `switch` and `condition`.

```toml
type = "state_machine"
start = "idle"

[states]                         # state = clip in the player's library; "" is the state's own name
idle = "idle"
walk = "walk_cycle"

[[transitions]]
from = "idle"
to = "walk"
fade = 0.2                       # seconds
advance = "auto"                 # disabled, enabled (fires on animation.travel) or auto
switch = "immediate"             # immediate, sync (keeps the playhead) or at_end
condition = "moving"             # turned on by animation.set_condition
```
