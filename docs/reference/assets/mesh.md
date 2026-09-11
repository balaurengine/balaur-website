---
title: "mesh asset type"
image: "/img/social/reference.png"
sidebar_label: "mesh"
description: "Geometry for mesh-typed properties. A definition names a source model file to import, or a kind of parametric primitive to build, or carries the vertices…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--3d" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"/></svg></span>`mesh`

Files live in `models/`. Used by [`collider2d`](../components/collider2d.md) · `mesh`, [`collider3d`](../components/collider3d.md) · `mesh`, [`mesh`](../components/mesh.md) · `source`, [`occluder2d`](../components/occluder2d.md) · `mesh`, [`polygon`](../components/polygon.md) · `mesh`, [`shape2d`](../components/shape2d.md) · `mesh`.

Geometry for `mesh`-typed properties. A definition names a `source` model
file to import, or a `kind` of parametric primitive to build, or carries the
vertices itself as `positions` and `indices`, which is what lets a script
build one at run time; naming more than one is refused. A `skin` table adds
bone weights for skeletal animation, `colors` a tint per vertex, and each
`[[morphs]]` a named shape the mesh can be blended towards -- which a clip
drives as `mesh/morph.<name>`.

A primitive is built by the same mesher the `shape3d` component draws, so a
collider over this asset collides exactly what is on screen. A `text` mesh
is the outlines of a shaped run, filled with the counters left as holes; it
sits on its baseline and is sized in world units.

```toml
[[assets]]
id = "blade"
type = "mesh"
source = "models/blade.obj"      # imported...
# ...or a primitive, one of ball, cuboid, capsule, cylinder, cone, plane,
# torus, pyramid, prism, tube:
kind = "torus"
radius = 1.0
tube_radius = 0.3
# ...or a word, shaped and filled from the project's fonts:
kind = "text"
text = "BALAUR"
size = 1.0
# ...or, instead of any of those:
positions = [[0, 0, 0], [1, 0, 0], [0, 1, 0]]
indices = [[0, 1, 2]]
```
