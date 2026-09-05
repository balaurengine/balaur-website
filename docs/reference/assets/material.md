---
title: "material asset type"
image: "/img/social/reference.png"
sidebar_label: "material"
description: "A shader and the values it draws with. shader names a .wesl file (project-relative); [features] are the @if flags that pick a variant when it is linked…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--render" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,32c0,32.81-31.64,67.43-58.64,91.05A84.39,84.39,0,0,0,133,90.64C156.57,63.64,191.19,32,224,32Z" opacity="0.2"/><path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z"/></svg></span>`material`

Files live in `materials/`. Used by [`mesh`](../components/mesh.md) · `material`, [`shape2d`](../components/shape2d.md) · `material`, [`shape3d`](../components/shape3d.md) · `material`, [`sprite`](../components/sprite.md) · `material`, [`tilemap`](../components/tilemap.md) · `material`.

A shader and the values it draws with. `shader` names a `.wesl` file
(project-relative); `[features]` are the `@if` flags that pick a variant when
it is linked; `[params]` are the values of the shader's `Params` struct, by
field name. A number is an `f32`, an array of two, three or four numbers a
`vec2`/`vec3`/`vec4`, and a `#rrggbb` or `#rrggbbaa` string a `vec4`.

```toml
[[assets]]
id = "water"
type = "material"
shader = "shaders/water.wesl"
features = { lit = true }
params = { speed = 0.4, tint = "#3aa0ff" }
```
