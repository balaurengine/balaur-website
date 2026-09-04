---
title: "geometry3d module"
image: "/img/social/reference.png"
sidebar_label: "geometry3d"
description: "Mesh operations that stand outside the simulation: hulls, convex decomposition, voxelisation, cutting and boolean intersection. A mesh is an asset's name…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,96V216H96L40,160V40H160Z" opacity="0.2"/><path d="M221.66,90.34h0l-56-56A8,8,0,0,0,160,32H40a8,8,0,0,0-8,8V160a8,8,0,0,0,2.3,5.61l56,56h0A8,8,0,0,0,96,224H216a8,8,0,0,0,8-8V96A8,8,0,0,0,221.66,90.34ZM168,59.31,196.69,88H168ZM88,196.69,59.31,168H88ZM88,152H48V59.31l40,40ZM59.31,48H152V88H99.31ZM152,104v48H104V104ZM104,208V168h52.69l40,40Zm104-11.31-40-40V104h40Z"/></svg></span>`geometry3d`

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
