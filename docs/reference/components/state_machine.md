---
title: "state_machine component"
image: "/img/social/reference.png"
sidebar_label: "state_machine"
description: "Runs the state_machine asset in machine over the player node's clips. auto transitions fire when their conditions come on; animation.travel moves to a…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--animation" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M32,176H224v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8ZM216,48H40a8,8,0,0,0-8,8V80H224V56A8,8,0,0,0,216,48Z" opacity="0.2"/><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,88h80v80H40Zm96-16V56h32V72Zm-16,0H88V56h32Zm0,112v16H88V184Zm16,0h32v16H136Zm0-16V88h80v80Zm80-96H184V56h32ZM72,56V72H40V56ZM40,184H72v16H40Zm176,16H184V184h32v16Z"/></svg></span>`state_machine`

`animation` · 3 properties · Animation

Runs the `state_machine` asset in `machine` over the `player` node's clips. `auto` transitions fire when their conditions come on; `animation.travel` moves to a state.

In a scene, `state_machine` is the node key that applies it. A script reaches each property below as a field on `node.state_machine`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.state_machine.get()` and `node.state_machine.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `active` | bool | `true` | Whether the machine is running |
| `machine` | asset · [`state_machine`](../assets/state_machine.md) | — | The state machine to run |
| `player` | string | — | Node path to the `animation` player it drives; empty means this node |

Asset types this component references: [`state_machine`](../assets/state_machine.md).

## Script functions

Methods of `node.state_machine`, the handle a node carrying this component exposes. Each is also a free function on its module, taking the node as its first argument. Every handle also has `get()`, `set(table)`, `has()` and `remove()`.

From [`animation`](../modules/animation.md):

| method | what it does |
| --- | --- |
| `jump(string)` | Cut the state machine to the named state on the next step, with no fade. |
| `set_condition(string, bool)` | Turn on or off a condition that `auto` transitions wait on. |
| `state() -> any` | The state the machine is in, or nil before it has entered one. |
| `travel(string)` | Head for the named state through the fewest transitions, each fading as it says; a state no transition reaches is cut to directly. |
