---
title: "touch_button component"
image: "/img/social/reference.png"
sidebar_label: "touch_button"
description: "An on-screen button that presses an action while a finger is on it, so a game bound to a key on a desktop needs no second code path on a phone. Placed…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg></span>`touch_button`

`2d` · `ui` · 9 properties · 2D

An on-screen button that presses an `action` while a finger is on it, so a game bound to a key on a desktop needs no second code path on a phone. Placed against the screen less its safe area, not in the scene's world.

In a scene, `touch_button` is the node key that applies it. A script reaches each property below as a field on `node.touch_button`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.touch_button.get()` and `node.touch_button.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `action` | string | — | The action a finger on this button presses, as `[input.actions]` names it; the action needs no touch binding |
| `anchor` | enum | `bottom_right` | Screen corner or edge the offset is measured from, inside the safe area One of `top_left`, `center_top`, `top_right`, `center_left`, `center`, `center_right`, `bottom_left`, `center_bottom`, `bottom_right`. |
| `color` | color | `[1,1,1,0.25]` | Fill while nothing is on it, as channel floats or #rrggbb / #rrggbbaa |
| `height` | float | `120` | Touch area height in design pixels At least 0. |
| `offset` | vec2 | `[-110,-110]` | From the anchor to the button's centre, in design pixels, x right and y down |
| `pressed_color` | color | `[1,1,1,0.5]` | Fill while a finger is on it |
| `shape` | enum | `circle` | The touch area's outline; a circle uses the larger half of the box One of `rect`, `circle`. |
| `visibility` | enum | `touchscreen` | `touchscreen` hides it and stops it taking fingers where the platform has no touch screen One of `always`, `touchscreen`. |
| `width` | float | `120` | Touch area width in design pixels At least 0. |
