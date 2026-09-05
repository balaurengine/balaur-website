---
title: "events module"
image: "/img/social/reference.png"
sidebar_label: "events"
description: "Named events between scripts. A node subscribes to a name and hears it as its script's on_<name> method; anything may emit. Delivery is at the top of the…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`events`

Named events between scripts. A node subscribes to a name and hears it as its script's `on_<name>` method; anything may emit. Delivery is at the top of the next frame's update, in emission then subscription order, so a handler never runs inside the call that emitted. `emitted` is the asking twin, for a script that would rather look than declare a method.

4 functions, 0 constants. Scripts reach it as `events::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `emit(string, any?)` | — | Queue an event for every subscriber, delivered at the top of the next frame's update. |
| `emitted(string) -> any` | — | The payloads delivered under this name this frame, in emission order; empty when none were. |
| `subscribe(node, string)` | — | Hear an event on this node, as its script's `on_<name>(payload)`. Subscribing twice is once. |
| `unsubscribe(node, string)` | — | Stop hearing an event on this node. Not an error when it was never subscribed. |
