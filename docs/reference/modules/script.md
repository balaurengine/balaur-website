---
title: "script module"
sidebar_label: "script"
description: "Loading other scripts, inspecting what they declare, and calling into them without a failure taking the frame down."
custom_edit_url: null
---

# `script`

Loading other scripts, inspecting what they declare, and calling into them without a failure taking the frame down.

6 functions, 0 constants. Scripts reach it as `script::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `attempt(f: fn)` | — | Call a function, answering `(true, value)` when it returned and `(false, message)` when it failed. |
| `check(path: string, source: string)` | — | Every compiler diagnostic about the given source, as `[#{ file, line, column, severity, message }]`; an editor passes the buffer it is showing. |
| `exports(path: string)` | — | The tunable properties a script declares in `exports()`, with their defaults. |
| `functions(path: string)` | — | The public functions a script file declares, with their argument names. |
| `require(path: string)` | — | Load another script file as a module, compiled once and shared by every caller afterwards. |
| `shared(f: fn, arity: int)` | — | Wrap a script function so it can be called from several places with a fixed argument count. |
