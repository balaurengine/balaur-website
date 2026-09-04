---
title: "save module"
image: "/img/social/reference.png"
sidebar_label: "save"
description: "Save games: a table in, a table out, stored per user rather than in the project. Nothing here is engine state — a save is whatever the game puts in it…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,83.31V208a8,8,0,0,1-8,8H176V152a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v64H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H172.69a8,8,0,0,1,5.65,2.34l35.32,35.32A8,8,0,0,1,216,83.31Z" opacity="0.2"/><path d="M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM168,208H88V152h80Zm40,0H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h56A8,8,0,0,1,160,72Z"/></svg></span>`save`

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
