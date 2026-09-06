---
title: "text2d component"
image: "/img/social/reference.png"
sidebar_label: "text2d"
description: "A block of text drawn in the 2D pass, shaped by the engine's fonts and sized at pixels_per_unit font pixels to the world unit."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg></span>`text2d`

`2d` · `render` · 19 properties · 2D

A block of text drawn in the 2D pass, shaped by the engine's fonts and sized at `pixels_per_unit` font pixels to the world unit.

In a scene, `text2d` is the node key that applies it. A script reaches the same properties through `node.text2d.get()` and `node.text2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `align` | enum | `center` | Where the block sits across the node's origin One of `start`, `center`, `end`. |
| `color` | color | `[1,1,1,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
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

Methods of `node.text2d`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `set_text(string)` | Replace the text a node draws. The block re-shapes on the next frame; a `text_key` on the node still wins over it. |
| `text() -> string` | The text a node draws, as it was last set — not the localized string a `text_key` resolves to. |
