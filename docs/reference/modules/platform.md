---
title: "platform module"
image: "/img/social/reference.png"
sidebar_label: "platform"
description: "Store services every platform shares: sign-in, achievements, leaderboards and cloud saves. A call returns an id and answers on a later tick, as a map…"
custom_edit_url: null
---

# `platform`

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
