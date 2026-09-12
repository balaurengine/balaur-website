---
title: "meta component"
image: "/img/social/reference.png"
sidebar_label: "meta"
description: "Named values filed on the node, like Godot's set_meta. It has no fixed properties; every key is the author's."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`meta`

`interaction` · 0 properties · Other

Named values filed on the node, like Godot's `set_meta`. It has no fixed properties; every key is the author's.

In a scene, `meta` is the node key that applies it. A script reaches each property below as a field on `node.meta`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.meta.get()` and `node.meta.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
