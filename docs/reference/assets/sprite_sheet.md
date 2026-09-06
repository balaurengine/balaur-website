---
title: "sprite_sheet asset type"
image: "/img/social/reference.png"
sidebar_label: "sprite_sheet"
description: "An image cut into frames of any size, for sprite.sheet: texture names the image and each of frames is a rect of [x, y, w, h] texture pixels with the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`sprite_sheet`

Files live in `sheets/`. Used by [`sprite`](../components/sprite.md) · `sheet`.

An image cut into frames of any size, for `sprite.sheet`: `texture` names
the image and each of `frames` is a `rect` of `[x, y, w, h]` texture pixels
with the `duration` in seconds a clip shows it for. `sprite.frame` indexes
the list, past the end drawing the last frame. `[tags.<name>]` is a run of
frames `from` one index `to` another with a `direction` (`forward`,
`reverse`, `pingpong`, `pingpong_reverse`) and a `repeat` count, zero for
ever; `[slices.<name>]` is a `rect` on a frame, in the frame's own pixels,
with an optional nine-patch `center` and `pivot`, and `keys` when the slice
moves between frames. `balaur import file.aseprite` writes one of these
beside the atlas it packs and a clip per tag.

```toml
type = "sprite_sheet"
texture = "art/walk.png"
frames = [
  { rect = [0, 0, 32, 32], duration = 0.1 },
  { rect = [32, 0, 32, 32], duration = 0.1 },
]

[tags.walk]
from = 0
to = 1
direction = "forward"

[slices.hitbox]
rect = [8, 4, 16, 28]
```
