---
title: "engine"
custom_edit_url: null
---

# `engine`

7 functions, 0 constants. Scripts reach it as `engine::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `args` | — | The command-line arguments the app was started with, empty when it was given none. |
| `delta` | — | Seconds the frame in progress covers, the same number a system is handed. |
| `quit` | — | Ask the app to shut down; the frame in flight still finishes. |
| `reload_script` | — | Recompile one script by its project-relative key, for a tool editing files outside the watched root. |
| `tick` | — | Which frame this is, counted whole — what simulation code branches on instead of `time`. |
| `time` | — |  |
| `user_data_dir` | — | A writable per-user directory for saves and settings, created on first call and named after the project. |
