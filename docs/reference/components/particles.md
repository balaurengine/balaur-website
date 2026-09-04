---
title: "particles component"
image: "/img/social/reference.png"
sidebar_label: "particles"
description: "A purely visual 2D emitter at the node: rate, lifetime, speed, cone and gravity. The live particles and the randomness scattering them are backend state…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--render" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z" opacity="0.2"/><path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"/></svg></span>`particles`

`render` · 9 properties · Rendering

A purely visual 2D emitter at the node: rate, lifetime, speed, cone and gravity. The live particles and the randomness scattering them are backend state the simulation never sees.

In a scene, `particles` is the node key that applies it. A script reaches the same properties through `node.particles.get()` and `node.particles.set(table)`.

## Properties

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

## Script functions

Methods of `node.particles`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`render`](../modules/render.md):

| method | what it does |
| --- | --- |
| `set_color(float, float, float, float?)` | Tint whatever the node draws, as r, g, b channel floats and an optional alpha, one meaning opaque. |
