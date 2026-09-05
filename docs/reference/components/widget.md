---
title: "widget component"
image: "/img/social/reference.png"
sidebar_label: "widget"
description: "A HUD element the widget layer draws every frame: a label, button or panel anchored to a screen corner or the center, offset in design pixels. A button…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--ui" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M104,104V208H40a8,8,0,0,1-8-8V104Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z"/></svg></span>`widget`

`ui` · 49 properties · UI

A HUD element the widget layer draws every frame: a label, button or panel anchored to a screen corner or the center, offset in design pixels. A button records its click in `clicked` and calls the node's `on_click` method.

In a scene, `widget` is the node key that applies it. A script reaches the same properties through `node.widget.get()` and `node.widget.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `active` | string | — | Which child a `tab` shows, by node name; empty shows the first |
| `align` | enum | `start` | Where a container puts its children across its own direction One of `start`, `center`, `end`. |
| `anchor` | enum | `top_left` | Screen corner or center the offset is measured from; `fill` takes the whole surface less `inset` One of `top_left`, `top_right`, `bottom_left`, `bottom_right`, `center`, `fill`. |
| `checked` | bool | `false` | Whether a `check` is ticked; every click flips it and calls `on_change` with the new state |
| `clicked` | bool | `false` | True on the frame the button was clicked Read-only: engine output the inspector shows but never writes. |
| `columns` | int | `2` | How many children a `grid` puts on each row At least 1. |
| `deadzone` | float | `0` | How far a finger drags a `scroll` before it scrolls, in design pixels, so a tap on a child still lands; 0 scrolls at once At least 0. |
| `draw` | string | — | What fills a `draw` widget: a script method on this node or the nearest scripted ancestor, or `scripts/file.rn:function` for a free function |
| `focusable` | bool | `true` | Let focus land here. A widget nothing can activate is never focused whatever this says; set it false to skip one that could be |
| `font_size` | float | `16` | Text size in design pixels At least 6. |
| `font_style` | enum | `normal` | Slant, from an italic face the project ships One of `normal`, `italic`. |
| `font_weight` | float | `400` | Weight on the CSS scale, resolved against the faces the project ships: 400 regular, 700 bold Range 100–900. |
| `gap` | float | `8` | Space between a container's children, in design pixels At least 0. |
| `grow` | float | `0` | Share of the leftover space a container hands out along its own direction; 0 takes only what this widget asks for At least 0. |
| `handle` | float | `0` | How wide a grab the seams between this container's children get, in design pixels; 0 leaves them fixed. A drag writes the new size onto the neighbour that states one At least 0. |
| `height` | float | `0` | Panel height in design pixels; 0 sizes to content At least 0. |
| `inset` | vec4 | `[0,0,0,0]` | Left, top, right and bottom margins a root with `anchor = "fill"` keeps from its surface, in design pixels |
| `kind` | enum | `label` | The HUD element the widget layer draws One of `label`, `button`, `panel`, `row`, `column`, `scroll`, `tab`, `draw`, `image`, `field`, `check`, `dropdown`, `slider`, `progress`, `grid`, `flow`, `fold`, `dialog`, `separator`. |
| `layer` | string | — | The drawing surface this root belongs to; empty is the default one, and a name nothing has configured takes the default surface |
| `markup` | bool | `false` | Read inline marks in the text: `[b]`, `[i]`, `[color=#hex]`, `[center]`, `[right]`, `[wave amp=N freq=N]` and `[img=path width=N]`; off, brackets are text |
| `max` | float | `1` | The high end of a `slider` or `progress` |
| `max_length` | float | `0` | The most characters a `field` takes; 0 is no limit At least 0. |
| `min` | float | `0` | The low end of a `slider` or `progress` |
| `min_height` | float | `0` | Smallest height a container may give this widget, in design pixels At least 0. |
| `min_width` | float | `0` | Smallest width a container may give this widget, in design pixels At least 0. |
| `numeric` | bool | `false` | Keep a `field` to digits, a sign and a point |
| `on_change` | string | — | Script method called on this node with a `field`'s text after every edit |
| `on_click` | string | — | Script method called on this node when the button is clicked |
| `on_focus` | string | — | Script method called on this node when focus arrives |
| `on_submit` | string | — | Script method called on this node with a `field`'s text on Enter, or when focus leaves it |
| `open` | bool | `true` | Whether a `fold` shows its children; its header flips it and calls `on_change` with the new state |
| `options` | strings | `[]` | What a `dropdown` offers; `text` is the one chosen, and `on_change` hears the new one |
| `padding` | float | `0` | Space inside a container's edge, in design pixels At least 0. |
| `placeholder` | string | — | What a `field` shows while it is empty |
| `secret` | bool | `false` | Draw a `field`'s text as dots, for a password |
| `slice` | vec4 | `[0,0,0,0]` | Left, top, right and bottom borders of an `image` kept unstretched, in the picture's own pixels; all zero stretches the whole picture |
| `source` | string | — | The project-relative image an `image` widget draws |
| `step` | float | `0` | The grid a `slider` snaps to; 0 is continuous At least 0. |
| `text` | string | `label` | Label or button caption |
| `text_align` | enum | `start` | Where text sits in the width the widget was given One of `start`, `center`, `end`. |
| `text_color` | color | `[0.933,0.945,0.957,1]` | Text color |
| `text_key` | string | — | A localization key drawn in place of `text`, re-read every frame so a locale switch shows at once |
| `theme` | asset · [`widget_theme`](../assets/widget_theme.md) | — | How this widget and everything under it is drawn; inherited from the nearest ancestor that names one |
| `value` | float | `0` | Where a `slider` or `progress` stands, between `min` and `max`; a slider writes it and calls `on_change` with it |
| `visible` | bool | `true` | Draw the widget; hidden widgets keep their state |
| `width` | float | `0` | Panel width in design pixels; 0 sizes to content At least 0. |
| `wrap` | bool | `false` | Break text to the width the widget was given instead of running past it on one line |
| `x` | float | `16` | Horizontal offset from the anchor, in design pixels |
| `y` | float | `16` | Vertical offset from the anchor, in design pixels |

Asset types this component references: [`widget_theme`](../assets/widget_theme.md).
