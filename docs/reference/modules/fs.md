---
title: "fs module"
image: "/img/social/reference.png"
sidebar_label: "fs"
description: "Files on disk, project-relative unless the path is absolute, so a script cannot wander the filesystem by accident. This is the disk itself: a packed…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,88v24H69.77a8,8,0,0,0-7.59,5.47L32,208V64a8,8,0,0,1,8-8H93.33a8,8,0,0,1,4.8,1.6L128,80h72A8,8,0,0,1,208,88Z" opacity="0.2"/><path d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64,123.2,86.4A8,8,0,0,0,128,88h72v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Zm112,136H43.1l26.67-80H232Z"/></svg></span>`fs`

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
