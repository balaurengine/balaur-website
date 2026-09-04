---
title: "render module"
image: "/img/social/reference.png"
sidebar_label: "render"
description: "What a frame is made of: the shape, sprite, mesh or emitter a node draws, the 2D and 3D cameras, the OS window, and the backdrop and debug lines drawn…"
custom_edit_url: null
---

# `render`

What a frame is made of: the shape, sprite, mesh or emitter a node draws, the 2D and 3D cameras, the OS window, and the backdrop and debug lines drawn around the scene.

39 functions, 0 constants. Scripts reach it as `render::`.

Acts on [`particles`](../components/particles.md), [`polygon`](../components/polygon.md), [`shape2d`](../components/shape2d.md), [`shape3d`](../components/shape3d.md), [`sprite`](../components/sprite.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `camera_2d() -> float, float, float` | — | The 2D camera this frame: centre xy and zoom in logical pixels per world unit; all zeros with no window. |
| `camera_matrix() -> [float]` | — | The camera's projection*view matrix this frame, 16 numbers column-major; all zeros with no window. |
| `camera_pose() -> float, float, float, float, float, float, float, float` | — | The camera the renderer actually used: eye xyz, target xyz, vertical fov in radians, HiDPI scale. |
| `channel() -> string` | — |  |
| `channels() -> any` | — |  |
| `check_material(string) -> any` | — | Every diagnostic about the material at that path, as `[#{ file, line, column, severity, message }]`; empty when it links. |
| `color(node) -> float, float, float, float` | [`polygon`](../components/polygon.md), [`shape2d`](../components/shape2d.md), [`shape3d`](../components/shape3d.md), [`sprite`](../components/sprite.md) | The node's tint as r, g, b, a channel floats; opaque white when the node draws nothing at all. |
| `draw_line(float, float, float, float, float, float, float, float, float, float?, bool?, bool?)` | — | Draw one 3D world-space line for this frame; the width is in pixels unless perspective scales it with distance. |
| `draw_line_2d(float, float, float, float, float, float, float, float?)` | — | Draw one 2D world-space line for this frame; width is in pixels. |
| `material_params(string) -> any` | — |  |
| `mouse_ray() -> float, float, float, float, float, float` | — | The picking ray through the mouse position: its origin xyz then its direction xyz, in world units. |
| `mouse_world_2d() -> float, float` | — | The mouse position in 2D world coordinates, for picking. |
| `pick_ray(float, float, float, float, float, float) -> node?` | — | The nearest node with a 3D shape that a world-space ray meets, from its origin xyz and direction xyz. |
| `screenshot(string)` | — | Save the next rendered frame as a PNG at a project-relative path; a run with no renderer says so. |
| `set_app_icon(string)` | — | Set the application icon (the dock or taskbar one) from a PNG in the project, named by its path. |
| `set_background(float, float, float)` | — | Set the colour the viewport is cleared to behind everything drawn, as r, g, b channel floats. |
| `set_ball(node, float)` | [`shape3d`](../components/shape3d.md) | Draw the node as a sphere of the given radius in world units, replacing any other 3D shape. |
| `set_camera(float, float, float, float, float, float)` | — | Point the 3D camera: the eye position xyz, then the world point it looks at, in world units. |
| `set_camera_2d(float, float, float)` | — | Point the 2D camera: the world centre xy, then the zoom in logical pixels per world unit. |
| `set_camera_input(bool)` | — | Allow or inhibit the backend's own mouse camera controls, so an editor can take the pointer for a drag. |
| `set_channel(string)` | — |  |
| `set_circle(node, float)` | [`shape2d`](../components/shape2d.md) | Draw the node as a circle of the given radius in world units, replacing any other 2D shape. |
| `set_color(node, float, float, float, float?)` | [`particles`](../components/particles.md), [`polygon`](../components/polygon.md), [`shape2d`](../components/shape2d.md), [`shape3d`](../components/shape3d.md), [`sprite`](../components/sprite.md) | Tint whatever the node draws, as r, g, b channel floats and an optional alpha, one meaning opaque. |
| `set_cuboid(node, float, float, float)` | [`shape3d`](../components/shape3d.md) | Draw the node as a box from its three half-extents, in world units, replacing any other 3D shape. |
| `set_cursor_grab(bool)` | — | Confine the cursor to the window, for FPS-style mouse look. |
| `set_cursor_hidden(bool)` | — | Hide or show the mouse cursor over the window. |
| `set_fullscreen(bool)` | — | Put the window into borderless fullscreen on the current monitor, or back into a window. |
| `set_grid(bool, float?, int?, int?)` | — | Turn the ground grid on or off, and optionally set its step in world units, major-line interval and extent. |
| `set_grid_colors(float, float, float, float, float, float)` | — | Set the ground grid's minor line colour then its major line colour, as r, g, b channel floats. |
| `set_rect(node, float, float)` | [`shape2d`](../components/shape2d.md) | Draw the node as a rectangle from its two half-extents, in world units, replacing any other 2D shape. |
| `set_shader_preview(string, int)` | — |  |
| `set_sprite(node, string)` | [`sprite`](../components/sprite.md) | Draw the node as a quad textured with a project image, sized from it at 100 texture pixels per world unit. |
| `set_sprite_frame(node, int)` | [`sprite`](../components/sprite.md) | Show a sheet cell, numbered left to right then top to bottom; only the UVs move, so it is cheap per frame. |
| `set_sprite_sheet(node, string, int, int)` | [`sprite`](../components/sprite.md) | Draw the node as one cell of a columns-by-rows sheet, sizing the quad to a single frame, not the whole image. |
| `set_sprite_size(node, float, float)` | [`sprite`](../components/sprite.md) | Override the size the sprite took from its image, giving half-extents in world units instead. |
| `shape2d(node) -> string, float, float` | [`shape2d`](../components/shape2d.md) | The 2D shape's kind and its two dimensions in world units; empty and zeros when the node has no 2D shape. |
| `shape3d(node) -> string, float, float, float` | [`shape3d`](../components/shape3d.md) | The 3D shape's kind and its three dimensions in world units; empty and zeros when the node has no 3D shape. |
| `sprite(node) -> string, int, int, int` | [`sprite`](../components/sprite.md) | The texture path, sheet columns and rows, and current frame; empty and zeros when the node has no sprite. |
| `texture_size(string) -> int, int` | — | An image's width and height in pixels, read from the file's own header. |
