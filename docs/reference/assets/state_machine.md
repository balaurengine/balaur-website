---
title: "state_machine asset type"
image: "/img/social/reference.png"
sidebar_label: "state_machine"
description: "Switches an animation player between clips. start is the first state, [states] maps states to clips or to nested machines, each [[transitions]] entry…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`state_machine`

Files live in `animations/`. Used by [`state_machine`](../components/state_machine.md) · `machine`.

Switches an animation player between clips. `start` is the first state, `[states]` maps states to clips or to nested machines, each `[[transitions]]` entry names `from`, `to`, `fade`, `ease` or `fade_curve`, `advance`, `switch`, `condition`, `check`, `priority`, `reset` and `break_loop`. A transition to `end` stops the machine until a travel or a jump.

```toml
type = "state_machine"
start = "idle"

[states]                         # state = clip in the player's library; "" is the state's own name
idle = "idle"

[states.move]                    # a nested machine: its states are move/walk and move/run
start = "walk"
states = { walk = "", run = "run_cycle" }

[[transitions]]
from = "idle"
to = "move"                      # entering a nested machine enters its start
fade = 0.2                       # seconds
ease = "in_out_sine"             # the curve the fade follows; linear by default
advance = "auto"                 # disabled, enabled (fires on animation.travel) or auto
switch = "immediate"             # immediate, sync (keeps the playhead) or at_end
condition = "moving"             # turned on by animation.set_condition
check = "can_move"               # a script method that has to answer true, asked each frame
priority = 1                     # lower wins among auto transitions and on travel
reset = true                     # false resumes where the state was last left
break_loop = false               # true holds a looping clip's end while it fades out

[[transitions]]
from = "move"                    # leaves from any state inside the nested machine
to = "end"
fade_curve = [[0.0, 0.0], [0.3, 0.8], [1.0, 1.0]]   # [u, weight] points, in place of ease
```
