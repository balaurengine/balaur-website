---
title: "timer component"
image: "/img/social/reference.png"
sidebar_label: "timer"
description: "Counts wait_time seconds down and emits timeout from the node, which bindings hear as emitted:timeout. running or autostart starts it; one_shot stops…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`timer`

`interaction` · 5 properties · Other

Counts `wait_time` seconds down and emits `timeout` from the node, which bindings hear as `emitted:timeout`. `running` or `autostart` starts it; `one_shot` stops after one round.

In a scene, `timer` is the node key that applies it. A script reaches each property below as a field on `node.timer`: reading one asks the running component, and assigning one leaves the rest alone. The whole table is `node.timer.get()` and `node.timer.set(table)`.

## Properties

| property | type | default | description |
| --- | --- | --- | --- |
| `autostart` | bool | `false` | Start counting as soon as the node is in the scene |
| `one_shot` | bool | `false` | Stop after one `timeout`; off, count the next one at once |
| `running` | bool | `false` | Whether it is counting; set true to start it from `wait_time`, false to stop it |
| `time_left` | float | `0` | Seconds until the next `timeout` Read-only: engine output the inspector shows but never writes. At least 0. |
| `wait_time` | float | `1` | Seconds from starting to `timeout` At least 0.001. |
