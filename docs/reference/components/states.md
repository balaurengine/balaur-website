---
title: "states component"
image: "/img/social/reference.png"
sidebar_label: "states"
description: "Named looks for the node. Every key beside current and duration is a state holding per-component property tables; node.go(\"hover\") patches one over the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`states`

`interaction` · 2 properties · Other

Named looks for the node. Every key beside `current` and `duration` is a state holding per-component property tables; `node.go("hover")` patches one over the node.

In a scene, `states` is the node key that applies it. A script reaches each property below as a field on `node.states`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.states.get()` and `node.states.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `current` | string | — | The state this node is in; empty is the pose the scene gave it |
| `duration` | float | `0` | Seconds a transition takes; zero snaps At least 0. |

## Script functions

Methods of `node.states`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`node`](../modules/node.md):

| method | what it does |
| --- | --- |
| `go()` | Put the node in one of its `states`: the state's table is patched over the components it names, and `on_state_changed(from, to)` follows. A node already in that state is left alone. |
| `state()` | The state the node is in, or "" for the pose the scene gave it. |
