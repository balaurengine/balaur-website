---
title: "multiplayer module"
image: "/img/social/reference.png"
sidebar_label: "multiplayer"
description: "Host, join and play a rollback match. Set this machine's input with set_input and read every slot's with rollback.input(slot); events reach every…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`multiplayer`

Host, join and play a rollback match. Set this machine's input with `set_input` and read every slot's with `rollback.input(slot)`; events reach every script's `on_multiplayer_event` as a map with a `kind`.

14 functions, 18 constants. Scripts reach it as `multiplayer::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `add_bot(string?) -> any` | — | On a host, a slot its own script plays with `set_input_for`; answers the slot, or nil when the lobby is full. |
| `host(any?) -> any` | — | Listen and take slot 0; answers `{ url, cert_hash, transport }`, what a joiner needs. Options over `[multiplayer]`: `transport`, `address`, `players`, `scene`, `depth`, `timeout`, `name`, `token`. |
| `join(string, any?) -> any` | — | Dial a host at a `ws://` or `https://` url; `connected` or `failed` follows. Options: `cert_hash` for a self-signed host, `name`, `token`, `timeout`. |
| `leave() -> any` | — | Say goodbye and go idle; a host leaving ends the match for everyone. |
| `local_player() -> any` | — | This machine's own slot, or nil before it has one. |
| `players() -> any` | — | Every slot as `{ slot, name, bot, local, status }`, `status` as of the tick being simulated. |
| `role() -> any` | — | `ROLE_HOST` or `ROLE_CLIENT`, or nil when idle. |
| `set_input(any) -> any` | — | What this machine's player does on the next tick, until set again; ignored while a tick re-runs. |
| `set_input_for(int, any) -> any` | — | The same for a bot slot this machine plays. |
| `settled() -> any` | — | The tick before which nothing can be rolled back any more. |
| `start() -> any` | — | On a host, start with whoever is in rather than waiting for `players`; false when there is no lobby to start. |
| `state() -> any` | — | `STATE_IDLE`, `STATE_CONNECTING`, `STATE_LOBBY` or `STATE_PLAYING`. |
| `stats(int) -> any` | — | `{ rtt_ms, loss, bytes_in, bytes_out }` for the link a slot is reached over; nil for this machine's own. An observer: never simulate from it. |
| `tick() -> any` | — | The match tick being simulated; what a match branches on instead of `engine.tick`. |

## Constants

| name | value |
| --- | --- |
| `EVENT_CLOSED` | `closed` |
| `EVENT_CONNECTED` | `connected` |
| `EVENT_DESYNC` | `desync` |
| `EVENT_FAILED` | `failed` |
| `EVENT_JOINED` | `joined` |
| `EVENT_LEFT` | `left` |
| `EVENT_STARTED` | `started` |
| `ROLE_CLIENT` | `client` |
| `ROLE_HOST` | `host` |
| `STATE_CONNECTING` | `connecting` |
| `STATE_IDLE` | `idle` |
| `STATE_LOBBY` | `lobby` |
| `STATE_PLAYING` | `playing` |
| `STATUS_ABSENT` | `absent` |
| `STATUS_PRESENT` | `present` |
| `TAG_LOCAL` | `local` |
| `TRANSPORT_WEBSOCKET` | `websocket` |
| `TRANSPORT_WEBTRANSPORT` | `webtransport` |
