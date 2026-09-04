---
title: "toml module"
image: "/img/social/reference.png"
sidebar_label: "toml"
description: "TOML text to and from script tables: the format scene files, asset definitions and component properties are all written in."
custom_edit_url: null
---

# <span class="ref-icon ref-icon--other" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,88H152V32Z" opacity="0.2"/><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"/></svg></span>`toml`

TOML text to and from script tables: the format scene files, asset definitions and component properties are all written in.

2 functions, 0 constants. Scripts reach it as `toml::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `encode(value: any)` | — | A table written back out as TOML text; a node or callback in it is not data and is an error. |
| `parse(text: string)` | — | The table a TOML document describes; an error on text that does not parse. |
