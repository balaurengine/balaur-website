---
title: "debugger module"
image: "/img/social/reference.png"
sidebar_label: "debugger"
description: "Breakpoints, the pause a stopped script sits in, and the ways out of it. The same machinery the editor's Debugger dock and the Debug Adapter Protocol…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,128v16a80,80,0,0,1-160,0V128Z" opacity="0.2"/><path d="M144,92a12,12,0,1,1,12,12A12,12,0,0,1,144,92ZM100,80a12,12,0,1,0,12,12A12,12,0,0,0,100,80Zm116,64A87.76,87.76,0,0,1,213,167l22.24,9.72A8,8,0,0,1,232,192a7.89,7.89,0,0,1-3.2-.67L207.38,182a88,88,0,0,1-158.76,0L27.2,191.33A7.89,7.89,0,0,1,24,192a8,8,0,0,1-3.2-15.33L43,167A87.76,87.76,0,0,1,40,144v-8H16a8,8,0,0,1,0-16H40v-8a87.76,87.76,0,0,1,3-23L20.8,79.33a8,8,0,1,1,6.4-14.66L48.62,74a88,88,0,0,1,158.76,0l21.42-9.36a8,8,0,0,1,6.4,14.66L213,89.05a87.76,87.76,0,0,1,3,23v8h24a8,8,0,0,1,0,16H216ZM56,120H200v-8a72,72,0,0,0-144,0Zm64,95.54V136H56v8A72.08,72.08,0,0,0,120,215.54ZM200,144v-8H136v79.54A72.08,72.08,0,0,0,200,144Z"/></svg></span>`debugger`

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
