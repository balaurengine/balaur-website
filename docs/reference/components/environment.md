---
title: "environment component"
image: "/img/social/reference.png"
sidebar_label: "environment"
description: "The scene's atmosphere: the sky it sits under and is lit by, the ambient light, fog, exposure, tonemap, colour grading and the shadow budget. The last…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"/></svg></span>`environment`

`3d` · `render` · 21 properties · 3D

The scene's atmosphere: the sky it sits under and is lit by, the ambient light, fog, exposure, tonemap, colour grading and the shadow budget. The last `current` one in tree order wins, so a level can carry two and switch between them. Per-view effects stay on `camera.post`.

In a scene, `environment` is the node key that applies it. A script reaches the same properties through `node.environment.get()` and `node.environment.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `ambient` | color | `[0.125,0.14,0.157,1]` | Light every surface gets whatever the lights do |
| `contrast` | float | `1` | Contrast around mid grey At least 0. |
| `current` | bool | `true` | Whether this is the environment the scene draws under; the last current one in tree order wins |
| `exposure` | float | `1` | Linear multiplier before the tonemap At least 0. |
| `fog` | enum | `none` | How fog thickens with distance One of `none`, `linear`, `exponential`, `exponential_squared`. |
| `fog_color` | color | `[0.624,0.706,0.784,1]` | What distance fades toward |
| `fog_density` | float | `0.02` | Thickness, for exponential fog At least 0. |
| `fog_end` | float | `80` | Where linear fog is total, in world units At least 0. |
| `fog_height_falloff` | float | `0` | How fast fog thins with height; zero fills the scene evenly At least 0. |
| `fog_start` | float | `10` | Where linear fog begins, in world units At least 0. |
| `gamma` | float | `1` | Gamma applied in linear space At least 0.01. |
| `saturation` | float | `1` | Colour multiplier around luminance; zero is grey At least 0. |
| `shadow_distance` | float | `60` | How far from the camera shadows are drawn At least 0. |
| `shadow_resolution` | int | `2048` | Side of the shadow map, in texels At least 256. |
| `shadow_softness` | float | `1` | How far a shadow's edge is blurred At least 0. |
| `shadows` | bool | `true` | Whether any light casts shadows at all |
| `show_sky` | bool | `true` | False lights the scene from the sky without drawing it, leaving the background colour |
| `sky` | string | — | Equirectangular image, project-relative: .hdr, .exr or .png. It draws behind the scene and lights it. Empty is no sky |
| `sky_intensity` | float | `1` | Brightness of the sky, and of the light it casts At least 0. |
| `sky_rotation` | float | `0` | Turn of the sky about y, in degrees |
| `tonemap` | enum | `neutral` | The curve the HDR film is mapped through One of `none`, `aces`, `reinhard`, `agx`, `neutral`. |
