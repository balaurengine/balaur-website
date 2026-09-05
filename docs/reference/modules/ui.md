---
title: "ui module"
image: "/img/social/reference.png"
sidebar_label: "ui"
description: "Immediate-mode UI, redrawn from a script's draw_ui every frame: panels, layout containers and the design system's widget shapes. HUD elements that live…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--ui" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M104,104V208H40a8,8,0,0,1-8-8V104Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z"/></svg></span>`ui`

Immediate-mode UI, redrawn from a script's `draw_ui` every frame: panels, layout containers and the design system's widget shapes. HUD elements that live in the scene tree are the `widget` component instead.

53 functions, 31 constants. Scripts reach it as `ui::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `activate_focused()` | — | Activate the focused widget, exactly as a click on it would. |
| `add_space(float)` | — | Insert blank space along the current layout, in design pixels. |
| `available_height() -> float` | — | The height left in the current container, in design pixels. |
| `available_width() -> float` | — | The width left in the current container, in design pixels. |
| `bottom_panel(string, any?, fn) -> float` | — | Dock a strip across the bottom of the window and draw the callback inside it; `height` is in design pixels. Answers the height it ended up with. |
| `central_panel(any?, fn)` | — | Draw the callback into whatever room the docked panels left over. |
| `central_rect() -> float, float, float, float` | — | The x, y, width and height of the surface being drawn into, in design pixels. |
| `circle_button(string, any?) -> bool` | — | Draw a round button holding one glyph, `d` design pixels across; true on the frame it was clicked. |
| `clipboard() -> string` | — | The text pasted this frame, empty otherwise: the platform clipboard is not readable on demand. |
| `code_editor(string, string, any?) -> string, bool, int?` | — | Draw an editable, highlighted buffer with a gutter; returns the text, whether it changed, and any line clicked. |
| `code_line(string, any, any?)` | — | Draw one read-only code row from a list of `{ text, color, strong }` spans, with a gutter label on the left. |
| `color(any?) -> [float], bool` | — | Draw a colour picker over `value`, an `[r, g, b, a]` of unit floats; returns the colour and whether it changed. |
| `cursor_y() -> float` | — | How far down the current panel the next widget will land, in design pixels — the same origin `rect_stroke` measures from. |
| `dot(string, float)` | — | Draw a filled circle in a `#rrggbb` colour, `d` design pixels across. |
| `drag_value(float, any?) -> float, bool` | — | Draw a number dragged sideways to change it; returns the value and whether this frame changed it. |
| `dropdown(string, string, any, any?) -> string, bool` | — | Draw a pill-shaped select over a list of strings; returns the selection and whether it changed this frame. |
| `focus_next()` | — | Move focus to the next widget in scene order, wrapping past the last. |
| `focus_previous()` | — | Move focus to the previous widget in scene order, wrapping past the first. |
| `focused() -> any` | — | The widget node focus is on, or nil. |
| `frame(any?, fn)` | — | Wrap the callback in a box with optional `fill`, `stroke`, `radius` and padding, in design pixels. |
| `horizontal(any?, fn)` | — | Lay the callback's widgets out in a row; `width`, `height` and `tight` size it, in design pixels. |
| `image(string, any?)` | — | Draw a PNG from the project, sized by `width`/`height` in design pixels and cached by path. |
| `label(string, any?)` | — | Draw a line of text; `size`, `font`, `color`, `strong`, `wrap` and `truncate` style it. |
| `left_panel(string, any?, fn) -> float` | — | Dock a column down the left of the window and draw the callback inside it; `width` is in design pixels. Answers the width it ended up with. |
| `menu_item(string, any?) -> bool` | — | Draw a row inside a context menu; true on the frame it was clicked, which also closes the menu. |
| `modal(string, any?, fn) -> bool` | — | Draw the callback in a centered dialog over a dimming scrim; true on the frame the scrim was clicked. `width`, `height` and `top` size and place it, `fill`, `stroke` and `scrim` colour it; height follows the content when it is not given. |
| `overlay(string, any?, fn)` | — | Draw the callback in a foreground area at `x`/`y` design pixels, above the panels and the widget layer. `w`/`h` fix its size, and `fill`, `stroke`, `radius` and padding make it a sheet. |
| `pill(string, any?) -> bool` | — | Draw a rounded button, or a left-aligned row when `align = "left"`; true on the frame it was clicked. |
| `rect_stroke(float, float, float, float, any?)` | — | Outline a rectangle at x/y/w/h design pixels from the current panel's corner, `dashed` when asked. |
| `right(fn)` | — | Lay the callback's widgets out against the right edge, still declared left to right. |
| `right_panel(string, any?, fn) -> float` | — | Dock a column down the right of the window and draw the callback inside it; `width` is in design pixels. Answers the width it ended up with. |
| `scale() -> float` | — | The global UI scale: real pixels per design pixel. |
| `screen_size() -> float, float` | — | The window's width and height, in design pixels. |
| `scroll(string, any?, fn)` | — | Put the callback in a vertical scroll area; `max_height` caps it and `stick_to_bottom` follows new content. |
| `separator(string?)` | — | Draw a one-pixel rule across the container, in the given `#rrggbb` colour when one is passed. |
| `set_clipboard(string)` | — | Copy text to the system clipboard. |
| `set_focus(node)` | — | Put focus on a widget node. A node focus cannot activate is refused at the next draw. |
| `set_keyboard_focus(bool)` | — | Let the arrows, Tab, Enter and Space move and activate the focused widget. Off unless asked for, so a game that moves with the arrows does not click its own HUD; `standard_app` turns it on for a project declaring the `ui_*` actions. |
| `set_scale(float)` | — | Set the global UI scale, clamped to between 0.25 and 3.0 real pixels per design pixel; a design resolution is `screen_size` divided by it. |
| `set_text(string, string)` | — | Overwrite what the field with this `id` is editing, leaving the seed its `value` option last wrote alone. |
| `set_theme(any)` | — | Replace the theme: `name = "#rrggbb"` colour tokens, `dark = true\|false`, and a `roles` table of named looks a widget takes with `role:`. |
| `set_widget_layer(bool, float?, float?, float?, float?)` | — | Turn drawing of the scene's `widget` nodes on or off, and confine it to an x/y/w/h rect in design pixels. |
| `set_widget_surface(string, bool, float?, float?, float?, float?)` | — | The same for one named surface: roots whose `layer` is this name draw here instead. A name nothing has set takes the default surface. |
| `shortcut(string, string) -> bool` | — | Whether this chord was pressed this frame, consuming it; `mods` is `"cmd+shift"`, from the `MOD_*` constants. |
| `slider(float, float, float, any?) -> float, bool` | — | Draw a horizontal slider between `min` and `max`; returns the value after this frame and whether it moved. |
| `spacing(float, float)` | — | Set the gap between the current container's widgets, in design pixels. |
| `text_field(string, string?, any?) -> string, bool, bool` | — | Draw a single-line text box keyed by `id`; returns its text, whether it changed, and whether Enter was pressed. |
| `toggle(bool, any?) -> bool, bool` | — | Draw an on/off switch; returns the state after this frame and whether it was clicked. |
| `top_panel(string, any?, fn) -> float` | — | Dock a strip across the top of the window and draw the callback inside it; `height` is in design pixels. Answers the height it ended up with. |
| `vertical(fn)` | — | Lay the callback's widgets out in a column. |
| `wants_keyboard() -> bool` | — | Whether a UI widget holds keyboard focus, so the game should leave this frame's key presses alone. |
| `widget_rect(node) -> any` | — | Where a `widget` node was last drawn, as `#{ x, y, w, h }` in design pixels; empty until it has drawn once. |
| `window(string, any?, fn) -> bool` | — | Draw the callback in a floating window the user drags and resizes; false once its close button is used. |

## Constants

| name | value |
| --- | --- |
| `ANCHOR_BOTTOM_LEFT` | `bottom_left` |
| `ANCHOR_BOTTOM_RIGHT` | `bottom_right` |
| `ANCHOR_CENTER` | `center` |
| `ANCHOR_FILL` | `fill` |
| `ANCHOR_TOP_LEFT` | `top_left` |
| `ANCHOR_TOP_RIGHT` | `top_right` |
| `FONT_HEADING` | `heading` |
| `FONT_MONO` | `mono` |
| `MOD_ALT` | `alt` |
| `MOD_CMD` | `cmd` |
| `MOD_CTRL` | `ctrl` |
| `MOD_SHIFT` | `shift` |
| `WIDGET_BUTTON` | `button` |
| `WIDGET_CHECK` | `check` |
| `WIDGET_COLUMN` | `column` |
| `WIDGET_DIALOG` | `dialog` |
| `WIDGET_DRAW` | `draw` |
| `WIDGET_DROPDOWN` | `dropdown` |
| `WIDGET_FIELD` | `field` |
| `WIDGET_FLOW` | `flow` |
| `WIDGET_FOLD` | `fold` |
| `WIDGET_GRID` | `grid` |
| `WIDGET_IMAGE` | `image` |
| `WIDGET_LABEL` | `label` |
| `WIDGET_PANEL` | `panel` |
| `WIDGET_PROGRESS` | `progress` |
| `WIDGET_ROW` | `row` |
| `WIDGET_SCROLL` | `scroll` |
| `WIDGET_SEPARATOR` | `separator` |
| `WIDGET_SLIDER` | `slider` |
| `WIDGET_TAB` | `tab` |
