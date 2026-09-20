---
title: "sprite component"
image: "/img/social/reference.png"
sidebar_label: "sprite"
description: "A textured 2D quad at the node, sized by pixels_per_unit. columns and rows, or a sprite_sheet in sheet, cut it into frames frame picks."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"/></svg></span>`sprite`

`2d` · `render` · 13 properties · 2D

A textured 2D quad at the node, sized by `pixels_per_unit`. `columns` and `rows`, or a `sprite_sheet` in `sheet`, cut it into frames `frame` picks.

In a scene, `sprite` is the node key that applies it. A script reaches each property below as a field on `node.sprite`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.sprite.get()` and `node.sprite.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `centered` | bool | `true` | Centre the image on the node; off puts its top-left corner there |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `flip_x` | bool | `false` | Mirror horizontally |
| `flip_y` | bool | `false` | Mirror vertically |
| `frame` | float | `0` | Current sheet cell, counted left-to-right then top-to-bottom At least 0. |
| `half_extents` | vec2 | `[0,0]` | Size override in world units; [0, 0] sizes from the texture |
| `material` | asset · [`material`](../assets/material.md) | — | The material this draws with; empty draws with the built-in one |
| `offset` | vec2 | `[0,0]` | Where the image sits against the node, in texture pixels with y down; turns and scales with the node |
| `pixels_per_unit` | float | `0` | Texture pixels per world unit; 0 takes the texture's own `pixels_per_unit` import setting, which is 100 unless it says At least 0. |
| `region_origin` | vec2 | `[0,0]` | Top-left corner of the atlas cell to draw, in texture pixels; used with `region_size` |
| `region_size` | vec2 | `[0,0]` | Size of the atlas cell to draw, in texture pixels; [0, 0] draws the whole image and sizes the quad from the cell |
| `sheet` | asset · [`sprite_sheet`](../assets/sprite_sheet.md) | — | A sprite_sheet whose frames `frame` indexes; its texture is drawn unless `texture` names another, and it wins over `columns`, `rows` and the region |
| `texture` | asset · [`texture`](../assets/texture.md) | — | Image file, project-relative, or a `texture` asset that reads it with settings of its own; required |

Asset types this component references: [`material`](../assets/material.md), [`sprite_sheet`](../assets/sprite_sheet.md), [`texture`](../assets/texture.md).
