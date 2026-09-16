---
title: "camera3d component"
image: "/img/social/reference.png"
sidebar_label: "camera3d"
description: "The perspective camera the scene is drawn from. look_at aims it, and the last current camera wins."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"/></svg></span>`camera3d`

`3d` · `render` · 14 properties · 3D

The perspective camera the scene is drawn from. `look_at` aims it, and the last `current` camera wins.

In a scene, `camera3d` is the node key that applies it. A script reaches each property below as a field on `node.camera3d`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.camera3d.get()` and `node.camera3d.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `aberration_amount` | float | `0.004` | How far `aberration` slides red from blue at the frame's edge, as a fraction of it At least 0. |
| `bloom_intensity` | float | `0.6` | How much of the bloom is added back over the frame At least 0. |
| `bloom_threshold` | float | `1` | Brightness a pixel has to pass to bloom At least 0. |
| `current` | bool | `true` | Whether this camera drives the view; the last current one wins |
| `grain_amount` | float | `0.06` | How much the `grain` pass lightens and darkens a pixel At least 0. |
| `look_at` | vec3 | `[0,0,0]` | World point the camera looks at |
| `pixelate_size` | float | `4` | The side of one block the `pixelate` pass reads the frame back in, in pixels At least 1. |
| `post` | strings | `[]` | The frame's passes, in order. bloom, ssao, ssr, dof, fxaa, sharpen, tonemap, vignette, aberration, grain, pixelate name the engine's own -- `ssao`, `ssr` and `dof` are 3D only, and where each physically runs is fixed by the pipeline. Any other name is a `material` asset drawn over the whole frame, and those run in the order given. `tonemap` is where the film becomes a picture: a material before it works in linear light and is what blooms, one after it works on the finished frame, and a list that does not name it has it at the head |
| `ssao_bias` | float | `0.025` | How far in front of a surface a sample must be to occlude it. Too small and a glancing surface occludes itself into black At least 0. |
| `ssao_intensity` | float | `1.2` | How strongly the `ssao` pass darkens At least 0. |
| `ssao_power` | float | `1.5` | The contrast the occlusion is raised to At least 0.001. |
| `ssao_radius` | float | `0.5` | How far the `ssao` pass looks for something occluding a point, in world units. Scale it with the scene At least 0.001. |
| `vignette_amount` | float | `0.35` | How dark the corners go under the `vignette` pass Range 0–1. |
| `vignette_roundness` | float | `1` | 1 darkens in a circle whatever shape the frame is; 0 follows the frame Range 0–1. |
