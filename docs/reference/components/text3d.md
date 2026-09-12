---
title: "text3d component"
image: "/img/social/reference.png"
sidebar_label: "text3d"
description: "A block of text drawn in the 3D pass on a quad, pixels_per_unit font pixels per world unit; billboard turns it to the camera."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"/></svg></span>`text3d`

`3d` · `render` · 22 properties · 3D

A block of `text` drawn in the 3D pass on a quad, `pixels_per_unit` font pixels per world unit; `billboard` turns it to the camera.

In a scene, `text3d` is the node key that applies it. A script reaches each property below as a field on `node.text3d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.text3d.get()` and `node.text3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `align` | enum | `center` | Where the block sits across the node's origin One of `start`, `center`, `end`. |
| `billboard` | bool | `true` | Turn to face the camera every frame; off leaves it in the node's own plane |
| `color` | color | `[1,1,1,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `depth_test` | bool | `true` | Let the scene hide it; off draws it over everything |
| `double_sided` | bool | `true` | Draw the back of the quad as well as the front |
| `family` | enum | `ui` | Which of the project's font chains to shape with One of `ui`, `heading`, `mono`, `icons`. |
| `font` | string | — | A project-relative AngelCode .fnt naming a bitmap face; empty shapes with the project's vector fonts |
| `font_size` | float | `32` | Height in font pixels, before pixels_per_unit sizes it in the world At least 1. |
| `font_style` | enum | `normal` | Upright or italic One of `normal`, `italic`. |
| `font_weight` | int | `400` | Stroke weight, 400 regular and 700 bold Range 100–900. |
| `letter_spacing` | float | `0` | Extra space between glyphs, in font pixels |
| `line_height` | float | `0` | Baseline to baseline as a multiple of the size; zero takes the default At least 0. |
| `markup` | bool | `false` | Read the text as markup: bold, italic, colour, alignment, wave and inline images |
| `max_width` | float | `0` | Font pixels the lines wrap at; zero runs the text on one line At least 0. |
| `outline_color` | color | `[0,0,0,1]` | The outline's colour |
| `outline_size` | float | `0` | Font pixels the outline reaches around the glyphs; zero draws none At least 0. |
| `pixels_per_unit` | float | `100` | Font pixels to one world unit, sizing the block the way a sprite is sized At least 0.01. |
| `shadow_color` | color | `[0,0,0,0.5]` | The shadow's colour |
| `shadow_offset_x` | float | `0` | Font pixels the shadow is moved along x; zero with y draws none |
| `shadow_offset_y` | float | `0` | Font pixels the shadow is moved along y |
| `text` | string | — | The text drawn; `text_key` wins over it |
| `text_key` | string | — | A key in the project's strings, re-read every frame so a language change shows at once |

## Script functions

Methods of `node.text3d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `set_text(string)` | Replace the text a node draws. The block re-shapes on the next frame; a `text_key` on the node still wins over it. |
| `text() -> string` | The text a node draws, as it was last set — not the localized string a `text_key` resolves to. |
