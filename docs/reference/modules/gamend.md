---
title: "gamend module"
image: "/img/social/reference.png"
sidebar_label: "gamend"
description: "The Gamend backend: session, REST API and realtime socket. Each call returns an id to await; the result also reaches the node's on_gamend_event (or…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M240,128a80,80,0,0,1-80,80H72A56,56,0,1,1,85.92,97.74l0,.1A80,80,0,0,1,240,128Z" opacity="0.2"/><path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z"/></svg></span>`gamend`

The Gamend backend: session, REST API and realtime socket. Each call returns an id to await; the result also reaches the node's `on_gamend_event` (or `on_event`) as a `kind` map.

19 functions, 0 constants. Scripts reach it as `gamend::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `activity() -> any` | — | The last calls and socket messages, newest first, as `{ seq, request, kind, what, status, ms, args, reply }`, `seq` counting every row ever kept; `ms` is nil while a call waits, and only the newest fifty keep `args` and `reply`. An observer: never simulate from it. |
| `call_hook(int, string, string, any?) -> any` | — | Call a server plugin's function over the socket; the reply's `response` holds `data` or `error`. |
| `clear_activity() -> any` | — | Forget the calls and messages `activity` holds. |
| `close(int) -> any` | — | Shut the socket down; false when the connection was already gone. |
| `configure(string?) -> any` | — | Point the plugin at a server and answer its url; with none, the one `[gamend]` names for this run (see `target`). Every other call errors until this one runs. |
| `connect(any, any?) -> any` | — | Open the realtime socket and return the id `join`, `push`, `leave`, `call_hook` and `close` take. A dropped connection comes back on its own: the handler hears `reconnecting` before each try, then `reopened` once its topics are joined again, or `error` when it gives up. |
| `connection() -> any` | — | The configured `url`, who is signed in (`user_id`, `username`), and each socket as `{ socket, open, topics, reason }`. |
| `interrupt(int) -> any` | — | Cut the connection as a network failure would, to try a game's reconnect path: the socket reports `reconnecting`, then `reopened`. False when it is already gone. |
| `join(int, string, any?) -> any` | — | Subscribe the socket to a topic and return the id the server's `reply` answers. |
| `leave(int, string) -> any` | — | Unsubscribe the socket from a topic, returning the id the `reply` answers. |
| `login(any, any?, any?) -> any` | — | Open a session from a `device_id`, or an `email` and `password`, and return the id its `login` result answers. |
| `push(int, string, string, any?) -> any` | — | Send an event and its payload to a topic on the socket, returning the id the `reply` answers. |
| `register(any, any?, any?) -> any` | — | Make an account from an `email` and a `password` (and a `username`, generated when left out) and open its session, as `login` does; its result is a `login` one. The server mails the address its confirmation link. |
| `reply(int) -> any` | — | What a call answered, as its event map, once it has; nil while it waits. The newest sixty-four are kept, so a drawing loop can issue a call and read it back on a later frame. |
| `rest(any, string, string, any?) -> any` | — | Call a path on the configured server over HTTP; the result carries the `status` and the decoded `body`. |
| `restore(any?) -> any` | — | Sign in from a session a previous run kept, as `session` answers it, without asking the server; nil signs out here. False when there is no server to sign in to, or the map carries no `access_token`. |
| `run_id() -> any` | — | This run's id: every call sends it as `x-gamend-session` and the socket as `client_session`, so the server files a run's lines together. The log shipper names its run with it. |
| `session() -> any` | — | The signed-in session as `{ user_id, username, display_name, access_token, refresh_token, expires_in, expires_at }`, `expires_at` read from the token itself; nil when nobody is signed in. |
| `target() -> any` | — | The server a `configure()` with no URL uses: `{ name, url, production, local, plugin }` from `[gamend]`, `name` being `production` or `local`. |
