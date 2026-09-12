---
title: "sprite_sheet asset type"
image: "/img/social/reference.png"
sidebar_label: "sprite_sheet"
description: "An image cut into frames, for sprite.sheet. texture names the image; frames each hold a rect and duration; [tags.<name>] and [slices.<name>] add runs and…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`sprite_sheet`

Files live in `sheets/`. Used by [`sprite`](../components/sprite.md) · `sheet`.

An image cut into frames, for `sprite.sheet`. `texture` names the image; `frames` each hold a `rect` and `duration`; `[tags.<name>]` and `[slices.<name>]` add runs and regions.

```toml
type = "sprite_sheet"            # balaur import file.aseprite writes one beside the atlas it packs
texture = "art/walk.png"
frames = [                       # rect is [x, y, w, h] texture pixels; sprite.frame indexes this list
  { rect = [0, 0, 32, 32], duration = 0.1 },
  { rect = [32, 0, 32, 32], duration = 0.1 },
]

[tags.walk]                      # a run of frames
from = 0
to = 1
direction = "forward"            # forward, reverse, pingpong or pingpong_reverse
repeat = 0                       # zero for ever

[slices.hitbox]                  # a rect on a frame, in the frame's own pixels
rect = [8, 4, 16, 28]
# center = [4, 4, 8, 20] and pivot = [8, 14] make it a nine-patch with a pivot;
# keys = [...] when the slice moves between frames
```
