---
title: "fs module"
image: "/img/social/reference.png"
sidebar_label: "fs"
description: "Files on disk, project-relative unless the path is absolute, so a script cannot wander the filesystem by accident. This is the disk itself: a packed…"
custom_edit_url: null
---

# `fs`

Files on disk, project-relative unless the path is absolute, so a script cannot wander the filesystem by accident. This is the disk itself: a packed build's contents are reached through `assets` and `scene.source`.

8 functions, 0 constants. Scripts reach it as `fs::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `exists(path: string)` | — | Whether a project-relative path has anything at it, file or directory. |
| `list(path: string)` | — | A directory's entries as `{ name, is_dir }`, sorted, dotfiles skipped; empty for a directory that is not there. |
| `mkdir(path: string)` | — | Create a project-relative directory and every parent it needs. |
| `mtime(path: string)` | — | When a file last changed, in seconds since the Unix epoch; nil for one that is not there. |
| `read(path: string)` | — | A whole file as text, project-relative unless absolute; nil when it cannot be read. |
| `remove(path: string)` | — | Delete a project-relative file, or a directory and everything under it; false when there was nothing there. |
| `rename(from: string, to: string)` | — | Move a project-relative file or directory, creating the destination's parent first. |
| `write(path: string, text: string)` | — | Write text to a project-relative file, creating the directory it goes in. |
