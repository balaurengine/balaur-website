---
title: "toml module"
image: "/img/social/reference.png"
sidebar_label: "toml"
description: "TOML text to and from script tables: the format scene files, asset definitions and component properties are all written in."
custom_edit_url: null
---

# `toml`

TOML text to and from script tables: the format scene files, asset definitions and component properties are all written in.

2 functions, 0 constants. Scripts reach it as `toml::`.

## Functions

Argument kinds are the script values a call passes: `node` is a node handle, `any` a table or value of any kind, `fn` a callback.

| function | acts on | what it does |
| --- | --- | --- |
| `encode(value: any)` | — | A table written back out as TOML text; a node or callback in it is not data and is an error. |
| `parse(text: string)` | — | The table a TOML document describes; an error on text that does not parse. |
