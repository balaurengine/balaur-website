---
title: "widget component"
image: "/img/social/reference.png"
sidebar_label: "widget"
description: "A HUD element the widget layer draws every frame: a label, button or panel anchored to a screen corner or the center, offset in design pixels. A button…"
custom_edit_url: null
---

# `widget`

`ui` · 25 properties · UI

A HUD element the widget layer draws every frame: a label, button or panel anchored to a screen corner or the center, offset in design pixels. A button records its click in `clicked` and calls the node's `on_click` method.

In a scene, `widget` is the node key that applies it. A script reaches the same properties through `node.widget.get()` and `node.widget.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `active` | string | — | Which child a `tab` shows, by node name; empty shows the first |
| `align` | enum | `start` | Where a container puts its children across its own direction One of `start`, `center`, `end`. |
| `anchor` | enum | `top_left` | Screen corner or center the offset is measured from One of `top_left`, `top_right`, `bottom_left`, `bottom_right`, `center`. |
| `clicked` | bool | `false` | True on the frame the button was clicked Read-only: engine output the inspector shows but never writes. |
| `draw` | string | — | What fills a `draw` widget: a script method on this node, or `scripts/file.rn:function` for a free function |
| `focusable` | bool | `true` | Let focus land here. A widget nothing can activate is never focused whatever this says; set it false to skip one that could be |
| `font_size` | float | `16` | Text size in design pixels At least 6. |
| `gap` | float | `8` | Space between a container's children, in design pixels At least 0. |
| `grow` | float | `0` | Share of the leftover space a container hands out along its own direction; 0 takes only what this widget asks for At least 0. |
| `height` | float | `0` | Panel height in design pixels; 0 sizes to content At least 0. |
| `kind` | enum | `label` | The HUD element the widget layer draws One of `label`, `button`, `panel`, `row`, `column`, `scroll`, `tab`, `draw`. |
| `min_height` | float | `0` | Smallest height a container may give this widget, in design pixels At least 0. |
| `min_width` | float | `0` | Smallest width a container may give this widget, in design pixels At least 0. |
| `on_click` | string | — | Script method called on this node when the button is clicked |
| `on_focus` | string | — | Script method called on this node when focus arrives |
| `padding` | float | `0` | Space inside a container's edge, in design pixels At least 0. |
| `resizable` | bool | `false` | Let the seams between this container's children be dragged; the drag writes the new size onto the neighbour that states one |
| `text` | string | `label` | Label or button caption |
| `text_color` | color | `[0.933,0.945,0.957,1]` | Text color |
| `text_key` | string | — | A localization key drawn in place of `text`, re-read every frame so a locale switch shows at once |
| `theme` | asset · [`widget_theme`](../assets/widget_theme.md) | — | How this widget and everything under it is drawn; inherited from the nearest ancestor that names one |
| `visible` | bool | `true` | Draw the widget; hidden widgets keep their state |
| `width` | float | `0` | Panel width in design pixels; 0 sizes to content At least 0. |
| `x` | float | `16` | Horizontal offset from the anchor, in design pixels |
| `y` | float | `16` | Vertical offset from the anchor, in design pixels |

Asset types this component references: [`widget_theme`](../assets/widget_theme.md).
