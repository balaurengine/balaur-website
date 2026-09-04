---
title: "log module"
image: "/img/social/reference.png"
sidebar_label: "log"
description: "The three levels a script writes at, and the buffer behind them. Scripted lines go through the engine's own tracing stream, so they land beside engine…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,160l-56,56V160Z" opacity="0.2"/><path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"/></svg></span>`log`

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
