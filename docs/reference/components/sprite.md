---
title: "sprite component"
image: "/img/social/reference.png"
sidebar_label: "sprite"
description: "A textured 2D quad at the node, sized from its image at pixels_per_unit texture pixels per world unit. A columns x rows sheet makes it a flipbook frame…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"/></svg></span>`sprite`

`2d` · `render` · 12 properties · 2D

A textured 2D quad at the node, sized from its image at `pixels_per_unit` texture pixels per world unit. A `columns` x `rows` sheet makes it a flipbook `frame` steps through.

In a scene, `sprite` is the node key that applies it. A script reaches the same properties through `node.sprite.get()` and `node.sprite.set(table)`.

## Properties

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
| `region_origin` | vec2 | `[0,0]` | Top-left corner of the atlas cell to draw, in texture pixels; used with `region_size` |
| `region_size` | vec2 | `[0,0]` | Size of the atlas cell to draw, in texture pixels; [0, 0] draws the whole image and sizes the quad from the cell |
| `rows` | float | `0` | Sheet grid rows for flipbook sprites; 0 means a single image At least 0. |
| `texture` | string | — | Image file, project-relative; required |

Asset types this component references: [`material`](../assets/material.md).

## Script functions

Methods of `node.sprite`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `color() -> float, float, float, float` | The node's tint as r, g, b, a channel floats; opaque white when the node draws nothing at all. |
| `set_color(float, float, float, float?)` | Tint whatever the node draws, as r, g, b channel floats and an optional alpha, one meaning opaque. |
| `set_sprite(string)` | Draw the node as a quad textured with a project image, sized from it at 100 texture pixels per world unit. |
| `set_sprite_frame(int)` | Show a sheet cell, numbered left to right then top to bottom; only the UVs move, so it is cheap per frame. |
| `set_sprite_sheet(string, int, int)` | Draw the node as one cell of a columns-by-rows sheet, sizing the quad to a single frame, not the whole image. |
| `set_sprite_size(float, float)` | Override the size the sprite took from its image, giving half-extents in world units instead. |
| `sprite() -> string, int, int, int` | The texture path, sheet columns and rows, and current frame; empty and zeros when the node has no sprite. |
