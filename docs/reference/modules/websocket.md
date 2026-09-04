---
title: "websocket module"
sidebar_label: "websocket"
description: "A long-lived connection carrying text or binary frames. Its events are a stream, not a result: each one reaches the connecting node's handler method…"
custom_edit_url: null
---

# `websocket`

A long-lived connection carrying text or binary frames. Its events are a stream, not a result: each one reaches the connecting node's handler method (`on_websocket_event` unless `on_event` names another) as a map `{ socket, kind, .. }` with kind `open`, `message` (with `text`), `binary` (with `bytes`), `closed` or `error`, and nothing awaits a socket id.

3 functions, 0 constants. Scripts reach it as `websocket::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `close(int) -> any` | — | Ask the connection to close, which still delivers a `closed` event; false when it was already gone. |
| `connect(any, string, any?) -> any` | — | Open a connection and return the id `send` and `close` take; options are `on_event`, `compression` and `headers`. |
| `send(int, any) -> any` | — | Queue a frame on the connection, text for a string and binary for bytes; false when it is already gone. |
