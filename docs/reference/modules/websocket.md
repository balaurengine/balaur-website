---
title: "websocket module"
image: "/img/social/reference.png"
sidebar_label: "websocket"
description: "A long-lived connection carrying text or binary frames. Its events are a stream, not a result: each one reaches the connecting node's handler method…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M76,124l56,56-29,29a24,24,0,0,1-33.94,0L47,186.91A24,24,0,0,1,47,153ZM209,69.09,186.91,47A24,24,0,0,0,153,47L124,76l56,56,29-29A24,24,0,0,0,209,69.09Z" opacity="0.2"/><path d="M149.66,138.34a8,8,0,0,0-11.32,0L120,156.69,99.31,136l18.35-18.34a8,8,0,0,0-11.32-11.32L88,124.69,69.66,106.34a8,8,0,0,0-11.32,11.32L64.69,124,41.37,147.31a32,32,0,0,0,0,45.26l5.38,5.37-28.41,28.4a8,8,0,0,0,11.32,11.32l28.4-28.41,5.37,5.38a32,32,0,0,0,45.26,0L132,191.31l6.34,6.35a8,8,0,0,0,11.32-11.32L131.31,168l18.35-18.34A8,8,0,0,0,149.66,138.34Zm-52.29,65a16,16,0,0,1-22.62,0L52.69,181.25a16,16,0,0,1,0-22.62L76,135.31,120.69,180Zm140.29-185a8,8,0,0,0-11.32,0l-28.4,28.41-5.37-5.38a32.05,32.05,0,0,0-45.26,0L124,64.69l-6.34-6.35a8,8,0,0,0-11.32,11.32l80,80a8,8,0,0,0,11.32-11.32L191.31,132l23.32-23.31a32,32,0,0,0,0-45.26l-5.38-5.37,28.41-28.4A8,8,0,0,0,237.66,18.34Zm-34.35,79L180,120.69,135.31,76l23.32-23.31a16,16,0,0,1,22.62,0l22.06,22A16,16,0,0,1,203.31,97.37Z"/></svg></span>`websocket`

A long-lived connection carrying text or binary frames. Its events are a stream, not a result: each one reaches the connecting node's handler method (`on_websocket_event` unless `on_event` names another) as a map `{ socket, kind, .. }` with kind `open`, `message` (with `text`), `binary` (with `bytes`), `closed` or `error`, and nothing awaits a socket id.

3 functions, 0 constants. Scripts reach it as `websocket::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `close(int) -> any` | — | Ask the connection to close, which still delivers a `closed` event; false when it was already gone. |
| `connect(any, string, any?) -> any` | — | Open a connection and return the id `send` and `close` take; options are `on_event`, `compression` and `headers`. |
| `send(int, any) -> any` | — | Queue a frame on the connection, text for a string and binary for bytes; false when it is already gone. |
