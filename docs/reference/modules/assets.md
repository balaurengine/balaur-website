---
title: "assets module"
image: "/img/social/reference.png"
sidebar_label: "assets"
description: "Asset definitions by reference: a project-relative file path, file#entry for one entry inside it, or #id for a block the scene declares. A script gets…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,.7-3.25Z" opacity="0.2"/><path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"/></svg></span>`assets`

Asset definitions by reference: a project-relative file path, `file#entry` for one entry inside it, or `#id` for a block the scene declares. A script gets the definition table, not the parsed object the owning plugin builds from it.

7 functions, 0 constants. Scripts reach it as `assets::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `directory(type_name: string)` | — | The project-relative directory files of an asset type belong in; empty when the type is unknown or declared none. |
| `duplicate(reference: string)` | — | A private copy of a definition, read past the cache, so editing it disturbs no other holder of that reference. |
| `exists(reference: string)` | — | Whether a reference resolves to a definition that is really there; false rather than an error when it does not. |
| `invalidate()` | — | Declare everything derived from project files stale — a shader a material links, say — so it is rebuilt from disk; for a file the watcher does not cover. |
| `load(reference: string)` | — | The definition table behind a reference, from the cache; an error when the reference resolves to nothing. |
| `reload(reference: string)` | — | Forget a reference so the next load re-reads its file, along with every entry cut from that same file. |
| `save(reference: string, definition: any)` | — | Write a definition table to the project-relative file a reference names; an error unless it names a whole file. |
