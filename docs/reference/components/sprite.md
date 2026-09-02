---
title: "sprite"
custom_edit_url: null
---

# `sprite`

`2d` · `render` · 10 properties · 2D

In a scene, `sprite` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `columns` | float | `0` | Sheet grid columns for flipbook sprites; 0 means a single image At least 0. |
| `flip_x` | bool | `false` | Mirror horizontally |
| `flip_y` | bool | `false` | Mirror vertically |
| `frame` | float | `0` | Current sheet cell, counted left-to-right then top-to-bottom At least 0. |
| `half_extents` | vec2 | `[0,0]` | Size override in world units; [0, 0] sizes from the texture |
| `material` | asset · [`material`](../assets/material.md) | — | The material this draws with; empty draws with the built-in one |
| `pixels_per_unit` | float | `100` | Texture pixels per world unit At least 0.01. |
| `rows` | float | `0` | Sheet grid rows for flipbook sprites; 0 means a single image At least 0. |
| `texture` | string | — | Image file, project-relative; required |

Asset types this component references: [`material`](../assets/material.md).

## Script functions

Methods of `node.sprite`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

- `color() -> float, float, float, float`
- `set_ball(float)`
- `set_circle(float)`
- `set_color(float, float, float, float?)`
- `set_cuboid(float, float, float)`
- `set_rect(float, float)`
- `set_sprite(string)`
- `set_sprite_frame(int)`
- `set_sprite_sheet(string, int, int)`
- `set_sprite_size(float, float)`
- `shape2d() -> string, float, float`
- `shape3d() -> string, float, float, float`
- `sprite() -> string, int, int, int`

Module-level, not on the handle:

- `render::camera_2d() -> float, float, float`
- `render::camera_matrix() -> [float]`
- `render::camera_pose() -> float, float, float, float, float, float, float, float`
- `render::draw_line(float, float, float, float, float, float, float, float, float, float?, bool?, bool?)`
- `render::draw_line_2d(float, float, float, float, float, float, float, float?)`
- `render::mouse_ray() -> float, float, float, float, float, float`
- `render::mouse_world_2d() -> float, float`
- `render::pick_ray(float, float, float, float, float, float) -> node?`
- `render::screenshot(string)`
- `render::set_app_icon(string)`
- `render::set_background(float, float, float)`
- `render::set_camera(float, float, float, float, float, float)`
- `render::set_camera_2d(float, float, float)`
- `render::set_camera_input(bool)`
- `render::set_cursor_grab(bool)`
- `render::set_cursor_hidden(bool)`
- `render::set_fullscreen(bool)`
- `render::set_grid(bool, float?, int?, int?)`
- `render::set_grid_colors(float, float, float, float, float, float)`
- `render::texture_size(string) -> int, int`
