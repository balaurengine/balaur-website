---
title: "assets"
custom_edit_url: null
---

# `assets`

6 functions, 0 constants. Scripts reach it as `assets::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `directory` | — | The project-relative directory files of an asset type belong in; empty when the type is unknown or declared none. |
| `duplicate` | — | A private copy of a definition, read past the cache, so editing it disturbs no other holder of that reference. |
| `exists` | — | Whether a project-relative path has anything at it, file or directory. |
| `load` | — | Read a session and put it in front of the engine, paused before its first tick. |
| `reload` | — | Forget a reference so the next load re-reads its file, along with every entry cut from that same file. |
| `save` | — | Write a definition table to the project-relative file a reference names; an error unless it names a whole file. |
