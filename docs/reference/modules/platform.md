---
title: "platform module"
image: "/img/social/reference.png"
sidebar_label: "platform"
description: "Store services every platform shares: sign-in, achievements, leaderboards and cloud saves. A call returns an id and answers on a later tick, as a map…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2"/><path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z"/></svg></span>`platform`

Store services every platform shares: sign-in, achievements, leaderboards and cloud saves. A call returns an id and answers on a later tick, as a map carrying `kind` — `signed_in`, `done`, `scores`, `read`, `failed` or `unsupported` — both to the node's `on_platform` method and to whoever awaits the id. With no store loaded every call answers `unsupported`, so a script written against this runs anywhere. What only one platform has lives in that platform's own module.

11 functions, 0 constants. Scripts reach it as `platform::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `backend() -> any` | — | The name of the loaded store, or "none". |
| `cloud_read(any, any?, any?) -> any` | — | Read a value the store syncs between the player's devices. |
| `cloud_write(any, any?, any?, any?) -> any` | — | Write a value for the store to sync between the player's devices. |
| `player() -> any` | — | Who the store says is playing, or nil before a sign-in has landed. |
| `progress(any, any?, any?, any?) -> any` | — | Report an achievement's completion, 0 to 100. |
| `scores(any, any?, any?) -> any` | — | Read a leaderboard's entries. The options take `count`, `start` (a rank, from 1), `scope` ("global" or "friends") and `period` ("today", "week" or "all_time"). |
| `set_presence(any, any?, any?) -> any` | — | Say what the player is doing, where the store shows it. |
| `sign_in(any?, any?) -> any` | — | Ask the store who is playing, and return the id its answer carries. A node given here keeps hearing: a later sign-out reaches the same method. |
| `signed_in() -> any` | — | Whether a sign-in has landed. |
| `submit_score(any, any?, any?, any?) -> any` | — | Post a score to a leaderboard. |
| `unlock(any, any?, any?) -> any` | — | Award an achievement whole. |
