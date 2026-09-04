---
title: "gamend module"
image: "/img/social/reference.png"
sidebar_label: "gamend"
description: "The Gamend backend: a session, its REST API, and a realtime socket carrying topics and server hooks. Every call returns an id to await, and each result…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M240,128a80,80,0,0,1-80,80H72A56,56,0,1,1,85.92,97.74l0,.1A80,80,0,0,1,240,128Z" opacity="0.2"/><path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z"/></svg></span>`gamend`

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
