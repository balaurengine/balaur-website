---
title: "engine module"
image: "/img/social/reference.png"
sidebar_label: "engine"
description: "The running app itself: the clock a frame reads, the command line it was started with, the directory it may write to, and the way out."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M248,120v48a8,8,0,0,1-8,8H224l-37.66,37.66a8,8,0,0,1-5.65,2.34H103.31a8,8,0,0,1-5.65-2.34L58.34,174.34A8,8,0,0,1,56,168.69V80a8,8,0,0,1,8-8H180.69a8,8,0,0,1,5.65,2.34L224,112h16A8,8,0,0,1,248,120Z" opacity="0.2"/><path d="M240,104H227.31L192,68.69A15.86,15.86,0,0,0,180.69,64H140V40h24a8,8,0,0,0,0-16H100a8,8,0,0,0,0,16h24V64H64A16,16,0,0,0,48,80v52H24V108a8,8,0,0,0-16,0v64a8,8,0,0,0,16,0V148H48v20.69A15.86,15.86,0,0,0,52.69,180L92,219.31A15.86,15.86,0,0,0,103.31,224h77.38A15.86,15.86,0,0,0,192,219.31L227.31,184H240a16,16,0,0,0,16-16V120A16,16,0,0,0,240,104Zm0,64H224a8,8,0,0,0-5.66,2.34L180.69,208H103.31L64,168.69V80H180.69l37.65,37.66A8,8,0,0,0,224,120h16Z"/></svg></span>`engine`

The running app itself: the clock a frame reads, the command line it was started with, the directory it may write to, and the way out.

16 functions, 0 constants. Scripts reach it as `engine::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `args()` | — | The command-line arguments the app was started with, empty when it was given none. |
| `dark_mode()` | — | Whether the system is in dark mode this tick; every script's `on_dark_mode(bool)` is called when it changes. False where nothing says. |
| `delta()` | — | Seconds the frame in progress covers, the same number a system is handed. |
| `device_id()` | — | One id per install, made on first use and kept in the user directory: what a device login sends. Recorded with the session. |
| `focused()` | — | Whether the window is in front of the player this tick; every script's `on_focus_changed(bool)` is called when it changes. True with no window. |
| `has_plugin(name: string)` | — | Whether one plugin loaded, so a game shipped without `http` can say so rather than call into a module that is not there. |
| `platform()` | — | Where this runs: `{ os, web, mobile, editor }`. Recorded in a session's header, so a replay on another machine answers as the original did. |
| `plugin_version(name: string)` | — | The version of one loaded plugin, or nil when it did not load. |
| `plugins()` | — | Every plugin this build loaded, named, in load order. |
| `quit()` | — | Ask the app to shut down; the frame in flight still finishes. |
| `reload_script(key: string)` | — | Recompile one script by its project-relative key, for a tool editing files outside the watched root. |
| `tick()` | — | Which frame this is, counted whole — what simulation code branches on instead of `time`. |
| `time()` | — | Seconds of engine time since the app started, accumulated as a float. |
| `timings()` | — | What the last frame cost, in seconds: `{ frame, fixed_steps, stages, spans }`. Presentation only — branching a `fixed_update` on wall time desyncs, and nothing records it. |
| `unix_time()` | — | The wall clock at the top of this tick, in seconds since 1970. Read once per frame and recorded, so a replay sees the time the recording saw. |
| `user_data_dir()` | — | A writable per-user directory for saves and settings, created on first call and named after the project. |
