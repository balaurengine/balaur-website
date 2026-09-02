---
title: "particles"
custom_edit_url: null
---

# `particles`

`render` · 9 properties · Rendering

In a scene, `particles` is the node key that applies it. From a script, the [`node`](../modules/node.md) module's component functions read and write the same properties by name.

| property | type | default | description |
| --- | --- | --- | --- |
| `angle` | float | `90` | Emission direction in degrees; 90 is straight up |
| `color` | color | `[0.8,0.8,0.8,1]` | Tint, as channel floats or #rrggbb / #rrggbbaa |
| `emitting` | bool | `true` | Whether new particles are born; live ones finish either way |
| `gravity` | vec2 | `[0,-3]` | Acceleration applied over a particle's life |
| `lifetime` | float | `1` | Seconds a particle lives At least 0.05. |
| `rate` | float | `20` | Particles born per second At least 0. |
| `size` | float | `4` | Particle size in logical pixels At least 0.5. |
| `speed` | float | `2` | Initial speed in world units per second At least 0. |
| `spread` | float | `30` | Half-angle of the emission cone in degrees At least 0. |
