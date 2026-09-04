---
title: "log module"
image: "/img/social/reference.png"
sidebar_label: "log"
description: "The three levels a script writes at, and the buffer behind them. Scripted lines go through the engine's own tracing stream, so they land beside engine…"
custom_edit_url: null
---

# `log`

The three levels a script writes at, and the buffer behind them. Scripted lines go through the engine's own `tracing` stream, so they land beside engine ones.

5 functions, 0 constants. Scripts reach it as `log::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `clear()` | — | Empty the buffer, so a console reading it starts again from nothing. |
| `error(message: string)` | — | Write a line at error level, tagged as coming from a script. |
| `info(message: string)` | — | Write a line at info level, tagged as coming from a script. |
| `recent(n: int?)` | — | The last n buffered entries, 100 by default, each `{ time, level, tag, message, fields }`. |
| `warn(message: string)` | — | Write a line at warning level, tagged as coming from a script. |
