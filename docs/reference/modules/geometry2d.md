---
title: "geometry2d module"
image: "/img/social/reference.png"
sidebar_label: "geometry2d"
description: "Polygons on the plane, as lists of [x, y] points in outline order: triangulation, booleans, hulls and containment. Every answer is the same on every…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`geometry2d`

Polygons on the plane, as lists of `[x, y]` points in outline order: triangulation, booleans, hulls and containment. Every answer is the same on every platform: the booleans run in fixed point and the rest is plain arithmetic.

9 functions, 0 constants. Scripts reach it as `geometry2d::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `area(any) -> float` | — | The polygon's area, always positive whatever its winding. |
| `contains(any, any) -> bool` | — | Whether a point lies inside the polygon; a point on an edge counts as inside. |
| `convex_hull(any) -> any` | — | The smallest convex polygon around the points, counter-clockwise. |
| `difference(any, any) -> any` | — | Everything inside the first polygon and outside the second, shaped as `union` shapes it. |
| `intersection(any, any) -> any` | — | Everything inside both polygons, shaped as `union` shapes it. |
| `is_clockwise(any) -> bool` | — | Whether the points run clockwise, with y up. |
| `segments_intersect(any, any, any, any) -> any` | — | Where two segments cross, or nil when they do not; touching at an endpoint counts. |
| `triangulate(any) -> any` | — | The polygon cut into triangles, as `[i, j, k]` triples indexing its points, counter-clockwise; either winding is accepted. |
| `union(any, any) -> any` | — | Everything inside either polygon: a list of shapes, each a list of paths whose first is the outline and the rest holes. |
