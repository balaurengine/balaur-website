---
title: "light2d component"
image: "/img/social/reference.png"
sidebar_label: "light2d"
description: "A 2D light: the node's position places it, its rotation aims a directional one, and everything drawn under it — sprites, polygons, tiles, a 3D scene…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M184,128a56,56,0,1,1-56-56A56,56,0,0,1,184,128Z" opacity="0.2"/><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg></span>`light2d`

`2d` · `render` · 5 properties · 2D

A 2D light: the node's position places it, its rotation aims a directional one, and everything drawn under it — sprites, polygons, tiles, a 3D scene behind them — is multiplied by the light map the scene's lights build. A scene with no `light2d` draws exactly as it does unlit; the first one added makes everything else fall to the camera's `ambient`. Debug lines and particles draw after the light map and stay unlit.

In a scene, `light2d` is the node key that applies it. A script reaches the same properties through `node.light2d.get()` and `node.light2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `color` | color | `[1,1,1,1]` | Light colour, as channel floats or #rrggbb / #rrggbbaa |
| `intensity` | float | `1` | Brightness multiplier; over 1 blows past white At least 0. |
| `kind` | enum | `point` | A point light fades to nothing at `radius`; a directional one lights the whole view One of `point`, `directional`. |
| `radius` | float | `6` | How far a point light reaches, in world units At least 0. |
| `shadows` | bool | `true` | Whether `occluder2d` outlines cast shadows from this light |
