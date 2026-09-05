---
title: "hash module"
image: "/img/social/reference.png"
sidebar_label: "hash"
description: "Content hashes, for a download a game verifies before it trusts it."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg></span>`hash`

Content hashes, for a download a game verifies before it trusts it.

2 functions, 0 constants. Scripts reach it as `hash::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `sha256(path: string)` | — | The SHA-256 of a file as lowercase hex, read through the project's file roots; an absolute path is read as given. |
| `sha256_text(text: string)` | — | The SHA-256 of a string as lowercase hex. |
