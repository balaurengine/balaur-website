---
title: "shape2d"
custom_edit_url: null
---

# `shape2d`

`2d` · `render` · 8 properties · 2D

In a scene, `shape2d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `closed` | bool | `false` | Join the last point back to the first, making a polygon outline |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `half_extents` | vec2 | `[0.5,0.5]` | Half-sizes of the rect, when kind is rect |
| `height` | float | `1` | Length along y of the straight part, when kind is capsule At least 0.01. |
| `kind` | enum | `rect` | Rendered 2D shape One of `circle`, `rect`, `capsule`, `polyline`. |
| `mesh` | asset · [`mesh`](../assets/mesh.md) | — | Points of a polyline, taken from a mesh asset's vertices |
| `radius` | float | `0.5` | Radius, when kind is circle or capsule At least 0.01. |
| `width` | float | `0.02` | Line thickness in world units, when kind is polyline At least 0.001. |

Asset types this component references: [`mesh`](../assets/mesh.md).

## Script functions

Methods of `node.shape2d`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

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
