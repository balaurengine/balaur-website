---
title: "release module"
image: "/img/social/reference.png"
sidebar_label: "release"
description: "Which build of the engine this is, what the channels are publishing, and replacing this install with another. The editor's engine screen; balaur update…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`release`

Which build of the engine this is, what the channels are publishing, and replacing this install with another. The editor's engine screen; `balaur update` is the same code.

4 functions, 0 constants. Scripts reach it as `release::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `channels() -> any` | — | Every release line a build may follow, in the order a version moves through them. |
| `install(string, string, bool) -> any` | — | Replace this install with what that channel or tag holds, and answer `{ note }` when it worked. Downloads while it blocks, and refuses inside a macOS bundle, which updates by its own download. |
| `installed() -> any` | — | This build: `{ version, id, channel, tag, source }`, where `id` is the build id a release was tagged with, `tag` is the release its assets live under, and `source` is true for a build from a checkout. |
| `releases() -> any` | — | Every release the project has published, newest first: `{ tag, id, channel, when, current }` each, where `when` is how long ago it was published. Reads the network and blocks while it does. Answers `{ error }` as its one row when the feed could not be read. |
