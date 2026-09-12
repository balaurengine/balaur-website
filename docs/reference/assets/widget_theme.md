---
title: "widget_theme asset type"
image: "/img/social/reference.png"
sidebar_label: "widget_theme"
description: "How each widget kind is drawn, one table per kind. [colors] names shared fills and [roles.<name>] is a look a widget picks with role."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--ui" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,127.17a96.48,96.48,0,0,1-2.39,22.18A24,24,0,0,1,198.21,168H152a24,24,0,0,0-24,24,24,24,0,0,1-32,22.61C58.73,201.44,32,169.81,32,128a96,96,0,0,1,95-96C179.84,31.47,223.55,74.35,224,127.17Z" opacity="0.2"/><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"/></svg></span>`widget_theme`

Files live in `themes/`. Used by [`widget`](../components/widget.md) · `theme`.

How each widget kind is drawn, one table per kind. `[colors]` names shared fills and `[roles.<name>]` is a look a widget picks with `role`.

```toml
type = "widget_theme"            # a widget takes the theme of the nearest ancestor naming one

[colors]                         # named fills the rest of the file may use
ink = "#1b1b1b"
sky = "#3aa0ff"

[button]                         # one table per kind: [panel], [row], ...; a kind left out keeps the built-in look
fill = "sky"
stroke = "ink"
stroke_width = 1.0
radius = 6.0
padding = 8.0
gap = 4.0
size = 14.0
color = "ink"                    # text colour
icon_color = "ink"
font = "ui"
strong = true

[button.hover]                   # the look under the pointer; [button.active] while pressed
fill = "#5cb4ff"

[panel]
image = "art/panel.png"          # a nine-patch, sliced in its own pixels
slice = [8, 8, 8, 8]             # left, top, right, bottom

[roles.danger]                   # what a widget with role = "danger" takes
fill = "#d33a3a"
```
