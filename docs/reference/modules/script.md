---
title: "script module"
image: "/img/social/reference.png"
sidebar_label: "script"
description: "Loading other scripts, inspecting what they declare, and calling into them without a failure taking the frame down."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M240,128l-48,40H64L16,128,64,88H192Z" opacity="0.2"/><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"/></svg></span>`script`

Loading other scripts, inspecting what they declare, and calling into them without a failure taking the frame down.

17 functions, 0 constants. Scripts reach it as `script::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `api()` | — | Every module scripts can reach, as the JSON string `balaur api` prints; a tool reads the live engine rather than a file that may be stale. |
| `attempt(f: fn)` | — | Call a function, answering `(true, value)` when it returned and `(false, message)` when it failed. |
| `check(path: string, source: string)` | — | Every compiler diagnostic about the given source, as `[#{ file, line, column, severity, message }]`; an editor passes the buffer it is showing. |
| `complete(path: string, source: string, line: int, column: int)` | — | Every completion valid at that caret, as `[#{ label, kind, detail, doc, insert }]`; an editor passes the buffer it is showing. |
| `definition(path: string, source: string, line: int, column: int)` | — | Where the name at that caret is defined, as `#{ file, line, column, url }`; engine API carries its reference page rather than a file. |
| `exports(path: string)` | — | The tunable properties a script declares in `exports()`, with their defaults. |
| `find(path: string, source: string, needle: string)` | — | Every place that text appears across the files this one's `mod` declarations reach, matched as text rather than as an identifier. |
| `format(path: string, source: string)` | — | That source laid out by Rune's own formatter; the source unchanged when it will not parse. |
| `functions(path: string)` | — | The public functions a script file declares, with their argument names. |
| `hover(path: string, source: string, line: int, column: int)` | — | What is under that caret, as `#{ title, detail, doc }`, or `()` when it is nothing the engine knows. |
| `references(path: string, source: string, name: string)` | — | Every place that name appears as a whole word across the files this one's `mod` declarations reach, as `[#{ file, line, column, url }]`. |
| `rename(path: string, source: string, from: string, to: string)` | — | Every file a rename would rewrite, as `[#{ file, source }]`; nothing is written, so a caller can show the list first. |
| `replace(path: string, source: string, from: string, to: string)` | — | Every file a find and replace would rewrite, as `[#{ file, source }]`; nothing is written, so a caller can show the list first. |
| `require(path: string)` | — | Load another script file as a module, compiled once and shared by every caller afterwards. |
| `shared(f: fn, arity: int)` | — | Wrap a script function so it can be called from several places with a fixed argument count. |
| `signature(path: string, source: string, line: int, column: int)` | — | The call the caret is inside, as `#{ title, detail, doc, active }`, where `active` is the argument being typed. |
| `symbols(path: string, source: string)` | — | What that file declares, as `[#{ name, kind, detail, line, column }]`: its public functions and its `exports()` properties. |
