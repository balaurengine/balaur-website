---
title: "geometry3d"
custom_edit_url: null
---

# `geometry3d`

Mesh operations that stand outside the simulation: hulls, convex decomposition, voxelisation, cutting and boolean intersection. A mesh is an asset's name or a table of `points` and `indices`.

6 functions, 0 constants. Scripts reach it as `geometry3d::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `convex_decomposition(any, any?) -> any` | — | The mesh cut into convex pieces, each one a mesh: the only way to collide a concave shape dynamically. |
| `convex_hull(any) -> any` | — | The tightest convex shape containing every point: what a dynamic collider wants when the model is concave. |
| `intersect(any, any) -> any` | — | The mesh both meshes have in common, or nothing when they do not overlap. |
| `pieces(any) -> any` | — | The mesh's separate parts, one mesh each: what a model that was already broken is made of. |
| `split(any, any) -> any` | — | Cut the mesh with a plane, returning the two halves: `#{ point = [..], normal = [..] }`. |
| `voxelize(any, any?) -> any` | — | The mesh as a voxel grid — `#{ size, cells }`, ready to be a `voxels` asset — so a model can become destructible terrain. |
