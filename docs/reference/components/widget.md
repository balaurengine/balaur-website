---
title: "widget"
custom_edit_url: null
---

# `widget`

`ui` · 12 properties · UI

In a scene, `widget` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

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

## Script functions

Methods of `node.widget`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`ui`](../modules/ui.md):


Module-level, not on the handle:

- `ui::add_space(float)`
- `ui::available_height() -> float`
- `ui::available_width() -> float`
- `ui::bottom_panel(string, any?, fn)`
- `ui::central_panel(any?, fn)`
- `ui::central_rect() -> float, float, float, float`
- `ui::circle_button(string, any?) -> bool`
- `ui::clipboard() -> string`
- `ui::code_editor(string, string, any?) -> string, bool, int?`
- `ui::code_line(string, any, any?)`
- `ui::color(any?) -> [float], bool`
- `ui::dot(string, float)`
- `ui::drag_value(float, any?) -> float, bool`
- `ui::dropdown(string, string, any, any?) -> string, bool`
- `ui::frame(any?, fn)`
- `ui::horizontal(any?, fn)`
- `ui::image(string, any?)`
- `ui::label(string, any?)`
- `ui::left_panel(string, any?, fn)`
- `ui::menu_item(string, any?) -> bool`
- `ui::modal(string, any?, fn) -> bool`
- `ui::overlay(string, any?, fn)`
- `ui::pill(string, any?) -> bool`
- `ui::rect_stroke(float, float, float, float, any?)`
- `ui::right(fn)`
- `ui::right_panel(string, any?, fn)`
- `ui::scale() -> float`
- `ui::screen_size() -> float, float`
- `ui::scroll(string, any?, fn)`
- `ui::separator(string?)`
- `ui::set_clipboard(string)`
- `ui::set_scale(float)`
- `ui::set_text(string, string)`
- `ui::set_theme(any)`
- `ui::set_widget_layer(bool, float?, float?, float?, float?)`
- `ui::shortcut(string, string) -> bool`
- `ui::slider(float, float, float, any?) -> float, bool`
- `ui::spacing(float, float)`
- `ui::text_field(string, string?, any?) -> string, bool, bool`
- `ui::toggle(bool, any?) -> bool, bool`
- `ui::top_panel(string, any?, fn)`
- `ui::vertical(fn)`
- `ui::wants_keyboard() -> bool`
- `ui::window(string, any?, fn) -> bool`
