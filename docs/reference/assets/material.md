---
title: "material asset type"
image: "/img/social/reference.png"
sidebar_label: "material"
description: "A shader and the values it draws with. shader names a .wesl file (project-relative); [features] are the @if flags that pick a variant when it is linked…"
custom_edit_url: null
---

# `material`

Files live in `materials/`. Used by [`mesh`](../components/mesh.md) · `material`, [`shape2d`](../components/shape2d.md) · `material`, [`shape3d`](../components/shape3d.md) · `material`, [`sprite`](../components/sprite.md) · `material`.

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
