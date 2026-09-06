---
title: "path3d asset type"
image: "/img/social/reference.png"
sidebar_label: "path3d"
description: "A bezier path: points is a run of cubic control points -- an anchor, two handles, the next anchor, and three more for every segment after that -- and…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`path3d`

Files live in `paths/`. Used by no component property yet.

A bezier path: `points` is a run of cubic control points -- an anchor, two
handles, the next anchor, and three more for every segment after that -- and
`closed` joins the last segment back to the first anchor. Two points on their
own are read as a straight line.

A `path2d` is flat and a `path3d` is in space. What fills, extrudes, revolves
or sweeps one is a `mesh` asset naming it; what strokes one is `shape2d`.

```toml
[[assets]]
id = "outline"
type = "path2d"
closed = true
points = [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]
```
