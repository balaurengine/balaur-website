---
title: "skeleton module"
image: "/img/social/reference.png"
sidebar_label: "skeleton"
description: "Bones under a rig node: the rest pose a rig returns to, and the tree order a skin numbers its joints in. A bone is any node carrying bone2d or bone3d…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--animation" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M225.09,102.44a28,28,0,0,1-35.92,5.3,8,8,0,0,0-10,1.07l-70.38,70.38a8,8,0,0,0-1.07,10,28,28,0,1,1-51.42,10.51,28,28,0,1,1,10.51-51.42,8,8,0,0,0,10-1.07l70.38-70.38a8,8,0,0,0,1.07-10,28,28,0,1,1,51.42-10.51,28,28,0,0,1,25.41,46.12Z" opacity="0.2"/><path d="M231.67,60.89a35.82,35.82,0,0,0-23.82-12.74,36,36,0,1,0-66.37,22.92.25.25,0,0,1,0,.08L71.17,141.51s0,0-.1,0a36,36,0,1,0-22.92,66.37,36,36,0,1,0,66.37-22.92.54.54,0,0,1,0-.08l70.35-70.36s0,0,.1,0a36,36,0,0,0,46.74-53.63ZM219.1,97.16a20,20,0,0,1-25.67,3.8,16,16,0,0,0-19.88,2.19l-70.4,70.4A16,16,0,0,0,101,193.43a20,20,0,1,1-36.75,7.5,8,8,0,0,0-7.91-9.24,8.5,8.5,0,0,0-1.23.1A20,20,0,1,1,62.57,155a16,16,0,0,0,19.88-2.19l70.4-70.4A16,16,0,0,0,155,62.57a20,20,0,1,1,36.75-7.5,8,8,0,0,0,9.14,9.14,20,20,0,0,1,18.17,33Z"/></svg></span>`skeleton`

Bones under a rig node: the rest pose a rig returns to, and the tree order a skin numbers its joints in. A bone is any node carrying `bone2d` or `bone3d`; there is no skeleton component.

3 functions, 0 constants. Scripts reach it as `skeleton::`.

Acts on [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md): those functions are also methods on the component's handle, without the node argument.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `apply_rest(node: node)` | [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md) | Move every bone under the node back to its rest transform. |
| `bones(node: node)` | [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md) | The bones under the node in tree order, the order a skin numbers them in, the node itself first when it is one. |
| `overwrite_rest(node: node)` | [`bone2d`](../components/bone2d.md), [`bone3d`](../components/bone3d.md) | Record every bone's current transform under the node as its new rest pose. |
