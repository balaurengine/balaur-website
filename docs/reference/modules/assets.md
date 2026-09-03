---
title: "assets"
custom_edit_url: null
---

# `assets`

Asset definitions by reference: a project-relative file path, `file#entry` for one entry inside it, or `#id` for a block the scene declares. A script gets the definition table, not the parsed object the owning plugin builds from it.

6 functions, 0 constants. Scripts reach it as `assets::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `directory(type_name: string)` | — | The project-relative directory files of an asset type belong in; empty when the type is unknown or declared none. |
| `duplicate(reference: string)` | — | A private copy of a definition, read past the cache, so editing it disturbs no other holder of that reference. |
| `exists(reference: string)` | — | Whether a reference resolves to a definition that is really there; false rather than an error when it does not. |
| `load(reference: string)` | — | The definition table behind a reference, from the cache; an error when the reference resolves to nothing. |
| `reload(reference: string)` | — | Forget a reference so the next load re-reads its file, along with every entry cut from that same file. |
| `save(reference: string, definition: any)` | — | Write a definition table to the project-relative file a reference names; an error unless it names a whole file. |
