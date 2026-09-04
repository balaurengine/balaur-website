---
title: "particles component"
sidebar_label: "particles"
description: "A purely visual 2D emitter at the node: rate, lifetime, speed, cone and gravity. The live particles and the randomness scattering them are backend state…"
custom_edit_url: null
---

# `particles`

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
