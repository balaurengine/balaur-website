---
title: "debugger module"
sidebar_label: "debugger"
description: "Breakpoints, the pause a stopped script sits in, and the ways out of it. The same machinery the editor's Debugger dock and the Debug Adapter Protocol…"
custom_edit_url: null
---

# `debugger`

Breakpoints, the pause a stopped script sits in, and the ways out of it. The same machinery the editor's Debugger dock and the Debug Adapter Protocol server drive, so an outside editor and the built-in one see one debugger.

9 functions, 4 constants. Scripts reach it as `debugger::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `break_on_error()` | — | Whether a script that throws stops rather than being logged. |
| `breakpoints(path: string)` | — | The lines one file's breakpoints landed on. |
| `paused()` | — | Where a script is stopped — node, path, line, reason and frames, innermost first — or nil while none is. |
| `request_break()` | — | Ask to stop at the next line any script runs; nothing is stopped yet when it returns. |
| `resume(mode: string?)` | — | Let the stopped script go on, in the given step mode (`CONTINUE`, `STEP_OVER`, `STEP_INTO`, `STEP_OUT`). |
| `scope()` | — | The node whose subtree a pause holds still, or nil when a pause stops the whole tree. |
| `set_break_on_error(on: bool)` | — | Stop where a script throws instead of logging it and moving on; off by default. |
| `set_breakpoints(path: string, lines: [int])` | — | Replace one file's breakpoints with the given lines, returning the lines they landed on. |
| `set_scope(node: node?)` | — | Limit the pause to one node's subtree, so an editor keeps running while the game stops; nil means the whole tree. |

## Constants

| name | value |
| --- | --- |
| `CONTINUE` | `continue` |
| `STEP_INTO` | `into` |
| `STEP_OUT` | `out` |
| `STEP_OVER` | `over` |
