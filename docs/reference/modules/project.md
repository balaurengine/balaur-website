---
title: "project module"
image: "/img/social/reference.png"
sidebar_label: "project"
description: "The projects this machine has opened, the templates a new one starts from, and the folder picker the OS provides. What the editor's start screen is made…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`project`

The projects this machine has opened, the templates a new one starts from, and the folder picker the OS provides. What the editor's start screen is made of.

12 functions, 0 constants. Scripts reach it as `project::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `copy_example(string, string) -> any` | — | Copy one example into `into` under its own name, so the shipped one stays as it is. Answers `{ path, name }`, or `{ error }`. |
| `create(string, string) -> any` | — | Write a new project at `path` from a template id, or from nothing when the id is empty. Answers `{ path, name }`, or `{ error }`. |
| `examples() -> any` | — | The example projects shipped beside the editor: `{ id, name, note, cover, path }` each, where `cover` is a picture the editor's own project holds, or empty. |
| `forget(string) -> any` | — | Drop one project from the list. The folder is not touched. |
| `home() -> any` | — | Where a new project goes unless the reader says otherwise: the home directory on a desktop, and the app's own writable directory where there is no such thing. |
| `in_tab() -> any` | — | Whether this editor runs in a browser tab, where the page holds the projects and opening one is its call rather than this screen's. |
| `open(string) -> any` | — | Remember `path` and start the editor on it, then ask this one to quit. Answers `{ error }` when there is no project there. |
| `pick_folder() -> any` | — | Open the OS folder picker and answer what was chosen, or `()` when it was dismissed. Blocks while the dialog is up, and answers `()` on a platform with no picker. |
| `recent() -> any` | — | The projects opened on this machine, newest first: `{ path, name, opened, exists }` each, where `opened` is a Unix time in seconds and `exists` says whether the folder is still there. |
| `templates() -> any` | — | What a new project may start from: `{ id, note }` each, read from the editor's own library. |
| `use_data(string?) -> any` | — | Keep `save::` slots and the device id in the user data directory of the game named `name`, and let `fs` reach it, so a game played here and run alone share saves and a device login. Nil goes back to the editor's own. Answers the directory, or nil. |
| `version() -> any` | — | The version of the binary the editor is running in. |
