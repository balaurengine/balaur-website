---
title: "log"
custom_edit_url: null
---

# `log`

5 functions, 0 constants. Scripts reach it as `log::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `clear` | — | Empty the buffer, so a console reading it starts again from nothing. |
| `error` | — | Write a line at error level, tagged as coming from a script. |
| `info` | — | The same summary for a session file on disk, without loading it. |
| `recent` | — | The last n buffered entries, 100 by default, each `{ time, level, tag, message, fields }`. |
| `warn` | — | Write a line at warning level, tagged as coming from a script. |
