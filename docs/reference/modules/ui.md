---
title: "ui"
custom_edit_url: null
---

# `ui`

44 functions, 14 constants. Scripts reach it as `ui::`.

Acts on [`widget`](../components/widget.md).

## Functions

Argument kinds are the script values a call passes; `node` is a node handle, `any` a table or value of any kind.

- `add_space(float)`
- `available_height() -> float`
- `available_width() -> float`
- `bottom_panel(string, any?, fn)`
- `central_panel(any?, fn)`
- `central_rect() -> float, float, float, float`
- `circle_button(string, any?) -> bool`
- `clipboard() -> string`
- `code_editor(string, string, any?) -> string, bool, int?`
- `code_line(string, any, any?)`
- `color(any?) -> [float], bool`
- `dot(string, float)`
- `drag_value(float, any?) -> float, bool`
- `dropdown(string, string, any, any?) -> string, bool`
- `frame(any?, fn)`
- `horizontal(any?, fn)`
- `image(string, any?)`
- `label(string, any?)`
- `left_panel(string, any?, fn)`
- `menu_item(string, any?) -> bool`
- `modal(string, any?, fn) -> bool`
- `overlay(string, any?, fn)`
- `pill(string, any?) -> bool`
- `rect_stroke(float, float, float, float, any?)`
- `right(fn)`
- `right_panel(string, any?, fn)`
- `scale() -> float`
- `screen_size() -> float, float`
- `scroll(string, any?, fn)`
- `separator(string?)`
- `set_clipboard(string)`
- `set_scale(float)`
- `set_text(string, string)`
- `set_theme(any)`
- `set_widget_layer(bool, float?, float?, float?, float?)`
- `shortcut(string, string) -> bool`
- `slider(float, float, float, any?) -> float, bool`
- `spacing(float, float)`
- `text_field(string, string?, any?) -> string, bool, bool`
- `toggle(bool, any?) -> bool, bool`
- `top_panel(string, any?, fn)`
- `vertical(fn)`
- `wants_keyboard() -> bool`
- `window(string, any?, fn) -> bool`

## Constants

| name | value |
| --- | --- |
| `ANCHOR_BOTTOM_LEFT` | `bottom_left` |
| `ANCHOR_BOTTOM_RIGHT` | `bottom_right` |
| `ANCHOR_CENTER` | `center` |
| `ANCHOR_TOP_LEFT` | `top_left` |
| `ANCHOR_TOP_RIGHT` | `top_right` |
| `FONT_HEADING` | `heading` |
| `FONT_MONO` | `mono` |
| `MOD_ALT` | `alt` |
| `MOD_CMD` | `cmd` |
| `MOD_CTRL` | `ctrl` |
| `MOD_SHIFT` | `shift` |
| `WIDGET_BUTTON` | `button` |
| `WIDGET_LABEL` | `label` |
| `WIDGET_PANEL` | `panel` |
