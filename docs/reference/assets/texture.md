---
title: "texture asset type"
image: "/img/social/reference.png"
sidebar_label: "texture"
description: "An image and the import settings it is read with. A texture property takes a plain image path, which reads the image with its sidecar; this is for one…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`texture`

Files live in `textures/`. Used by [`mesh`](../components/mesh.md) · `texture`, [`particles`](../components/particles.md) · `texture`, [`polygon`](../components/polygon.md) · `texture`, [`shape2d`](../components/shape2d.md) · `texture`, [`sprite`](../components/sprite.md) · `texture`.

An image and the import settings it is read with. A texture property takes a plain image path, which reads the image with its sidecar; this is for one use of a picture that reads it differently. Any key the image's sidecar takes may be written here, and wins over it.

```toml
type = "texture"
source = "art/hero.png"
filter = "nearest"                # this use crisp, the sidecar's smooth
pixels_per_unit = 32
```
