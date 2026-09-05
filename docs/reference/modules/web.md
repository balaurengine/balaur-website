---
title: "web module"
image: "/img/social/reference.png"
sidebar_label: "web"
description: "The page a browser build runs in. Facts about it are read once per tick and recorded, so a replay answers as the browser did; a message from the parent…"
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`web`

The page a browser build runs in. Facts about it are read once per tick and recorded, so a replay answers as the browser did; a message from the parent frame reaches `on_web_message` on every node that called `listen`. Off the web every query answers nil.

7 functions, 0 constants. Scripts reach it as `web::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `hardware_concurrency() -> any` | — | How many threads the browser reports, or nil off the web. |
| `listen(node, any?)` | — | Have the node's `on_web_message(payload)` — or the `on_event` method the options name — called for every message the parent frame posts. |
| `location() -> any` | — | The page's URL, or nil off the web. |
| `messages() -> any` | — | Every message the parent frame posted this tick, for a script that would rather ask than declare a method. |
| `post_message(any) -> bool` | — | Post a value to the page that embeds this one. False off the web, and false while a recording plays. |
| `user_agent() -> any` | — | The browser's user agent string, or nil off the web. |
| `visible() -> bool` | — | Whether the tab is in front of the player; true off the web. |
