---
title: "websocket"
custom_edit_url: null
---

# `websocket`

3 functions, 0 constants. Scripts reach it as `websocket::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `close(int) -> any` | — |  |
| `connect(any, string, any?) -> any` | — |  |
| `send(int, string) -> any` | — | Queue a text frame on the connection; false when it is already gone. |
