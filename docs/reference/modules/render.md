---
title: "render module"
image: "/img/social/reference.png"
sidebar_label: "render"
description: "What a frame is made of: the shape, sprite, mesh or emitter a node draws, the 2D and 3D cameras, the OS window, and the backdrop and debug lines drawn…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--render" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"/></svg></span>`render`

What a frame is made of: the shape, sprite, mesh or emitter a node draws, the 2D and 3D cameras, the OS window, and the backdrop and debug lines drawn around the scene.

52 functions, 0 constants. Scripts reach it as `render::`.

Acts on [`occluder2d`](../components/occluder2d.md), [`particles`](../components/particles.md), [`polygon`](../components/polygon.md), [`shape2d`](../components/shape2d.md), [`shape3d`](../components/shape3d.md), [`sprite`](../components/sprite.md), [`tilemap`](../components/tilemap.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `camera_2d() -> float, float, float` | — | The 2D camera this frame: centre xy and zoom in logical pixels per world unit; all zeros with no window. |
| `camera_matrix() -> [float]` | — | The camera's projection*view matrix this frame, 16 numbers column-major; all zeros with no window. |
| `camera_pose() -> float, float, float, float, float, float, float, float` | — | The camera the renderer actually used: eye xyz, target xyz, vertical fov in radians, HiDPI scale. |
| `cell(node, int, int) -> int` | [`tilemap`](../components/tilemap.md) | The tile at a column and row, or -1 for an empty cell or one past the edge. |
| `channel() -> string` | — | Which channel the viewport is drawing instead of the scene's colour, or empty for the scene as it is. |
| `channels() -> any` | — | Every channel name `set_channel` accepts, as a list. |
| `check_material(string) -> any` | — | Every diagnostic about the material at that path, as `[#{ file, line, column, severity, message }]`; empty when it links. |
| `color(node) -> float, float, float, float` | [`polygon`](../components/polygon.md), [`shape2d`](../components/shape2d.md), [`shape3d`](../components/shape3d.md), [`sprite`](../components/sprite.md) | The node's tint as r, g, b, a channel floats; opaque white when the node draws nothing at all. |
| `draw_arc_2d(float, float, float, float, float, float?, any?)` | — | Stroke an arc between two angles in degrees, counter-clockwise from the x axis, for this frame; width is in pixels. |
| `draw_circle_2d(float, float, float, any?)` | — | Fill a circle in world units for this frame, over everything the scene drew. |
| `draw_line(float, float, float, float, float, float, float, float, float, float?, bool?, bool?)` | — | Draw one 3D world-space line for this frame; the width is in pixels unless perspective scales it with distance. |
| `draw_line_2d(float, float, float, float, float, float, float, float?)` | — | Draw one 2D world-space line for this frame; width is in pixels. |
| `draw_polyline_2d(any, float?, any?)` | — | Stroke a chain of world-space points for this frame; width is in pixels. |
| `draw_rect_2d(float, float, float, float, any?)` | — | Fill a rectangle centred at a point, in world units, for this frame. |
| `draw_texture_2d(string, float, float, float, float, any?)` | — | Draw a project image over a rectangle centred at a point, in world units, for this frame; the colour tints it. |
| `material_params(string) -> any` | — | The material's editable rows, one `#{ name, type, value }` per field its linked shader declares; empty when it will not link. |
| `mouse_ray() -> float, float, float, float, float, float` | — | The picking ray through the mouse position: its origin xyz then its direction xyz, in world units. |
| `mouse_world_2d() -> float, float` | — | The mouse position in 2D world coordinates, for picking. |
| `outline(node) -> [float]` | [`occluder2d`](../components/occluder2d.md) | The outline this node blocks 2D light with, in world space: x then y for each point in turn, with the first repeated at the end when the outline is closed. Empty on a node with no `occluder2d`. |
| `pick_ray(float, float, float, float, float, float) -> node?` | — | The nearest node with a 3D shape that a world-space ray meets, from its origin xyz and direction xyz. |
| `refresh_rate() -> float` | — | Frames per second the display refreshes at, as measured over the last frames; 60 with no window. |
| `safe_area() -> any` | — | The display's insets in pixels, `{ left, top, right, bottom }`: what a notch or a home bar covers, read once per frame and recorded. Zero on a desktop. |
| `screenshot(string)` | — | Save the next rendered frame as a PNG at a project-relative path; a run with no renderer says so. |
| `set_app_icon(string)` | — | Set the application icon (the dock or taskbar one) from a PNG in the project, named by its path. |
| `set_background(float, float, float)` | — | Set the colour the viewport is cleared to behind everything drawn, as r, g, b channel floats. |
| `set_ball(node, float)` | [`shape3d`](../components/shape3d.md) | Draw the node as a sphere of the given radius in world units, replacing any other 3D shape. |
| `set_camera(float, float, float, float, float, float)` | — | Point the 3D camera: the eye position xyz, then the world point it looks at, in world units. |
| `set_camera_2d(float, float, float)` | — | Point the 2D camera: the world centre xy, then the zoom in logical pixels per world unit. |
| `set_camera_input(bool)` | — | Allow or inhibit the backend's own mouse camera controls, so an editor can take the pointer for a drag. |
| `set_cell(node, int, int, int)` | [`tilemap`](../components/tilemap.md) | Put one tile at a column and row, counted from the top left; below zero clears the cell, and a cell past the edge grows the map. The mesh rebuilds on the next frame. |
| `set_channel(string)` | — | Draw one channel of the scene — normals, uv, depth or albedo — instead of its colour; an empty name puts the picture back. |
| `set_circle(node, float)` | [`shape2d`](../components/shape2d.md) | Draw the node as a circle of the given radius in world units, replacing any other 2D shape. |
| `set_color(node, float, float, float, float?)` | [`particles`](../components/particles.md), [`polygon`](../components/polygon.md), [`shape2d`](../components/shape2d.md), [`shape3d`](../components/shape3d.md), [`sprite`](../components/sprite.md) | Tint whatever the node draws, as r, g, b channel floats and an optional alpha, one meaning opaque. |
| `set_cuboid(node, float, float, float)` | [`shape3d`](../components/shape3d.md) | Draw the node as a box from its three half-extents, in world units, replacing any other 3D shape. |
| `set_cursor_grab(bool)` | — | Confine the cursor to the window, for FPS-style mouse look. |
| `set_cursor_hidden(bool)` | — | Hide or show the mouse cursor over the window. |
| `set_fullscreen(bool)` | — | Put the window into borderless fullscreen on the current monitor, or back into a window. |
| `set_grid(bool, float?, int?, int?)` | — | Turn the ground grid on or off, and optionally set its step in world units, major-line interval and extent. |
| `set_grid_colors(float, float, float, float, float, float)` | — | Set the ground grid's minor line colour then its major line colour, as r, g, b channel floats. |
| `set_keep_awake(bool)` | — | Keep the screen from dimming while the game runs: a page takes a wake lock, a phone its equivalent, a desktop needs nothing. |
| `set_rect(node, float, float)` | [`shape2d`](../components/shape2d.md) | Draw the node as a rectangle from its two half-extents, in world units, replacing any other 2D shape. |
| `set_shader_preview(string, int)` | — | Draw the value a shader's line computes for every pixel that reaches it; line 0 puts the picture back. |
| `set_shader_probe(float, float)` | — | Ask what the previewed line computed at one framebuffer pixel; the answer arrives through `shader_probe` a frame later. |
| `set_sprite(node, string)` | [`sprite`](../components/sprite.md) | Draw the node as a quad textured with a project image, sized from it at 100 texture pixels per world unit. |
| `set_sprite_frame(node, int)` | [`sprite`](../components/sprite.md) | Show a sheet cell, numbered left to right then top to bottom; only the UVs move, so it is cheap per frame. |
| `set_sprite_sheet(node, string, int, int)` | [`sprite`](../components/sprite.md) | Draw the node as one cell of a columns-by-rows sheet, sizing the quad to a single frame, not the whole image. |
| `set_sprite_size(node, float, float)` | [`sprite`](../components/sprite.md) | Override the size the sprite took from its image, giving half-extents in world units instead. |
| `shader_probe() -> any` | — | The four channels the previewed line wrote at the probed pixel, or `()` when nothing has been read yet. |
| `shape2d(node) -> string, float, float` | [`shape2d`](../components/shape2d.md) | The 2D shape's kind and its two dimensions in world units; empty and zeros when the node has no 2D shape. |
| `shape3d(node) -> string, float, float, float` | [`shape3d`](../components/shape3d.md) | The 3D shape's kind and its three dimensions in world units; empty and zeros when the node has no 3D shape. |
| `sprite(node) -> string, int, int, int` | [`sprite`](../components/sprite.md) | The texture path, sheet columns and rows, and current frame; empty and zeros when the node has no sprite. |
| `texture_size(string) -> int, int` | — | An image's width and height in pixels, read from the file's own header. |
