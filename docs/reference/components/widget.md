---
title: "widget component"
image: "/img/social/reference.png"
sidebar_label: "widget"
description: "A HUD element drawn every frame: kind picks label, button, panel and more, anchor places it in design pixels. A button sets clicked and calls on_click."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--ui" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M104,104V208H40a8,8,0,0,1-8-8V104Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z"/></svg></span>`widget`

`ui` · 68 properties · UI

A HUD element drawn every frame: `kind` picks `label`, `button`, `panel` and more, `anchor` places it in design pixels. A button sets `clicked` and calls `on_click`.

In a scene, `widget` is the node key that applies it. A script reaches each property below as a field on `node.widget`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.widget.get()` and `node.widget.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `active` | string | — | Which child a `tab` shows, by node name; empty shows the first |
| `align` | enum | `start` | Where a container puts its children across its own direction One of `start`, `center`, `end`. |
| `anchor` | enum | `top_left` | Corner, edge or middle the offset is measured from: of the surface for a root, of the parent's box inside a `stack`; `fill` takes the whole of it less `inset` One of `top_left`, `top_right`, `bottom_left`, `bottom_right`, `center`, `center_left`, `center_right`, `center_top`, `center_bottom`, `fill`, `fill_top`, `fill_bottom`, `fill_left`, `fill_right`, `fill_across`, `fill_down`. |
| `avoid_keyboard` | bool | `false` | On a root: measure the bottom of the surface from the top of the on-screen keyboard, so a form or a chat bar stays above it; nothing on a desktop |
| `checked` | bool | `false` | Whether a `check` is ticked, every click flipping it and calling `on_change` with the new state; a checked `button` is held down, wearing its pressed look |
| `clicked` | bool | `false` | True on the frame the button was clicked Read-only: engine output the inspector shows but never writes. |
| `color` | color | `[1,1,1,1]` | What a `color` swatch holds; `on_change` hears the new one |
| `columns` | int | `0` | How many children a `grid` puts on each row, and how many cards a `list` flows into; 0 is the kind's own, which is two for a grid and one line a row for a list At least 0. |
| `deadzone` | float | `0` | How far a finger drags a `scroll` before it scrolls, in design pixels, so a tap on a child still lands; 0 scrolls at once At least 0. |
| `disabled` | bool | `false` | Grey the widget out and swallow its clicks |
| `draw` | string | — | What fills a `draw` widget: a script method on this node or the nearest scripted ancestor, or `scripts/file.rn:function` for a free function |
| `fill` | string | — | What is painted behind this widget, as `#rrggbb` or a name from the theme's `[colors]`; empty takes the theme's own |
| `fit` | enum | — | How an `image` sits in the box it was given: `contain` and `cover` keep its shape, `fill` stretches, `none` leaves it its own size, centred. Empty lets the picture decide the box instead One of ``, `contain`, `cover`, `fill`, `none`. |
| `focusable` | bool | `true` | Let focus land here. A widget nothing can activate is never focused whatever this says; set it false to skip one that could be |
| `font` | enum | `ui` | Which of the theme's families the widget draws in One of `ui`, `mono`, `heading`, `icon`. |
| `font_size` | float | `0` | Text size in design pixels; 0 takes the size the role or the kind carries At least 0. |
| `font_style` | enum | `normal` | Slant, from an italic face the project ships One of `normal`, `italic`. |
| `font_weight` | float | `400` | Weight on the CSS scale, resolved against the faces the project ships: 400 regular, 700 bold Range 100–900. |
| `gap` | float | `-1` | Space between a container's children, in design pixels; below zero takes the theme's own, which is 8 where it says nothing, and a stated zero puts them edge to edge |
| `group` | string | — | A name this `check` or `toggle` button shares with the ones it is exclusive with: ticking one unticks the rest, and one already ticked stays ticked. Empty leaves it flipping on its own |
| `grow` | float | `0` | Share of the leftover space a container hands out along its own direction; 0 takes only what this widget asks for At least 0. |
| `handle` | float | `0` | How wide a grab the seams between this container's children get, in design pixels; 0 leaves them fixed. A drag writes the new size onto the neighbour that states one At least 0. |
| `height` | float | `0` | Panel height in design pixels; 0 sizes to content At least 0. |
| `icon` | string | — | A glyph from the theme's icon family, drawn before `text` |
| `inset` | vec4 | `[0,0,0,0]` | Left, top, right and bottom margins a root with `anchor = "fill"` keeps from its surface, in design pixels |
| `justify` | enum | `start` | How a container spreads its children along its own direction once they have their sizes One of `start`, `center`, `end`, `between`, `around`, `evenly`. |
| `keep_open` | bool | `false` | A menu row that leaves its menu open when clicked, as a toggle does; any other row closes it |
| `kind` | enum | `label` | The HUD element the widget layer draws One of `label`, `button`, `panel`, `row`, `column`, `scroll`, `tab`, `draw`, `image`, `field`, `text_area`, `check`, `color`, `dropdown`, `menu`, `list`, `tree`, `table`, `slider`, `drag_value`, `progress`, `grid`, `flow`, `fold`, `dialog`, `window`, `separator`, `code`, `stack`. |
| `layer` | string | — | The drawing surface this root belongs to; empty is the default one, and a name nothing has configured takes the default surface |
| `markup` | bool | `false` | Read inline marks in the text: `[b]`, `[i]`, `[color=#hex]`, `[center]`, `[right]`, `[wave amp=N freq=N]` and `[img=path width=N]`; off, brackets are text |
| `max` | float | `1` | The high end of a `slider` or `progress`; a `drag_value` runs free while this pair is the default 0 and 1 |
| `max_length` | float | `0` | The most characters a `field` takes; 0 is no limit At least 0. |
| `min` | float | `0` | The low end of a `slider` or `progress`; a `drag_value` runs free while this pair is the default 0 and 1 |
| `min_height` | float | `0` | Smallest height a container may give this widget, in design pixels At least 0. |
| `min_width` | float | `0` | Smallest width a container may give this widget, in design pixels At least 0. |
| `numeric` | bool | `false` | Keep a `field` to digits, a sign and a point |
| `on_change` | string | — | Script method called with a `field`'s text after every edit, on this node or the nearest ancestor whose script declares it |
| `on_click` | string | — | Script method called when the widget is clicked, on this node or the nearest ancestor whose script declares it. An `image` that names one senses clicks too, which is how a picture becomes a button |
| `on_focus` | string | — | Script method called when focus arrives, on this node or the nearest ancestor whose script declares it |
| `on_submit` | string | — | Script method called with a `field`'s text on Enter, or when focus leaves it, on this node or the nearest ancestor whose script declares it |
| `open` | bool | `true` | Whether a `fold` shows its children; its header flips it and calls `on_change` with the new state |
| `options` | strings | `[]` | The items a `dropdown`, `menu`, `list`, `tree` or `table` holds; `text` is the one picked, except on a `menu` where it is the button caption. A `tree` row starts with one tab per level, a `list` or `tree` row splits on U+001F into icon, label, a trailing note and an `#rrggbb` for that row, and a `table` row splits on the same into one cell a column. `on_change` hears every pick |
| `padding` | vec4 | `[-1,-1,-1,-1]` | Space inside a container's edge, in design pixels: one number for every side, or left, top, right and bottom. Below zero takes the theme's own, and a stated zero is no space at all |
| `padding_x` | float | `-1` | The air either side of a caption, in design pixels; below zero takes the theme's own |
| `placeholder` | string | — | What a `field` shows while it is empty, the letter a `drag_value` puts before its number, and a `table`'s column names split on U+001F |
| `radius` | float | `-1` | Corner radius in design pixels; below zero takes the theme's own, which for a button is as round as its text is tall |
| `role` | string | — | A `[roles.<name>]` entry of the widget's theme, taken over its kind's own style; the one place a look is named rather than spelled |
| `row_height` | float | `0` | The pitch of a `list` or `tree` row, in design pixels; 0 takes the font's own line height At least 0. |
| `secret` | bool | `false` | Draw a `field`'s text as dots, for a password |
| `showing` | bool | `false` | Holds a menu's rows up from the scene, as a click would; for an offscreen run or a tutorial, since nothing can click there |
| `slice` | vec4 | `[0,0,0,0]` | Left, top, right and bottom borders of an `image` kept unstretched, in the picture's own pixels; all zero stretches the whole picture |
| `source` | string | — | The project-relative image an `image` widget draws, the picture a `button` draws before its caption at the caption's height, the sheet a `list` cuts its card faces from, and the language a `code` widget highlights |
| `step` | float | `0` | The grid a `slider` snaps to, and how fast a `drag_value` moves under the pointer; 0 is continuous At least 0. |
| `stroke` | string | — | The outline around this widget, as `#rrggbb` or a name from the theme's `[colors]`; empty takes the theme's own |
| `text` | string | `label` | Label or button caption |
| `text_align` | enum | `start` | Where text sits in the width the widget was given One of `start`, `center`, `end`. |
| `text_color` | color | `[0,0,0,0]` | Text color; fully transparent takes the theme's colour for this widget's role or kind, and failing that a near-white |
| `text_key` | string | — | A localization key drawn in place of `text`, re-read every frame so a locale switch shows at once |
| `theme` | asset · [`widget_theme`](../assets/widget_theme.md) | — | How this widget and everything under it is drawn; inherited from the nearest ancestor that names one |
| `toggle` | bool | `false` | A `button` a click holds down and the next releases, flipping `checked` as a `check` does, before `on_click` runs: Godot's toggle mode |
| `tooltip` | string | — | Text shown after the pointer rests on the widget; still shown when it is `disabled`, which is where it says why |
| `trailing` | string | — | Text a button draws against its far edge, dimmer than its caption: a shortcut, or a menu's caret |
| `value` | float | `0` | Where a `slider`, `drag_value` or `progress` stands, between `min` and `max`; a slider and a drag value write it and call `on_change` with it |
| `visible` | bool | `true` | Draw the widget; hidden widgets keep their state |
| `width` | float | `0` | Panel width in design pixels; 0 sizes to content At least 0. |
| `wrap` | bool | `false` | Break text to the width the widget was given instead of running past it on one line |
| `x` | float | `16` | Horizontal offset from the anchor, in design pixels |
| `y` | float | `16` | Vertical offset from the anchor, in design pixels |

Asset types this component references: [`widget_theme`](../assets/widget_theme.md).
