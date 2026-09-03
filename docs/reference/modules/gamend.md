---
title: "gamend"
custom_edit_url: null
---

# `gamend`

The Gamend backend: a session, its REST API, and a realtime socket carrying topics and server hooks. Every call returns an id to await, and each result also reaches the handler method of the node it was given (`on_gamend_event` unless `on_event` names another) as a map tagged with a `kind`.

9 functions, 0 constants. Scripts reach it as `gamend::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `call_hook(int, string, string, any?) -> any` | — | Call a server plugin's function over the socket; the reply's `response` holds `data` or `error`. |
| `close(int) -> any` | — | Shut the socket down; false when the connection was already gone. |
| `configure(string)` | — | Point the plugin at a server's base url; every other call errors until this one runs. |
| `connect(any, any?) -> any` | — | Open the realtime socket and return the id `join`, `push`, `leave`, `call_hook` and `close` take. |
| `join(int, string, any?) -> any` | — | Subscribe the socket to a topic and return the id the server's `reply` answers. |
| `leave(int, string) -> any` | — | Unsubscribe the socket from a topic, returning the id the `reply` answers. |
| `login(any, any?, any?) -> any` | — | Open a session from a `device_id`, or an `email` and `password`, and return the id its `login` result answers. |
| `push(int, string, string, any?) -> any` | — | Send an event and its payload to a topic on the socket, returning the id the `reply` answers. |
| `rest(any, string, string, any?) -> any` | — | Call a path on the configured server over HTTP; the result carries the `status` and the decoded `body`. |
