---
title: "http"
custom_edit_url: null
---

# `http`

HTTP calls, off the frame: the reply arrives on a later tick as a map with `status`, `headers` and `body`, or with `error`, both to the node's `on_response` method and to whoever awaits the returned id. Options are `method`, `headers`, `body` and a `timeout` in seconds, which falls back to the project's `[net] http_timeout`.

1 function, 0 constants. Scripts reach it as `http::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `request(any, any?, any?) -> any` | — | Start an HTTP request and return the id its reply carries, to await or to match inside the handler. |
