---
title: "widget component"
image: "/img/social/reference.png"
sidebar_label: "widget"
description: "A HUD element the widget layer draws every frame: a label, button or panel anchored to a screen corner or the center, offset in design pixels. A button…"
custom_edit_url: null
---

# `widget`

`ui` · 12 properties · UI

A HUD element the widget layer draws every frame: a label, button or panel anchored to a screen corner or the center, offset in design pixels. A button records its click in `clicked` and calls the node's `on_click` method.

In a scene, `widget` is the node key that applies it. A script reaches the same properties through `node.widget.get()` and `node.widget.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `anchor` | enum | `top_left` | Screen corner or center the offset is measured from One of `top_left`, `top_right`, `bottom_left`, `bottom_right`, `center`. |
| `clicked` | bool | `false` | True on the frame the button was clicked Read-only: engine output the inspector shows but never writes. |
| `font_size` | float | `16` | Text size in design pixels At least 6. |
| `height` | float | `0` | Panel height in design pixels; 0 sizes to content At least 0. |
| `kind` | enum | `label` | The HUD element the widget layer draws One of `label`, `button`, `panel`. |
| `on_click` | string | — | Script method called on this node when the button is clicked |
| `text` | string | `label` | Label or button caption |
| `text_color` | color | `[0.933,0.945,0.957,1]` | Text color |
| `visible` | bool | `true` | Draw the widget; hidden widgets keep their state |
| `width` | float | `0` | Panel width in design pixels; 0 sizes to content At least 0. |
| `x` | float | `16` | Horizontal offset from the anchor, in design pixels |
| `y` | float | `16` | Vertical offset from the anchor, in design pixels |
