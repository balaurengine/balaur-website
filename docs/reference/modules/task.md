---
title: "task module"
image: "/img/social/reference.png"
sidebar_label: "task"
description: "Waiting inside an async handler: init and event handlers may await, update is deliberately synchronous."
custom_edit_url: null
---

# `task`

Waiting inside an async handler: `init` and event handlers may await, `update` is deliberately synchronous.

1 function, 0 constants. Scripts reach it as `task::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `wait(token: int)` | — | Park an async handler until the engine wakes the token it was given. |
