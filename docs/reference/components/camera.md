---
title: "camera component"
image: "/img/social/reference.png"
sidebar_label: "camera"
description: "The camera the scene is drawn from. kind is 3d or 2d; look_at aims the 3D one, zoom scales the 2D one, the last current camera wins."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,72V184a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H192A8,8,0,0,1,200,72Z" opacity="0.2"/><path d="M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z"/></svg></span>`camera`

`3d` · `render` · 17 properties · 3D

The camera the scene is drawn from. `kind` is `3d` or `2d`; `look_at` aims the 3D one, `zoom` scales the 2D one, the last `current` camera wins.

In a scene, `camera` is the node key that applies it. A script reaches each property below as a field on `node.camera`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.camera.get()` and `node.camera.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `aberration_amount` | float | `0.004` | How far `aberration` slides red from blue at the frame's edge, as a fraction of it At least 0. |
| `ambient` | color | `[0,0,0,1]` | Light every 2D surface gets before any `light2d`; only a `2d` camera's is read |
| `bloom_intensity` | float | `0.6` | How much of the bloom is added back over the frame At least 0. |
| `bloom_threshold` | float | `1` | Brightness a pixel has to pass to bloom At least 0. |
| `current` | bool | `true` | Whether this camera drives the view; the last current one wins |
| `grain_amount` | float | `0.06` | How much the `grain` pass lightens and darkens a pixel At least 0. |
| `kind` | enum | `3d` | Which camera this node drives One of `3d`, `2d`. |
| `look_at` | vec3 | `[0,0,0]` | World point the 3D camera looks at |
| `pixelate_size` | float | `4` | The side of one block the `pixelate` pass reads the frame back in, in pixels At least 1. |
| `post` | strings | `[]` | The frame's passes, in order. bloom, ssao, ssr, dof, fxaa, sharpen, tonemap, vignette, aberration, grain, pixelate name the engine's own -- `ssao`, `ssr` and `dof` are 3D only, and where each physically runs is fixed by the pipeline. Any other name is a `material` asset drawn over the whole frame, and those run in the order given. `tonemap` is where the film becomes a picture: a material before it works in linear light and is what blooms, one after it works on the finished frame, and a list that does not name it has it at the head |
| `ssao_bias` | float | `0.025` | How far in front of a surface a sample must be to occlude it. Too small and a glancing surface occludes itself into black At least 0. |
| `ssao_intensity` | float | `1.2` | How strongly the `ssao` pass darkens At least 0. |
| `ssao_power` | float | `1.5` | The contrast the occlusion is raised to At least 0.001. |
| `ssao_radius` | float | `0.5` | How far the `ssao` pass looks for something occluding a point, in world units. Scale it with the scene At least 0.001. |
| `vignette_amount` | float | `0.35` | How dark the corners go under the `vignette` pass Range 0–1. |
| `vignette_roundness` | float | `1` | 1 darkens in a circle whatever shape the frame is; 0 follows the frame Range 0–1. |
| `zoom` | float | `60` | 2D zoom in logical pixels per world unit At least 0.01. |
