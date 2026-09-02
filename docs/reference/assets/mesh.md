---
title: "mesh"
custom_edit_url: null
---

# `mesh`

Files live in `models/`. Used by [`collider3d`](../components/collider3d.md) · `mesh`, [`mesh`](../components/mesh.md) · `source`, [`polygon`](../components/polygon.md) · `mesh`, [`shape2d`](../components/shape2d.md) · `mesh`.

Geometry for `mesh`-typed properties. A definition either names a `source`
model file to import or carries the vertices itself as `positions` and
`indices`, which is what lets a script build one at run time; naming both is
refused. A `skin` table adds bone weights for skeletal animation.

```toml
[[assets]]
id = "blade"
type = "mesh"
source = "models/blade.obj"      # imported...
# ...or, instead of `source`:
positions = [[0, 0, 0], [1, 0, 0], [0, 1, 0]]
indices = [[0, 1, 2]]
```
