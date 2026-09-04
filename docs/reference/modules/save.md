---
title: "save module"
image: "/img/social/reference.png"
sidebar_label: "save"
description: "Save games: a table in, a table out, stored per user rather than in the project. Nothing here is engine state — a save is whatever the game puts in it…"
custom_edit_url: null
---

# `save`

Save games: a table in, a table out, stored per user rather than in the project. Nothing here is engine state — a save is whatever the game puts in it — so what the engine decides is only where it lives, that a half-written file cannot replace a good one, and what version it was written at. `[save] version` in `project.toml` sets that version and `[save] migrate` names the script whose `migrate_save(version, data)` brings an older file forward, one version per call.

5 functions, 0 constants. Scripts reach it as `save::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `read(slot: string)` | — | The table in a slot, brought forward to this build's version; nil when the slot was never written. An error when the file was written by a newer build, or when it needs a migration the project declares no script for. |
| `remove(slot: string)` | — | Delete a slot. Not an error when it was not there. |
| `slots()` | — | Every slot that has been written, in name order. |
| `version()` | — | The save version this build writes, from `[save] version`. |
| `write(slot: string, data: any)` | — | Write a table to a named slot, stamped with the project's save version. Written beside the target and renamed over it, so a crash mid-save cannot destroy the last one. |
