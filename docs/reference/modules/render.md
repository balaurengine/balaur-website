---
title: "render"
custom_edit_url: null
---

# `render`

33 functions, 0 constants. Scripts reach it as `render::`.

Acts on [`camera`](../components/camera.md), [`shape2d`](../components/shape2d.md), [`shape3d`](../components/shape3d.md), [`sprite`](../components/sprite.md).

## Functions

Argument kinds are the script values a call passes; `node` is a node handle, `any` a table or value of any kind.

- `camera_2d() -> float, float, float`
- `camera_matrix() -> [float]`
- `camera_pose() -> float, float, float, float, float, float, float, float`
- `color(node) -> float, float, float, float`
- `draw_line(float, float, float, float, float, float, float, float, float, float?, bool?, bool?)`
- `draw_line_2d(float, float, float, float, float, float, float, float?)`
- `mouse_ray() -> float, float, float, float, float, float`
- `mouse_world_2d() -> float, float`
- `pick_ray(float, float, float, float, float, float) -> node?`
- `screenshot(string)`
- `set_app_icon(string)`
- `set_background(float, float, float)`
- `set_ball(node, float)`
- `set_camera(float, float, float, float, float, float)`
- `set_camera_2d(float, float, float)`
- `set_camera_input(bool)`
- `set_circle(node, float)`
- `set_color(node, float, float, float, float?)`
- `set_cuboid(node, float, float, float)`
- `set_cursor_grab(bool)`
- `set_cursor_hidden(bool)`
- `set_fullscreen(bool)`
- `set_grid(bool, float?, int?, int?)`
- `set_grid_colors(float, float, float, float, float, float)`
- `set_rect(node, float, float)`
- `set_sprite(node, string)`
- `set_sprite_frame(node, int)`
- `set_sprite_sheet(node, string, int, int)`
- `set_sprite_size(node, float, float)`
- `shape2d(node) -> string, float, float`
- `shape3d(node) -> string, float, float, float`
- `sprite(node) -> string, int, int, int`
- `texture_size(string) -> int, int`
