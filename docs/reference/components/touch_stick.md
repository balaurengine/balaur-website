---
title: "touch_stick component"
image: "/img/social/reference.png"
sidebar_label: "touch_stick"
description: "An on-screen stick that pushes one action per axis while a thumb drags it, reading -1..1 with y positive away from the player, the way a gamepad's stick…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg></span>`touch_stick`

`2d` · `ui` · 11 properties · 2D

An on-screen stick that pushes one action per axis while a thumb drags it, reading -1..1 with y positive away from the player, the way a gamepad's stick does. Placed against the screen less its safe area.

In a scene, `touch_stick` is the node key that applies it. A script reaches each property below as a field on `node.touch_stick`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.touch_stick.get()` and `node.touch_stick.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `action_x` | string | — | The action the stick's left and right feed, -1 at the left of its throw |
| `action_y` | string | — | The action the stick's up and down feed, 1 pushed away from the player |
| `anchor` | enum | `bottom_left` | Screen corner or edge the offset is measured from, inside the safe area One of `top_left`, `center_top`, `top_right`, `center_left`, `center`, `center_right`, `bottom_left`, `center_bottom`, `bottom_right`. |
| `color` | color | `[1,1,1,0.18]` | The base circle's fill, as channel floats or #rrggbb / #rrggbbaa |
| `deadzone` | float | `0.15` | Fraction of the throw that reads zero, so a resting thumb does not drift; the rest is rescaled so the first live reading is near zero Range 0–0.95. |
| `knob_color` | color | `[1,1,1,0.45]` | The knob's fill |
| `knob_radius` | float | `38` | The knob's own radius in design pixels; drawing only At least 1. |
| `offset` | vec2 | `[130,-130]` | From the anchor to the stick's centre, in design pixels, x right and y down |
| `radius` | float | `90` | The throw in design pixels: how far the knob travels for a full 1, and the circle a thumb may grab it in At least 1. |
| `recenter` | bool | `false` | Move the stick's centre to the thumb that grabbed it, so an off-centre grab does not jerk |
| `visibility` | enum | `touchscreen` | `touchscreen` hides it and stops it taking fingers where the platform has no touch screen One of `always`, `touchscreen`. |
