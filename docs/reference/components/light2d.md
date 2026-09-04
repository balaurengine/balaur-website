---
title: "light2d component"
image: "/img/social/reference.png"
sidebar_label: "light2d"
description: "A 2D light: the node's position places it, its rotation aims a directional one, and everything drawn under it — sprites, polygons, tiles, a 3D scene…"
custom_edit_url: null
---

# `light2d`

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
