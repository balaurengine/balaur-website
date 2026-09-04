---
title: "replay module"
image: "/img/social/reference.png"
sidebar_label: "replay"
description: "Record what a running game is fed and play it back. A recording holds each tick's input, network arrivals and events, not the world they produced, so a…"
custom_edit_url: null
---

# `replay`

Record what a running game is fed and play it back. A recording holds each tick's input, network arrivals and events, not the world they produced, so a session is small and replays by re-running the game against the same input. The editor's Session dock drives these, and so does `balaur run --record`.

17 functions, 4 constants. Scripts reach it as `replay::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `diverged()` | — | The first tick whose replay did not reproduce the recorded digest, or nil. |
| `events(from: int, to: int)` | — | The events recorded between two ticks, each with its tick, kind, label and data. |
| `header()` | — | The loaded session's project, start time, script fingerprint and how it ended. |
| `info(path: string)` | — | The same summary for a session file on disk, without loading it. |
| `length()` | — | The loaded session's frame count and the ticks it spans, or nil. |
| `load(path: string)` | — | Read a session and put it in front of the engine, paused before its first tick. |
| `marks(source: string, key: string?)` | — | The ticks at which one replay source held a non-empty list under a key, and what it held. |
| `pause()` | — | Stop between ticks, holding the simulation still while the frame loop keeps drawing. |
| `play()` | — | Run the loaded session, one recorded tick per frame. |
| `position()` | — | The tick playback has reached. |
| `record(path: string, options: any?)` | — | Start recording into a file; call it before the code whose session it records runs. |
| `recording()` | — | The file being recorded into, or nil. |
| `seek(tick: int)` | — | Run recorded ticks until playback reaches the given tick; forward only. |
| `session_name()` | — | A file-safe name for a session starting now, so a list of them sorts by when they ran. |
| `state()` | — | What playback is doing: `STATE_STOPPED`, `STATE_PLAYING`, `STATE_PAUSED` or `STATE_SEEKING`. |
| `stop(reason: string?)` | — | Close the recording, naming why it ended, and return the file it wrote. |
| `unload()` | — | Drop the loaded session and let the game run live again. |

## Constants

| name | value |
| --- | --- |
| `STATE_PAUSED` | `paused` |
| `STATE_PLAYING` | `playing` |
| `STATE_SEEKING` | `seeking` |
| `STATE_STOPPED` | `stopped` |
