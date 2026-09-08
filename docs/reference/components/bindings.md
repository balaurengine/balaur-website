---
title: "bindings component"
image: "/img/social/reference.png"
sidebar_label: "bindings"
description: "What this node does when something happens to it, without a script. Each row is event, an optional when over the scene's [variables], an action, a target…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`bindings`

`interaction` · 1 property · Other

What this node does when something happens to it, without a script. Each row is `event`, an optional `when` over the scene's `[variables]`, an `action`, a `target` node path and a `value`. Every action is a call a script could make, and the editor's Events view writes the script when a row outgrows the table.

In a scene, `bindings` is the node key that applies it. A script reaches each property below as a field on `node.bindings`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.bindings.get()` and `node.bindings.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `rows` | strings | `[]` | The binding rows, each `{ event, when, action, target, value }` Scene shorthand: `rows`'s value can be given as the component's whole value. |
