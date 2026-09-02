---
title: "skeleton"
custom_edit_url: null
---

# `skeleton`

3 functions, 0 constants. Scripts reach it as `skeleton::`.

Acts on [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `apply_rest` | [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md) | Move every bone under the node back to its rest transform. |
| `bones` | [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md) | The bones under the node in tree order, the order a skin numbers them in, the node itself first when it is one. |
| `overwrite_rest` | [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md) | Record every bone's current transform under the node as its new rest pose. |
