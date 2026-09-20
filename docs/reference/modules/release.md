---
title: "release module"
image: "/img/social/reference.png"
sidebar_label: "release"
description: "Which build of the engine this is, what the channels are publishing, and replacing this install with another. The editor's Engine tab and About sheet…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`release`

Which build of the engine this is, what the channels are publishing, and replacing this install with another. The editor's Engine tab and About sheet; `balaur update` is the same code.

5 functions, 0 constants. Scripts reach it as `release::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `channels() -> any` | — | Every release line a build may follow, in the order a version moves through them. |
| `check() -> bool` | — | Read the release feed on a thread. `listen` hears `{ kind: "listed", rows }`, newest first, each `{ tag, id, channel, when, current, order, download }`: `order` is `newer`, `older` or `same` than this build, empty where they do not order, and `download` is the .dmg a macOS bundle fetches instead. `{ kind: "failed", job: "check", message }` when the feed could not be read. False while a recording plays. |
| `install(string, string, bool) -> bool` | — | Replace this install with what that channel or tag holds, on a thread. `listen` hears `downloading` with `done` and `total` bytes, `unpacking`, then `installed` with a `note`, or `failed` with `job: "install"`. Refuses where `installed().held` says why. False while a recording plays. |
| `installed() -> any` | — | This build: `{ version, id, channel, tag, source, held }`, where `id` is the build id a release was tagged with, `tag` is the release its assets live under, `source` is true for a build from a checkout, and `held` says why this install cannot replace itself, empty when it can. |
| `listen(node, any?)` | — | Call a method on `node` with every report a check or an install makes: `on_release` unless `opts.on_event` names another. |
