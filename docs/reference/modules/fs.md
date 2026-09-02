---
title: "fs"
custom_edit_url: null
---

# `fs`

8 functions, 0 constants. Scripts reach it as `fs::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `exists` | — |  |
| `list` | — | A directory's entries as `{ name, is_dir }`, sorted, dotfiles skipped; empty for a directory that is not there. |
| `mkdir` | — | Create a project-relative directory and every parent it needs. |
| `mtime` | — | When a file last changed, in seconds since the Unix epoch; nil for one that is not there. |
| `read` | — | A whole file as text, project-relative unless absolute; nil when it cannot be read. |
| `remove` | — | Delete a project-relative file, or a directory and everything under it; false when there was nothing there. |
| `rename` | — | Move a project-relative file or directory, creating the destination's parent first. |
| `write` | — | Write text to a project-relative file, creating the directory it goes in. |
