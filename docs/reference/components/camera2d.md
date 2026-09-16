---
title: "camera2d component"
image: "/img/social/reference.png"
sidebar_label: "camera2d"
description: "The orthographic camera a flat scene is drawn from. zoom scales it, ambient lights every 2D surface, and the last current camera wins."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--2d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg></span>`camera2d`

`2d` · `render` · 15 properties · 2D

The orthographic camera a flat scene is drawn from. `zoom` scales it, `ambient` lights every 2D surface, and the last `current` camera wins.

In a scene, `camera2d` is the node key that applies it. A script reaches each property below as a field on `node.camera2d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.camera2d.get()` and `node.camera2d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `aberration_amount` | float | `0.004` | How far `aberration` slides red from blue at the frame's edge, as a fraction of it At least 0. |
| `ambient` | color | `[0,0,0,1]` | Light every 2D surface gets before any `light2d` |
| `bloom_intensity` | float | `0.6` | How much of the bloom is added back over the frame At least 0. |
| `bloom_threshold` | float | `1` | Brightness a pixel has to pass to bloom At least 0. |
| `current` | bool | `true` | Whether this camera drives the view; the last current one wins |
| `grain_amount` | float | `0.06` | How much the `grain` pass lightens and darkens a pixel At least 0. |
| `pixelate_size` | float | `4` | The side of one block the `pixelate` pass reads the frame back in, in pixels At least 1. |
| `post` | strings | `[]` | The frame's passes, in order. bloom, ssao, ssr, dof, fxaa, sharpen, tonemap, vignette, aberration, grain, pixelate name the engine's own -- `ssao`, `ssr` and `dof` are 3D only, and where each physically runs is fixed by the pipeline. Any other name is a `material` asset drawn over the whole frame, and those run in the order given. `tonemap` is where the film becomes a picture: a material before it works in linear light and is what blooms, one after it works on the finished frame, and a list that does not name it has it at the head |
| `ssao_bias` | float | `0.025` | How far in front of a surface a sample must be to occlude it. Too small and a glancing surface occludes itself into black At least 0. |
| `ssao_intensity` | float | `1.2` | How strongly the `ssao` pass darkens At least 0. |
| `ssao_power` | float | `1.5` | The contrast the occlusion is raised to At least 0.001. |
| `ssao_radius` | float | `0.5` | How far the `ssao` pass looks for something occluding a point, in world units. Scale it with the scene At least 0.001. |
| `vignette_amount` | float | `0.35` | How dark the corners go under the `vignette` pass Range 0–1. |
| `vignette_roundness` | float | `1` | 1 darkens in a circle whatever shape the frame is; 0 follows the frame Range 0–1. |
| `zoom` | float | `60` | Zoom in logical pixels per world unit At least 0.01. |
