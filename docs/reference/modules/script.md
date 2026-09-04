---
title: "script module"
image: "/img/social/reference.png"
sidebar_label: "script"
description: "Loading other scripts, inspecting what they declare, and calling into them without a failure taking the frame down."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M240,128l-48,40H64L16,128,64,88H192Z" opacity="0.2"/><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"/></svg></span>`script`

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
