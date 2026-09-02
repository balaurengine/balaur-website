---
title: "shape3d"
custom_edit_url: null
---

# `shape3d`

`3d` · `render` · 5 properties · 3D

In a scene, `shape3d` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `half_extents` | vec3 | `[0.5,0.5,0.5]` | Half-sizes of the cuboid, when kind is cuboid |
| `height` | float | `1` | Length along y, for capsule, cylinder and cone At least 0.01. |
| `kind` | enum | `cuboid` | Rendered 3D shape One of `ball`, `cuboid`, `capsule`, `cylinder`, `cone`, `plane`. |
| `radius` | float | `0.5` | Radius, for every kind but cuboid At least 0.01. |

## Script functions

Methods of `node.shape3d`, the handle every node with this component exposes. Each is also a free function on its module with the node as the first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

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
